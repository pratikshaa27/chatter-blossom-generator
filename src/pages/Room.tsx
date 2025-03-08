
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";

const Room = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/20">
      <div className="w-full max-w-4xl px-4 py-12 space-y-6">
        <div className="text-center space-y-3 mb-8 animate-fade-in">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider">
            SPEECH ROOM
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Practice Your Speech
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Join virtual rooms to practice your speech with others or rehearse privately.
          </p>
        </div>
        
        <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 animate-scale-in">
          <div className="text-center space-y-6">
            <Users className="mx-auto h-16 w-16 text-primary/70" />
            <h2 className="text-2xl font-semibold">Room Features Coming Soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on building collaborative rooms where you can practice speeches with others, 
              get feedback, and improve your public speaking skills.
            </p>
            
            <div className="pt-4">
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Speech Generator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
