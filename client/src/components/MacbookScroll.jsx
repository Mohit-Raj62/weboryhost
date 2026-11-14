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
    offset: ["start start", "end end"],
  });

  // Silky smooth spring physics for high-end scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Card translation: starts inside the screen, glides down across hinge, keyboard & trackpad
  // 0 -> 0.08: Card stays perfectly parked inside the screen
  // 0.08 -> 0.40: Card glides down across the hinge and upper keyboard
  // 0.40 -> 0.72: Card moves across the lower keyboard and trackpad
  // 0.72 -> 0.95: Card glides off the bottom lip and fades out
  const cardTranslateY = useTransform(
    smoothProgress,
    [0, 0.08, 0.38, 0.70, 0.96],
    [0, 0, 190, 390, 560]
  );

  // Card opacity: fades away at the bottom
  const cardOpacity = useTransform(
    smoothProgress,
    [0, 0.68, 0.88, 0.98],
    [1, 1, 0.35, 0]
  );

  // Subtle 3D perspective tilt as the card moves down from tilted screen to flat base
  const cardRotateX = useTransform(
    smoothProgress,
    [0, 0.08, 0.35, 0.75],
    [0, 0, 8, 12]
  );

  // Subtle card scale for realistic depth
  const cardScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.65, 0.95],
    [1, 1.02, 1.0, 0.96]
  );

  // Card drop shadow that deepens as it floats over the keyboard
  const cardShadow = useTransform(
    smoothProgress,
    [0, 0.2, 0.6, 0.9],
    [
      "0 4px 12px rgba(0,0,0,0.3)",
      "0 20px 45px rgba(0,0,0,0.65)",
      "0 24px 50px rgba(0,0,0,0.5)",
      "0 10px 25px rgba(0,0,0,0.2)"
    ]
  );

  // Title subtle parallax fade
  const titleY = useTransform(smoothProgress, [0, 0.25], [0, -30]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[190vh] sm:min-h-[220vh] bg-white py-12 px-4 sm:px-6 overflow-hidden"
    >
      {/* Sticky Presentation Viewport */}
      <div className="sticky top-12 sm:top-16 w-full max-w-6xl mx-auto flex flex-col items-center justify-start z-10">
        
        {/* Section Header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center mb-6 sm:mb-10 max-w-2xl px-4"
        >
          {badge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              {badge}
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            {title}
          </h2>
        </motion.div>

        {/* =====================================================================
            AUTHENTIC APPLE MACBOOK PRO UNIBODY (16-INCH PROPORTIONS)
        ====================================================================== */}
        <div className="relative w-full max-w-[820px] mx-auto select-none scale-[0.62] xs:scale-[0.72] sm:scale-[0.88] md:scale-100 origin-top">
          
          {/* =================================================================
              1. MACBOOK DISPLAY (LID)
          ================================================================== */}
          <div
            className="relative mx-auto w-[680px] h-[360px] rounded-t-2xl p-3 bg-gradient-to-b from-[#1c1c1e] to-[#0c0c0e] shadow-2xl border-t border-x border-[#38383a]"
            style={{
              transform: "perspective(1200px) rotateX(-12deg)",
              transformOrigin: "bottom center",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.15)",
            }}
          >
            {/* Apple Camera Notch / Housing */}
            <div className="absolute top-1 inset-x-0 mx-auto w-16 h-3 bg-[#0c0c0e] rounded-b-md flex items-center justify-center gap-2 z-30">
              {/* Camera Lens */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#050505] border border-[#2c2c2e] flex items-center justify-center">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-900/80"></div>
              </div>
              {/* Green Indicator LED */}
              <div className="w-1 h-1 rounded-full bg-emerald-500/40"></div>
            </div>

            {/* Inner Display Screen with Bezel */}
            <div className="relative w-full h-full rounded-lg bg-black overflow-hidden border border-[#272729] shadow-inner flex items-center justify-center">
              
              {/* Underlying Screen (Revealed as Card Slides Down) */}
              <div className="absolute inset-0 bg-[#080a10] flex flex-col items-center justify-center">
                {/* TechServeNexus Style Terminal Chevron '>' */}
                <div className="text-white/80 flex flex-col items-center gap-2">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 66 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white/70"
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

                {/* Subtle Grid Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
              </div>

              {/* =============================================================
                  THE SLIDING CARD (PARKED IN SCREEN, GLIDES OVER KEYBOARD)
              ============================================================== */}
              <motion.div
                style={{
                  y: cardTranslateY,
                  opacity: cardOpacity,
                  rotateX: cardRotateX,
                  scale: cardScale,
                  boxShadow: cardShadow,
                }}
                className="absolute inset-0 w-full h-full rounded-lg overflow-hidden z-20 cursor-pointer"
              >
                <img
                  src={src}
                  alt="Webory Digital Platform"
                  className="w-full h-full object-cover object-center select-none"
                  draggable={false}
                />
              </motion.div>

            </div>
          </div>

          {/* =================================================================
              2. LAPTOP HINGE / CLUTCH BARREL
          ================================================================== */}
          <div className="relative mx-auto w-[684px] h-3 bg-gradient-to-b from-[#111317] via-[#1c1f26] to-[#090b0e] rounded-sm z-0 shadow-sm border-t border-[#2d3139]"></div>

          {/* =================================================================
              3. MACBOOK TOP CASE / UNIBODY BASE
          ================================================================== */}
          <div
            className="relative mx-auto w-[800px] h-[340px] rounded-2xl bg-gradient-to-b from-[#e5e7eb] via-[#d1d5db] to-[#9ca3af] p-3 shadow-2xl border-t border-slate-200"
            style={{
              boxShadow: "0 25px 60px -15px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.9)",
            }}
          >
            {/* Top Case Inner Surface & Acoustic Speakers */}
            <div className="relative flex items-start justify-between w-full h-[220px]">
              
              {/* Left Laser-Drilled Speaker Grille */}
              <div className="w-12 h-[200px] mt-2 overflow-hidden flex flex-col justify-center">
                <SpeakerGrille />
              </div>

              {/* Recessed Keyboard Well */}
              <div className="flex-1 mx-2 h-full bg-[#08080a] rounded-xl p-2 border border-[#27272a] shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]">
                <KeyboardLayout />
              </div>

              {/* Right Laser-Drilled Speaker Grille */}
              <div className="w-12 h-[200px] mt-2 overflow-hidden flex flex-col justify-center">
                <SpeakerGrille />
              </div>
            </div>

            {/* Apple Force Touch Glass Trackpad */}
            <div className="relative mx-auto mt-2 w-[240px] h-[95px] rounded-xl bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1] border border-slate-300/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),_0_1px_3px_rgba(0,0,0,0.1)]"></div>

            {/* Front Lip Display Opening Thumb Scoop */}
            <div className="absolute inset-x-0 -bottom-1 mx-auto w-24 h-2 rounded-b-lg bg-gradient-to-b from-[#64748b] to-[#334155] shadow-xs"></div>
          </div>

        </div>

      </div>
    </section>
  );
};

