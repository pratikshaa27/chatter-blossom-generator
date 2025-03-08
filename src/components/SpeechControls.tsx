
import React from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Square, Volume2, Volume1, Volume, VolumeX } from "lucide-react";

interface SpeechControlsProps {
  isSpeaking: boolean;
  isPaused: boolean;
  volume: number;
  rate: number;
  pitch: number;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
  onRateChange: (rate: number) => void;
  onPitchChange: (pitch: number) => void;
  className?: string;
}

const SpeechControls: React.FC<SpeechControlsProps> = ({
  isSpeaking,
  isPaused,
  volume,
  rate,
  pitch,
  onPlay,
  onPause,
  onStop,
  onVolumeChange,
  onRateChange,
  onPitchChange,
  className,
}) => {
  // Volume icon based on current volume
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 0.3) return <Volume className="h-4 w-4" />;
    if (volume < 0.7) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Primary controls (play/pause/stop) */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={isSpeaking && !isPaused ? onPause : onPlay}
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full",
            "transition-all duration-300 ease-out focus:outline-none",
            "focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
            isSpeaking && !isPaused
              ? "bg-primary/90 text-primary-foreground hover:bg-primary"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
          aria-label={isSpeaking && !isPaused ? "Pause" : "Play"}
        >
          {isSpeaking && !isPaused ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </button>

        <button
          onClick={onStop}
          disabled={!isSpeaking && !isPaused}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full",
            "transition-all duration-200 ease-out focus:outline-none",
            "focus:ring-2 focus:ring-muted-foreground/30 focus:ring-offset-1",
            !isSpeaking && !isPaused
              ? "bg-secondary text-secondary-foreground/50 cursor-not-allowed"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
          aria-label="Stop"
        >
          <Square className="h-4 w-4" />
        </button>
      </div>

      {/* Volume slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-0.5">
          <label htmlFor="volume-control" className="text-sm font-medium flex items-center text-muted-foreground">
            <VolumeIcon />
            <span className="ml-1.5">Volume</span>
          </label>
          <span className="text-xs text-muted-foreground font-medium">
            {Math.round(volume * 100)}%
          </span>
        </div>
        <input
          id="volume-control"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer",
            "accent-primary focus:outline-none",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-100",
            "[&::-webkit-slider-thumb]:hover:scale-110"
          )}
        />
      </div>

      {/* Rate slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-0.5">
          <label htmlFor="rate-control" className="text-sm font-medium text-muted-foreground">Speed</label>
          <span className="text-xs text-muted-foreground font-medium">
            {rate.toFixed(1)}x
          </span>
        </div>
        <input
          id="rate-control"
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer",
            "accent-primary focus:outline-none",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-100",
            "[&::-webkit-slider-thumb]:hover:scale-110"
          )}
        />
      </div>

      {/* Pitch slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-0.5">
          <label htmlFor="pitch-control" className="text-sm font-medium text-muted-foreground">Pitch</label>
          <span className="text-xs text-muted-foreground font-medium">
            {pitch.toFixed(1)}
          </span>
        </div>
        <input
          id="pitch-control"
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => onPitchChange(parseFloat(e.target.value))}
          className={cn(
            "w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer",
            "accent-primary focus:outline-none",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-primary",
            "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-100",
            "[&::-webkit-slider-thumb]:hover:scale-110"
          )}
        />
      </div>
    </div>
  );
};

export default SpeechControls;
