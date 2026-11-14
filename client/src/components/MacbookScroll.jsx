import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const MacbookScroll = ({
  src = "/webory_card.svg",
  title = "Turning Imagination Into Reality",
  badge = "Our Digital Ecosystem",
}) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring physics for natural, responsive scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  // Card movement: parked on screen -> slides over hinge -> glides across keyboard & trackpad -> fades out
  const cardTranslateY = useTransform(
    smoothProgress,
    [0, 0.08, 0.38, 0.72, 0.96],
    [0, 0, 200, 420, 620]
  );

  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.70, 0.90, 0.98],
    [1, 1, 0.35, 0]
  );

  const cardScale = useTransform(
    smoothProgress,
    [0, 0.20, 0.60, 0.96],
    [1, 1.02, 1.0, 0.94]
  );

  const cardShadow = useTransform(
    smoothProgress,
    [0, 0.25, 0.65, 0.92],
    [
      "0 8px 20px rgba(0,0,0,0.4)",
      "0 24px 50px rgba(0,0,0,0.7)",
      "0 20px 45px rgba(0,0,0,0.5)",
      "0 8px 20px rgba(0,0,0,0.2)"
    ]
  );

  const titleY = useTransform(smoothProgress, [0, 0.25], [0, -30]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[210vh] bg-white py-14 px-4 sm:px-6 overflow-hidden"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-10 sm:top-14 w-full max-w-6xl mx-auto flex flex-col items-center justify-start z-10">
        
        {/* Section Header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-6 sm:mb-10 max-w-2xl px-4"
        >
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              {badge}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            {title}
          </h2>
        </motion.div>

        {/* =========================================================================
            REALISTIC 3D APPLE MACBOOK PRO UNIBODY
        ========================================================================== */}
        <div className="relative w-full max-w-[840px] mx-auto select-none scale-[0.60] xs:scale-[0.70] sm:scale-[0.85] md:scale-100 origin-top [perspective:1200px]">
          
          {/* =====================================================================
              1. MACBOOK LID / RETINA DISPLAY (Tilted back in 3D perspective)
          ====================================================================== */}
          <div
            className="relative mx-auto w-[710px] h-[410px] rounded-t-2xl p-3 bg-gradient-to-b from-[#1e1e20] via-[#111113] to-[#0a0a0c] border-t border-x border-[#3a3a3d]"
            style={{
              transform: "perspective(1200px) rotateX(-16deg)",
              transformOrigin: "bottom center",
              boxShadow: "0 -12px 40px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.2)",
            }}
          >
            {/* Apple Camera Notch Housing */}
            <div className="absolute top-1 inset-x-0 mx-auto w-20 h-3.5 bg-[#0a0a0c] rounded-b-md flex items-center justify-center gap-2 z-30 shadow-xs">
              {/* Camera Lens */}
              <div className="w-2 h-2 rounded-full bg-[#050505] border border-[#2b2b2e] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-950"></div>
              </div>
              {/* Ambient Sensor */}
              <div className="w-1 h-1 rounded-full bg-emerald-500/30"></div>
            </div>

            {/* Inner Display Screen Area (16:10 Aspect Ratio) */}
            <div className="relative w-full h-full rounded-lg bg-black overflow-hidden border border-[#262629] shadow-inner flex items-center justify-center">
              
              {/* Underlying Screen (Revealed behind sliding card) */}
              <div className="absolute inset-0 bg-radial from-[#131b2e] via-[#090d16] to-[#04060a] flex flex-col items-center justify-center">
                {/* TechServeNexus Style Terminal Chevron '>' */}
                <div className="text-white/80 flex flex-col items-center gap-2">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 66 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-9 text-white/80"
                  >
                    <path
                      d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeMiterlimit="3.86874"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-mono text-xs text-slate-400 tracking-wider">
                    webory.system // live
                  </span>
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
              </div>

              {/* =============================================================
                  THE SLIDING CARD (PARKED IN SCREEN, GLIDES OVER KEYBOARD)
              ============================================================== */}
              <motion.div
                style={{
                  y: cardTranslateY,
                  opacity: cardOpacity,
                  scale: cardScale,
                  boxShadow: cardShadow,
                }}
                className="absolute inset-0 w-full h-full rounded-lg overflow-hidden z-20 cursor-pointer"
              >
                <img
                  src={src}
                  alt="Webory Technologies"
                  className="w-full h-full object-cover object-center select-none"
                  draggable={false}
                />
              </motion.div>

            </div>
          </div>

          {/* =====================================================================
              2. LAPTOP HINGE BAR / CLUTCH BARREL
          ====================================================================== */}
          <div className="relative mx-auto w-[714px] h-3.5 bg-gradient-to-b from-[#111317] via-[#1f2229] to-[#0c0e12] rounded-sm z-0 shadow-sm border-t border-[#2d3139]"></div>

          {/* =====================================================================
              3. APPLE MACBOOK UNIBODY TOP CASE / BASE
          ====================================================================== */}
          <div
            className="relative mx-auto w-[820px] h-[360px] rounded-2xl bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] p-3 shadow-2xl border-t border-slate-200"
            style={{
              boxShadow: "0 30px 70px -15px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.9)",
            }}
          >
            {/* Top Case Surface: Speakers + Keyboard Well */}
            <div className="relative flex items-start justify-between w-full h-[235px]">
              
              {/* Left Laser-Drilled Acoustic Speaker Grille */}
              <div className="w-12 h-[215px] mt-2 overflow-hidden flex flex-col justify-center">
                <SpeakerGrille />
              </div>

              {/* Recessed Anodized Keyboard Well */}
              <div className="flex-1 mx-2 h-full bg-[#08080a] rounded-xl p-2 border border-[#27272a] shadow-[inset_0_4px_14px_rgba(0,0,0,0.85)]">
                <KeyboardLayout />
              </div>

              {/* Right Laser-Drilled Acoustic Speaker Grille */}
              <div className="w-12 h-[215px] mt-2 overflow-hidden flex flex-col justify-center">
                <SpeakerGrille />
              </div>
            </div>

            {/* Apple Force Touch Glass Trackpad */}
            <div className="relative mx-auto mt-2 w-[250px] h-[100px] rounded-xl bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1] border border-slate-300/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.85),_0_1px_3px_rgba(0,0,0,0.12)]"></div>

            {/* Front Lip Display Opening Thumb Notch */}
            <div className="absolute inset-x-0 -bottom-1 mx-auto w-24 h-2 rounded-b-lg bg-gradient-to-b from-[#64748b] to-[#334155] shadow-2xs"></div>
          </div>

        </div>

        {/* Scroll Helper */}
        <div className="mt-8 text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>Scroll down to slide card & reveal platform</span>
        </div>

      </div>
    </section>
  );
};

