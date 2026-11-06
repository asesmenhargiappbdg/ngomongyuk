import React, { useState } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function AudioPlayerButton({ 
  text, 
  rate = 0.85, 
  label = "Dengarkan", 
  size = "md",
  className = "" 
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      speechService.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speechService.speakEnglish(text, {
      rate: rate,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2.5"
  }[size] || "px-3 py-1.5 text-sm gap-2";

  return (
    <button
      onClick={handlePlay}
      className={`inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 shadow-sm active:scale-95 ${
        isPlaying 
          ? "bg-amber-500 text-white shadow-amber-200 ring-2 ring-amber-300 animate-pulse" 
          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border border-indigo-200/70"
      } ${sizeClasses} ${className}`}
      title={isPlaying ? "Klik untuk menghentikan suara" : `Dengarkan pengucapan (Kecepatan ${rate}x)`}
    >
      {isPlaying ? (
        <>
          <Pause className="w-4 h-4 animate-spin text-white" />
          <span>{label || "Memutar..."}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-indigo-600" />
          <span>{label}</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-indigo-200/70 text-indigo-800 rounded-md">
            {rate}x
          </span>
        </>
      )}
    </button>
  );
}
