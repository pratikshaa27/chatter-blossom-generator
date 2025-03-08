
// Available voices types
export interface Voice {
  id: string;
  name: string;
  lang: string;
}

// Speech state interface
export interface SpeechState {
  text: string;
  voice: Voice | null;
  pitch: number;
  rate: number;
  volume: number;
  isSpeaking: boolean;
  isPaused: boolean;
}

// Get all available voices from the browser
export const getAvailableVoices = (): Voice[] => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return [];
  }
  
  // Get all voices from the browser
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  
  return voices.map((voice) => ({
    id: voice.voiceURI,
    name: voice.name,
    lang: voice.lang,
  }));
};

// Speak the provided text with the given configuration
export const speak = (
  text: string, 
  voice: Voice | null,
  pitch = 1,
  rate = 1,
  volume = 1,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: any) => void
): SpeechSynthesisUtterance | null => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return null;
  }
  
  // Create a new utterance
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  
  // If a voice is selected, find the matching SpeechSynthesisVoice
  if (voice) {
    const voices = synth.getVoices();
    const selectedVoice = voices.find(v => v.voiceURI === voice.id);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }
  
  // Set speech properties
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;
  
  // Add event listeners
  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;
  
  // Cancel any current speech
  synth.cancel();
  
  // Start speaking
  synth.speak(utterance);
  
  return utterance;
};

// Pause the speech
export const pauseSpeech = (): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }
  
  window.speechSynthesis.pause();
};

// Resume the speech
export const resumeSpeech = (): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }
  
  window.speechSynthesis.resume();
};

// Cancel the speech
export const cancelSpeech = (): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error("Speech synthesis not supported");
    return;
  }
  
  window.speechSynthesis.cancel();
};

// Check if speech synthesis is supported
export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Check if speech synthesis is speaking
export const isSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return false;
  }
  
  return window.speechSynthesis.speaking;
};

// Check if speech synthesis is paused
export const isPaused = (): boolean => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return false;
  }
  
  return window.speechSynthesis.paused;
};
