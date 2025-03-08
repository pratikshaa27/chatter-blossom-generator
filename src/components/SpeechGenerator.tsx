
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import TextInput from "./TextInput";
import VoiceSelector from "./VoiceSelector";
import SpeechControls from "./SpeechControls";
import { useToast } from "@/hooks/use-toast";
import {
  Voice,
  getAvailableVoices,
  speak,
  pauseSpeech,
  resumeSpeech,
  cancelSpeech,
  isSpeechSynthesisSupported,
  isSpeaking,
  isPaused,
} from "@/lib/speechUtils";
import { generateSpeech } from "@/lib/speechGeneratorUtils";
import { InfoIcon, AudioWaveform, Wand2 } from "lucide-react";

const SpeechGenerator: React.FC = () => {
  const [topic, setTopic] = useState("");
  const [generatedSpeech, setGeneratedSpeech] = useState("");
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  
  // Load voices when component mounts
  useEffect(() => {
    if (!isSpeechSynthesisSupported()) {
      toast({
        title: "Speech Synthesis Not Supported",
        description: "Your browser does not support speech synthesis.",
        variant: "destructive",
      });
      return;
    }

    // Get available voices
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        
        // Try to select a default voice based on the user's browser language
        const userLang = navigator.language;
        const matchingVoice = availableVoices.find(
          (voice) => voice.lang.substring(0, 2) === userLang.substring(0, 2)
        );
        
        if (matchingVoice) {
          setSelectedVoice(matchingVoice);
        } else if (availableVoices.length > 0) {
          // Fall back to the first available voice
          setSelectedVoice(availableVoices[0]);
        }
      }
    };

    // Chrome needs a timeout for voices to load
    setTimeout(loadVoices, 100);

    // Some browsers fire an event when voices are loaded
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Clean up
    return () => {
      cancelSpeech();
    };
  }, [toast]);

  // Update speak/pause state based on the browser's state
  useEffect(() => {
    const checkSpeechState = () => {
      setSpeaking(isSpeaking());
      setPaused(isPaused());
    };

    // Check every 100ms while speaking or paused
    const interval = setInterval(() => {
      if (speaking || paused) {
        checkSpeechState();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [speaking, paused]);

  // Handle topic submission to generate speech
  const handleGenerateSpeech = () => {
    if (!topic.trim()) {
      toast({
        title: "No Topic",
        description: "Please enter a topic to generate a speech.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      // Generate speech content based on the topic
      const speech = generateSpeech(topic);
      setGeneratedSpeech(speech);
      toast({
        title: "Speech Generated",
        description: "Your speech has been successfully generated.",
      });
    } catch (error) {
      console.error("Speech generation error:", error);
      toast({
        title: "Generation Error",
        description: "An error occurred while generating the speech.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle play button
  const handlePlay = () => {
    if (!selectedVoice) {
      toast({
        title: "No Voice Selected",
        description: "Please select a voice before speaking.",
        variant: "destructive",
      });
      return;
    }

    if (!generatedSpeech.trim()) {
      toast({
        title: "No Speech",
        description: "Please generate a speech first.",
        variant: "destructive",
      });
      return;
    }

    if (paused) {
      // Resume if paused
      resumeSpeech();
      setSpeaking(true);
      setPaused(false);
    } else {
      // Start new speech
      utteranceRef.current = speak(
        generatedSpeech,
        selectedVoice,
        pitch,
        rate,
        volume,
        () => {
          setSpeaking(true);
          setPaused(false);
        },
        () => {
          setSpeaking(false);
          setPaused(false);
        },
        (error) => {
          console.error("Speech synthesis error:", error);
          setSpeaking(false);
          setPaused(false);
          toast({
            title: "Speech Error",
            description: "An error occurred during speech synthesis.",
            variant: "destructive",
          });
        }
      );
    }
  };

  // Handle pause button
  const handlePause = () => {
    if (speaking && !paused) {
      pauseSpeech();
      setPaused(true);
    }
  };

  // Handle stop button
  const handleStop = () => {
    cancelSpeech();
    setSpeaking(false);
    setPaused(false);
  };

  return (
    <div className={cn(
      "w-full max-w-3xl mx-auto glass-panel rounded-xl overflow-hidden",
      "transition-all duration-300 ease-out animate-scale-in"
    )}>
      <div className="flex items-center justify-between p-5 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <AudioWaveform className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-medium">Speech Generator</h2>
        </div>
        
        {/* Animation for speaking state */}
        {speaking && !paused && (
          <div className="flex items-center h-6 space-x-0.5">
            <div className="w-1 bg-primary rounded-full h-2 animate-wave1"></div>
            <div className="w-1 bg-primary rounded-full h-3 animate-wave2"></div>
            <div className="w-1 bg-primary rounded-full h-4 animate-wave3"></div>
            <div className="w-1 bg-primary rounded-full h-3 animate-wave4"></div>
            <div className="w-1 bg-primary rounded-full h-2 animate-wave5"></div>
          </div>
        )}
      </div>

      <div className="p-5 space-y-6">
        {/* Topic input */}
        <div className="space-y-2">
          <label htmlFor="speech-topic" className="block text-sm font-medium text-foreground">
            Enter Topic
          </label>
          <div className="flex gap-2">
            <TextInput
              value={topic}
              onChange={setTopic}
              placeholder="Enter a topic for your speech (e.g., leadership, technology, education)..."
              className="flex-1"
            />
            <button
              onClick={handleGenerateSpeech}
              disabled={isGenerating || !topic.trim()}
              className={cn(
                "px-4 py-2 rounded-lg bg-primary text-primary-foreground",
                "flex items-center justify-center gap-2",
                "transition-all hover:bg-primary/90",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                (isGenerating || !topic.trim()) && "opacity-70 cursor-not-allowed"
              )}
            >
              <Wand2 className="w-4 h-4" />
              <span>{isGenerating ? "Generating..." : "Generate"}</span>
            </button>
          </div>
        </div>

        {/* Generated speech display */}
        {generatedSpeech && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Generated Speech
            </label>
            <div className="p-4 bg-accent/30 rounded-lg border border-border/50 text-foreground max-h-60 overflow-y-auto">
              {generatedSpeech}
            </div>
          </div>
        )}

        {/* Voice selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Voice
          </label>
          <VoiceSelector
            voices={voices}
            selectedVoice={selectedVoice}
            onSelect={setSelectedVoice}
            className="w-full"
          />
        </div>

        {/* Speech controls */}
        <SpeechControls
          isSpeaking={speaking}
          isPaused={paused}
          volume={volume}
          rate={rate}
          pitch={pitch}
          onPlay={handlePlay}
          onPause={handlePause}
          onStop={handleStop}
          onVolumeChange={setVolume}
          onRateChange={setRate}
          onPitchChange={setPitch}
        />
      </div>

      {/* Information note */}
      <div className="px-5 py-4 bg-accent/50 border-t border-border/50">
        <div className="flex items-start space-x-2 text-sm text-muted-foreground">
          <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            Enter a topic to generate a speech, then use the audio controls to have it read aloud.
            Try topics like "leadership", "technology", "education", "health", or "environment".
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeechGenerator;
