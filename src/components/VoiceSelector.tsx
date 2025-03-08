
import React, { useState, useEffect } from "react";
import { Voice } from "@/lib/speechUtils";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface VoiceSelectorProps {
  voices: Voice[];
  selectedVoice: Voice | null;
  onSelect: (voice: Voice) => void;
  className?: string;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  voices,
  selectedVoice,
  onSelect,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>(voices);

  // Filter voices based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredVoices(voices);
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = voices.filter(
      (voice) =>
        voice.name.toLowerCase().includes(lowercaseSearch) ||
        voice.lang.toLowerCase().includes(lowercaseSearch)
    );
    
    setFilteredVoices(filtered);
  }, [searchTerm, voices]);

  // Group voices by language
  const groupedVoices = filteredVoices.reduce<Record<string, Voice[]>>(
    (groups, voice) => {
      const lang = voice.lang.split("-")[0];
      if (!groups[lang]) {
        groups[lang] = [];
      }
      groups[lang].push(voice);
      return groups;
    },
    {}
  );

  // Handle selection
  const handleSelect = (voice: Voice) => {
    onSelect(voice);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".voice-selector")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={cn(
        "voice-selector relative w-full",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full h-10 px-4 py-2",
          "rounded-md border border-input shadow-subtle",
          "bg-background text-foreground",
          "hover:bg-accent/50 focus:outline-none focus:ring-1 focus:ring-ring",
          "transition-colors duration-200"
        )}
      >
        <span className="truncate">
          {selectedVoice
            ? `${selectedVoice.name} (${selectedVoice.lang})`
            : "Select a voice"}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground ml-2 transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full max-h-96 overflow-y-auto rounded-md border border-border",
            "bg-background shadow-medium animate-fade-in"
          )}
        >
          <div className="p-2 sticky top-0 bg-background border-b border-border z-10">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search voices..."
              className={cn(
                "w-full h-10 px-3 py-2 rounded-md",
                "border border-input bg-background",
                "focus:outline-none focus:ring-1 focus:ring-ring",
                "text-sm text-foreground"
              )}
            />
          </div>

          <div className="py-1">
            {Object.entries(groupedVoices).map(([lang, langVoices]) => (
              <div key={lang} className="px-2 py-1.5">
                <div className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {new Intl.DisplayNames([navigator.language], { type: 'language' }).of(lang) || lang}
                </div>
                {langVoices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => handleSelect(voice)}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded-md text-sm",
                      "transition-colors duration-150",
                      selectedVoice?.id === voice.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                    )}
                  >
                    <span className="font-medium">{voice.name}</span>
                    <span className="text-xs ml-1 opacity-80">
                      ({voice.lang})
                    </span>
                  </button>
                ))}
              </div>
            ))}

            {filteredVoices.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                No voices found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSelector;
