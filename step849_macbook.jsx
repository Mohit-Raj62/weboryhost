import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const MacbookScroll = ({
  title = "Turning Imagination Into Reality"
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring physics for natural scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 25,
    restDelta: 0.001
  });

  // Card movement strictly starts on the screen and slides down across the keyboard
  // 0 -> 0.10: Card stays seated on the screen (zero overlap with keyboard)
  // 0.10 -> 0.70: Card smoothly glides down across the hinge and over the keyboard
  // 0.70 -> 0.95: Card moves off the bottom edge and fades out
  const cardTranslateY = useTransform(
    smoothProgress,
    [0, 0.1, 0.42, 0.72, 1],
    [0, 0, 220, 480, 680]
  );

  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.68, 0.88, 1],
    [1, 1, 0.35, 0]
  );

  const cardScale = useTransform(
    smoothProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [1, 1, 1.02, 0.98, 0.92]
  );

  const cardShadow = useTransform(
    smoothProgress,
    [0, 0.35, 0.75],
    [
      "0 10px 30px rgba(0,0,0,0.5)",
      "0 25px 60px rgba(0,0,0,0.7)",
      "0 12px 30px rgba(0,0,0,0.3)"
    ]
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] bg-[#f8fafc] text-slate-950 flex flex-col items-center justify-start py-10 sm:py-16 overflow-hidden"
    >
      {/* Sticky Presentation Viewport */}
      <div className="sticky top-12 sm:top-16 w-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
        
        {/* Title above MacBook (Matching Photo 1) */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950">
            {title}
          </h2>
        </div>

        {/* =========================================================================
            ORIGINAL REALISTIC MACBOOK PRO (TOP-DOWN PERSPECTIVE)
        ========================================================================== */}
        <div className="relative w-full max-w-[340px] sm:max-w-[540px] md:max-w-[680px] lg:max-w-[780px] flex flex-col items-center select-none">
          
          {/* ==================== 1. SCREEN / LID ==================== */}
          <div className="relative w-full h-[190px] sm:h-[300px] md:h-[380px] lg:h-[430px] rounded-t-2xl sm:rounded-t-3xl bg-[#080d18] border-[7px] sm:border-[10px] md:border-[12px] border-[#0c1220] shadow-2xl flex flex-col justify-between overflow-hidden z-10">
            
            {/* Top Bezel with Camera Notch */}
            <div className="w-full py-1 sm:py-1.5 bg-[#060912] flex items-center justify-center border-b border-white/[0.04]">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-blue-500/90 shadow-[0_0_6px_#3b82f6]"></span>
              </div>
            </div>

            {/* Inner Screen Display (Behind Card) with Centered `>` Prompt */}
            <div className="relative flex-1 bg-gradient-to-b from-[#080d1c] via-[#05070f] to-[#080d1c] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent pointer-events-none"></div>

              {/* Glowing `>` prompt revealed as card slides down (Photos 2 & 3) */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold text-white/95 drop-shadow-[0_0_24px_rgba(255,255,255,0.7)] animate-pulse">
                  &gt;
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-500 tracking-wider mt-2">
                  webory-core: ready
                </span>
              </div>

              {/* Subtle screen gloss reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none"></div>
            </div>

            {/* Bottom Bezel */}
            <div className="w-full py-1 bg-[#060912] text-center border-t border-white/[0.04]">
              <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
                WEBORY PRO
              </span>
            </div>

            {/* =========================================================================
                REDESIGNED TEMPLATE CARD (EXACT MATCHING PHOTO 1)
                Deep matte black, sandblasted stipple texture, serif luxury typography,
                sits strictly inside the screen frame initially without touching keyboard.
            ========================================================================== */}
            <motion.div
              style={{
                translateY: cardTranslateY,
                opacity: cardOpacity,
                scale: cardScale,
                boxShadow: cardShadow
              }}
              className="absolute inset-x-2.5 sm:inset-x-3.5 inset-y-2.5 sm:inset-y-3.5 z-20 rounded-xl sm:rounded-2xl bg-[#090d14] border border-white/10 flex flex-col items-center justify-center p-4 sm:p-8 text-center overflow-hidden pointer-events-none"
            >
              {/* Ultra-Realistic Sandblasted Matte Stipple Texture (Matching Photo 1) */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
                  backgroundSize: "7px 7px"
                }}
              />

              {/* Vignette lighting from top-right to bottom-left */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/80 pointer-events-none"></div>

              {/* Card Typography (Exact 1:1 match with Photo 1) */}
              <div className="relative z-10 space-y-1 sm:space-y-2.5">
                {/* Brand Name in elegant bold serif font */}
                <h3
                  className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.35)]"
                  style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }}
                >
                  Webory Technologies
                </h3>

                {/* Company entity subtitle */}
                <p className="text-xs sm:text-base md:text-lg font-medium tracking-widest text-slate-200 font-mono">
                  Webory Tech Pvt. Ltd.
                </p>

                {/* Tagline */}
                <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.28em] text-slate-400 font-medium uppercase pt-0.5 sm:pt-1">
                  Innovate. Build. Scale.
                </p>
              </div>

              {/* Subtle Card Accent */}
              <div className="absolute bottom-2 sm:bottom-3 text-[9px] sm:text-[10px] font-mono text-slate-500">
                ● Enterprise Cloud Architecture
              </div>
            </motion.div>

          </div>

          {/* ==================== 2. HINGE BAR ==================== */}
          <div className="w-[90%] h-2.5 sm:h-3 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 rounded-full shadow-inner z-10 -mt-1"></div>

          {/* ==================== 3. UNIBODY BASE CHASSIS (THE ONE YOU LIKED) ==================== */}
          <div className="relative w-full h-[220px] sm:h-[340px] md:h-[420px] lg:h-[470px] rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#e5e5e7] via-[#d4d4d8] to-[#a1a1aa] border-t border-slate-300 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] p-2.5 sm:p-5 flex flex-col justify-between -mt-0.5 z-10">
            
            {/* Top row: Left Speaker + Keyboard + Right Speaker */}
            <div className="flex items-stretch gap-1 sm:gap-2">
              
              {/* Left Speaker Grille */}
              <div className="w-2.5 sm:w-5 md:w-6 bg-slate-400/25 rounded-lg p-0.5 flex flex-col justify-around overflow-hidden hidden sm:flex">
                <div className="w-full h-full bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:3px_3px] opacity-70"></div>
              </div>

              {/* Recessed Keyboard Chassis */}
              <div className="flex-1 bg-[#080c14] rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-slate-800/90 shadow-inner flex flex-col justify-between gap-1 sm:gap-1.5">
                
                {/* Row 1: Function Keys */}
                <div className="gap-0.5 sm:gap-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                  {['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((k) => (
                    <div
                      key={k}
                      className="h-3.5 sm:h-5 md:h-6 rounded bg-[#182030] border border-slate-700/60 shadow-xs flex items-center justify-center text-[7px] sm:text-[9px] md:text-[10px] text-slate-300 font-mono font-medium"
                    >
                      {k}
                    </div>
                  ))}
                  {/* Touch ID Sensor */}
                  <div className="h-3.5 sm:h-5 md:h-6 rounded bg-[#0d131f] border border-slate-600 shadow-inner flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full border border-slate-500"></span>
                  </div>
                </div>

                {/* Row 2: Numbers */}
                <div className="gap-0.5 sm:gap-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                  {['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'].map((k) => (
                    <div
                      key={k}
                      className={`h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] md:text-xs text-slate-200 font-mono ${
                        k === 'delete' ? 'col-span-2' : ''
                      }`}
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* Row 3: QWERTY */}
                <div className="gap-0.5 sm:gap-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                  {['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k) => (
                    <div
                      key={k}
                      className={`h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] md:text-xs text-slate-200 font-mono ${
                        k === 'tab' ? 'col-span-2' : ''
                      }`}
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* Row 4: ASDF */}
                <div className="gap-0.5 sm:gap-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                  {['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'].map((k) => (
                    <div
                      key={k}
                      className={`h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] md:text-xs text-slate-200 font-mono ${
                        k === 'caps' || k === 'return' ? 'col-span-2' : ''
                      }`}
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* Row 5: ZXCV */}
                <div className="gap-0.5 sm:gap-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                  {['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift'].map((k, idx) => (
                    <div
                      key={idx}
                      className={`h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 shadow-xs flex items-center justify-center text-[8px] sm:text-[10px] md:text-xs text-slate-200 font-mono ${
                        k === 'shift' ? 'col-span-2' : ''
                      }`}
                    >
                      {k}
                    </div>
                  ))}
                </div>

                {/* Row 6: Modifiers & Spacebar */}
                <div className="grid grid-cols-12 gap-0.5 sm:gap-1">
                  <div className="h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">fn</div>
                  <div className="h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">ctrl</div>
                  <div className="h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">opt</div>
                  <div className="h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">cmd</div>
                  <div className="col-span-4 h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 shadow-inner"></div>
                  <div className="h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">cmd</div>
                  <div className="h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">opt</div>
                  <div className="col-span-2 h-4 sm:h-6 md:h-7 rounded bg-[#182030] border border-slate-700/60 flex items-center justify-center text-[8px] sm:text-[10px] text-slate-300 font-mono">◀ ▲ ▼ ▶</div>
                </div>

              </div>

              {/* Right Speaker Grille */}
              <div className="w-2.5 sm:w-5 md:w-6 bg-slate-400/25 rounded-lg p-0.5 flex flex-col justify-around overflow-hidden hidden sm:flex">
                <div className="w-full h-full bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:3px_3px] opacity-70"></div>
              </div>

            </div>

            {/* Force Touch Glass Trackpad */}
            <div className="w-32 sm:w-56 md:w-68 lg:w-76 h-14 sm:h-22 md:h-26 mx-auto mt-2 rounded-xl bg-slate-300/60 border border-slate-400/60 shadow-inner"></div>

            {/* Front Lip Opening Notch */}
            <div className="w-16 sm:w-24 h-1 sm:h-1.5 mx-auto rounded-b-md bg-slate-400/80 -mb-1"></div>

          </div>

        </div>

        {/* Scroll Helper */}
        <div className="mt-8 text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>Scroll down to slide card & reveal platform</span>
        </div>

      </div>
    </div>
  );
};

export default MacbookScroll;