/* ============================================================================
   AUTHENTIC APPLE LASER-DRILLED ACOUSTIC SPEAKER GRILLE
============================================================================= */
const SpeakerGrille = () => {
  return (
    <div className="flex flex-col gap-1 w-full items-center opacity-45">
      {Array.from({ length: 34 }).map((_, r) => (
        <div key={r} className="flex gap-1">
          {Array.from({ length: 5 }).map((_, c) => (
            <div
              key={c}
              className="w-[1.5px] h-[1.5px] rounded-full bg-[#475569]"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/* ============================================================================
   AUTHENTIC APPLE MACBOOK PRO KEYBOARD LAYOUT
============================================================================= */
const KeyboardLayout = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full select-none text-[8px] font-sans">
      
      {/* Row 1: Function Keys + Touch ID */}
      <div className="flex gap-1 w-full h-[22px]">
        <KeyBtn label="esc" width="w-8" />
        <KeyBtn label="F1" subLabel="🔅" />
        <KeyBtn label="F2" subLabel="🔆" />
        <KeyBtn label="F3" subLabel="◻️" />
        <KeyBtn label="F4" subLabel="🔍" />
        <KeyBtn label="F5" subLabel="🎤" />
        <KeyBtn label="F6" subLabel="🌙" />
        <KeyBtn label="F7" subLabel="⏮" />
        <KeyBtn label="F8" subLabel="⏯" />
        <KeyBtn label="F9" subLabel="⏭" />
        <KeyBtn label="F10" subLabel="🔇" />
        <KeyBtn label="F11" subLabel="🔉" />
        <KeyBtn label="F12" subLabel="🔊" />
        {/* Touch ID Sensor Key */}
        <KeyBtn width="w-8">
          <div className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-neutral-900 mx-auto flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-neutral-800"></div>
          </div>
        </KeyBtn>
      </div>

      {/* Row 2: Numbers */}
      <div className="flex gap-1 w-full h-[30px]">
        <KeyBtn label="~" subLabel="`" />
        <KeyBtn label="!" subLabel="1" />
        <KeyBtn label="@" subLabel="2" />
        <KeyBtn label="#" subLabel="3" />
        <KeyBtn label="₹" subLabel="4" />
        <KeyBtn label="%" subLabel="5" />
        <KeyBtn label="^" subLabel="6" />
        <KeyBtn label="&" subLabel="7" />
        <KeyBtn label="*" subLabel="8" />
        <KeyBtn label="(" subLabel="9" />
        <KeyBtn label=")" subLabel="0" />
        <KeyBtn label="_" subLabel="-" />
        <KeyBtn label="+" subLabel="=" />
        <KeyBtn label="delete" width="w-12" align="right" />
      </div>

      {/* Row 3: QWERTY */}
      <div className="flex gap-1 w-full h-[30px]">
        <KeyBtn label="tab" width="w-12" align="left" />
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k) => (
          <KeyBtn key={k} label={k} />
        ))}
      </div>

      {/* Row 4: Home Row */}
      <div className="flex gap-1 w-full h-[30px]">
        <KeyBtn label="caps lock" width="w-14" align="left" />
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''].map((k) => (
          <KeyBtn key={k} label={k} />
        ))}
        <KeyBtn label="return" width="w-14" align="right" />
      </div>

      {/* Row 5: Shift */}
      <div className="flex gap-1 w-full h-[30px]">
        <KeyBtn label="shift" width="w-16" align="left" />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'].map((k) => (
          <KeyBtn key={k} label={k} />
        ))}
        <KeyBtn label="shift" width="w-16" align="right" />
      </div>

      {/* Row 6: Modifier Keys & Spacebar */}
      <div className="flex gap-1 w-full h-[30px]">
        <KeyBtn label="fn" width="w-8" />
        <KeyBtn label="control" width="w-8" />
        <KeyBtn label="option" width="w-9" />
        <KeyBtn label="⌘ cmd" width="w-11" />
        {/* Apple Spacebar */}
        <div className="flex-1 bg-gradient-to-b from-[#18181b] to-[#0f0f11] rounded-[4px] border border-[#27272a] shadow-[0_1px_1.5px_rgba(0,0,0,0.85)]"></div>
        <KeyBtn label="⌘ cmd" width="w-11" />
        <KeyBtn label="option" width="w-9" />
        {/* Inverted T Arrow Cluster */}
        <div className="flex items-center gap-0.5 w-14">
          <KeyBtn label="◀" width="w-4" height="h-6" />
          <div className="flex flex-col gap-0.5">
            <KeyBtn label="▲" width="w-4" height="h-2.5" />
            <KeyBtn label="▼" width="w-4" height="h-2.5" />
          </div>
          <KeyBtn label="▶" width="w-4" height="h-6" />
        </div>
      </div>

    </div>
  );
};

/* ============================================================================
   INDIVIDUAL CHICLET KEYCAP
============================================================================= */
const KeyBtn = ({
  label,
  subLabel,
  width = "flex-1",
  height = "h-full",
  align = "center",
  children,
}) => {
  return (
    <div
      className={`${width} ${height} rounded-[4px] bg-gradient-to-b from-[#18181b] to-[#0f0f11] border border-[#27272a] shadow-[0_1.5px_2px_rgba(0,0,0,0.9),_inset_0_0.5px_0.5px_rgba(255,255,255,0.12)] flex flex-col justify-center px-1 text-neutral-300 font-medium ${
        align === 'left' ? 'items-start pl-1.5' : align === 'right' ? 'items-end pr-1.5' : 'items-center'
      }`}
    >
      {children ? (
        children
      ) : (
        <>
          {subLabel && <span className="text-[6px] text-neutral-400 -mb-0.5">{subLabel}</span>}
          <span className="leading-tight">{label}</span>
        </>
      )}
    </div>
  );
};

export default MacbookScroll;