/* ============================================================================
   AUTHENTIC APPLE LASER SPEAKER GRILLE
============================================================================= */
const SpeakerGrille = () => {
  return (
    <div className="flex flex-col gap-1 w-full items-center opacity-40">
      {Array.from({ length: 32 }).map((_, r) => (
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
        <KeyBtn label="F1" />
        <KeyBtn label="F2" />
        <KeyBtn label="F3" />
        <KeyBtn label="F4" />
        <KeyBtn label="F5" />
        <KeyBtn label="F6" />
        <KeyBtn label="F7" />
        <KeyBtn label="F8" />
        <KeyBtn label="F9" />
        <KeyBtn label="F10" />
        <KeyBtn label="F11" />
        <KeyBtn label="F12" />
        <KeyBtn width="w-8">
          <div className="w-3.5 h-3.5 rounded-full border border-neutral-700 bg-neutral-900 mx-auto"></div>
        </KeyBtn>
      </div>

      {/* Row 2: Numbers */}
      <div className="flex gap-1 w-full h-[28px]">
        <KeyBtn label="~" subLabel="`" />
        <KeyBtn label="!" subLabel="1" />
        <KeyBtn label="@" subLabel="2" />
        <KeyBtn label="#" subLabel="3" />
        <KeyBtn label="$" subLabel="4" />
        <KeyBtn label="%" subLabel="5" />
        <KeyBtn label="^" subLabel="6" />
        <KeyBtn label="&" subLabel="7" />
        <KeyBtn label="*" subLabel="8" />
        <KeyBtn label="(" subLabel="9" />
        <KeyBtn label=")" subLabel="0" />
        <KeyBtn label="_" subLabel="-" />
        <KeyBtn label="+" subLabel="=" />
        <KeyBtn label="delete" width="w-11" align="right" />
      </div>

      {/* Row 3: QWERTY */}
      <div className="flex gap-1 w-full h-[28px]">
        <KeyBtn label="tab" width="w-11" align="left" />
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k) => (
          <KeyBtn key={k} label={k} />
        ))}
      </div>

      {/* Row 4: Home Row */}
      <div className="flex gap-1 w-full h-[28px]">
        <KeyBtn label="caps lock" width="w-12" align="left" />
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\''].map((k) => (
          <KeyBtn key={k} label={k} />
        ))}
        <KeyBtn label="return" width="w-12" align="right" />
      </div>

      {/* Row 5: Shift */}
      <div className="flex gap-1 w-full h-[28px]">
        <KeyBtn label="shift" width="w-14" align="left" />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'].map((k) => (
          <KeyBtn key={k} label={k} />
        ))}
        <KeyBtn label="shift" width="w-14" align="right" />
      </div>

      {/* Row 6: Modifier Keys & Spacebar */}
      <div className="flex gap-1 w-full h-[28px]">
        <KeyBtn label="fn" width="w-7" />
        <KeyBtn label="control" width="w-8" />
        <KeyBtn label="option" width="w-8" />
        <KeyBtn label="⌘ cmd" width="w-10" />
        <div className="flex-1 bg-gradient-to-b from-[#18181b] to-[#111113] rounded-[4px] border border-[#27272a] shadow-[0_1px_1px_rgba(0,0,0,0.8)]"></div>
        <KeyBtn label="⌘ cmd" width="w-10" />
        <KeyBtn label="option" width="w-8" />
        {/* Inverted T Arrows */}
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
      className={`${width} ${height} rounded-[4px] bg-gradient-to-b from-[#18181b] to-[#0f0f11] border border-[#27272a] shadow-[0_1px_1px_rgba(0,0,0,0.9),_inset_0_0.5px_0.5px_rgba(255,255,255,0.12)] flex flex-col justify-center px-1 text-neutral-300 font-medium ${
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

