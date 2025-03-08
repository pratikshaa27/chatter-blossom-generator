
import React from "react";
import SpeechGenerator from "@/components/SpeechGenerator";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/20">
      <div className="w-full max-w-4xl px-4 py-12 space-y-6">
        <div className="text-center space-y-3 mb-8 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider">
            SPEECH GENERATOR
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Generate Ready-Made Speeches
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Enter a topic and get an instant speech for your presentation, meeting, or event.
            Customize voice settings and have your speech read aloud with natural-sounding speech synthesis.
          </p>
        </div>
        
        <SpeechGenerator />
        
        <div className="text-center text-sm text-muted-foreground pt-8 animate-fade-in">
          <p>
            Using custom speech templates with Web Speech API for delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
