"use client";
import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VideoSection() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <section className="w-full bg-[#F0EDE6] pt-30 pb-20 px-6 flex flex-col items-center">
      <h2 className="text-[24px] md:text-[44px] text-[#1A3FA8] font-bold text-center max-w-5xl mb-14 leading-tight">
        Built On Insider Understanding Of Enterprise Buying Behavior And Decision-Making.
      </h2>
      
      {/* Video Content */}
      <div 
        className="w-full max-w-6xl aspect-[16/9] bg-[#D3DBFF] rounded-sm shadow-xl overflow-hidden relative border border-[#1A3FA820] cursor-pointer group"
        onClick={toggleMute}
      >
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Mute/Unmute Overlay */}
        <div className="absolute bottom-6 right-6 p-3 bg-black/40 backdrop-blur-sm rounded-full text-white transition-opacity duration-300 opacity-60 group-hover:opacity-100">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </div>

        {/* Center Prompt (Only when muted) */}
        {isMuted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-colors">
            <span className="bg-white/90 text-[#1A3FA8] px-6 py-2 rounded-full font-semibold shadow-lg transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-2">
              <Volume2 size={18} /> Click to unmute
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
