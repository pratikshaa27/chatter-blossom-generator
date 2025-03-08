
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "Enter text to speak...",
  className,
  maxLength = 1000,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);

  // Adjust textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setCharCount(value.length);
  }, [value]);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "relative rounded-lg transition-all duration-200 ease-in-out bg-background",
          "border border-input focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20",
          "overflow-hidden",
          isFocused ? "shadow-md" : "shadow-subtle"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          className={cn(
            "w-full resize-none px-4 py-3 focus:outline-none bg-transparent",
            "text-base text-foreground",
            "placeholder:text-muted-foreground/70",
            "transition-all duration-200 ease-in-out",
            "min-h-[120px]"
          )}
        />
        <div className="absolute bottom-1 right-2 text-xs text-muted-foreground/60">
          {charCount}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default TextInput;
