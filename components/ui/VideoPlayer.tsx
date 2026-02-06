"use client";

import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, title, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const handlePlay = () => {
    setShouldLoad(true);
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    const playPromise = videoRef.current.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Ignorer les blocages d'autoplay
      });
    }
  }, [shouldLoad]);

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-2xl bg-white outline-none focus:outline-none ${className}`}>
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        controls
        preload="none"
        playsInline
        onPause={handlePause}
        onPlay={() => setIsPlaying(true)}
        className="w-full h-full object-cover outline-none focus:outline-none focus-visible:outline-none"
      />

      {!isPlaying && (
        <button
          onClick={handlePlay}
          aria-label="Lire la vidéo"
          className="absolute w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition hover:scale-110 bg-primary"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      )}

      {title && (
        <div className="px-4 py-3 border-t bg-white">
          <p className="text-center text-sm text-gray-700">{title}</p>
        </div>
      )}
    </div>
  );
}
