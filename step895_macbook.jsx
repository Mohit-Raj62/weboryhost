import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const MacbookScroll = ({
  src = "/webory_card.svg",
  showGradient = false,
  title = "Turning Imagination Into Reality",
  badge,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Exact Aceternity UI scroll transform values (as used by TechServeNexus)
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="w-full overflow-hidden bg-white py-16 sm:py-24 px-4 sm:px-8">
      {/* Desktop Animated Aceternity MacBook */}
      <div className="hidden md:block">
        <div
          ref={ref}
          className="flex min-h-[130vh] shrink-0 scale-[0.35] transform flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100 lg:scale-110 md:py-16"
        >
          <motion.h2
            style={{
              translateY: textTransform,
              opacity: textOpacity,
            }}
            className="mb-20 text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950"
          >
            {title}
          </motion.h2>

          {/* Lid with Sliding Card */}
          <Lid
            src={src}
            scaleX={scaleX}
            scaleY={scaleY}
            rotate={rotate}
            translate={translate}
          />

          {/* Base Area */}
          <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200">
            {/* Above keyboard black bar */}
            <div className="relative h-10 w-full">
              <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
            </div>

            <div className="relative flex">
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
              <div className="mx-auto h-full w-[80%]">
                <Keypad />
              </div>
              <div className="mx-auto h-full w-[10%] overflow-hidden">
                <SpeakerGrid />
              </div>
            </div>

            <Trackpad />

            <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />

            {showGradient && (
              <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent"></div>
            )}
            {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
          </div>
        </div>
      </div>

      {/* Mobile Fallback Card (Matching TechServeNexus mobile layout) */}
      <div className="block md:hidden py-6 px-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-slate-950 mb-6">
          {title}
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 mx-auto max-w-lg bg-black">
          <img
            src={src}
            alt="Webory Digital Platform"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export const Lid = ({ scaleX, scaleY, rotate, translate, src }) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px #171717 inset",
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          {/* Centered Chevron SVG (TechServeNexus `>` mark) */}
          <span className="text-white">
            <svg
              width="66"
              height="65"
              viewBox="0 0 66 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
            >
              <path
                d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                stroke="currentColor"
                strokeWidth="15"
                strokeMiterlimit="3.86874"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* The Animated Moving Screen Lid that Glides Down */}
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <img
          src={src}
          alt="Webory Card"
          className="absolute inset-0 h-full w-full rounded-lg object-contain object-center bg-black brightness-110 contrast-110"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    />
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          esc
        </KBtn>
        <KBtn><span>F1</span></KBtn>
        <KBtn><span>F2</span></KBtn>
        <KBtn><span>F3</span></KBtn>
        <KBtn><span>F4</span></KBtn>
        <KBtn><span>F5</span></KBtn>
        <KBtn><span>F6</span></KBtn>
        <KBtn><span>F7</span></KBtn>
        <KBtn><span>F8</span></KBtn>
        <KBtn><span>F9</span></KBtn>
        <KBtn><span>F10</span></KBtn>
        <KBtn><span>F11</span></KBtn>
        <KBtn><span>F12</span></KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn><span className="block">~</span><span className="mt-1 block">`</span></KBtn>
        <KBtn><span className="block">!</span><span className="block">1</span></KBtn>
        <KBtn><span className="block">@</span><span className="block">2</span></KBtn>
        <KBtn><span className="block">#</span><span className="block">3</span></KBtn>
        <KBtn><span className="block">$</span><span className="block">4</span></KBtn>
        <KBtn><span className="block">%</span><span className="block">5</span></KBtn>
        <KBtn><span className="block">^</span><span className="block">6</span></KBtn>
        <KBtn><span className="block">&</span><span className="block">7</span></KBtn>
        <KBtn><span className="block">*</span><span className="block">8</span></KBtn>
        <KBtn><span className="block">(</span><span className="block">9</span></KBtn>
        <KBtn><span className="block">)</span><span className="block">0</span></KBtn>
        <KBtn><span className="block">&mdash;</span><span className="block">_</span></KBtn>
        <KBtn><span className="block">+</span><span className="block">=</span></KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          delete
        </KBtn>
      </div>

      {/* Third Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          tab
        </KBtn>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((k) => (
          <KBtn key={k}><span className="block">{k}</span></KBtn>
        ))}
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          caps lock
        </KBtn>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"].map((k) => (
          <KBtn key={k}><span className="block">{k}</span></KBtn>
        ))}
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">
          shift
        </KBtn>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'].map((k) => (
          <KBtn key={k}><span className="block">{k}</span></KBtn>
        ))}
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">
          shift
        </KBtn>
      </div>

      {/* Sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-7"><span className="text-[6px]">fn</span></KBtn>
        <KBtn className="w-7"><span className="text-[6px]">control</span></KBtn>
        <KBtn className="w-7"><span className="text-[6px]">option</span></KBtn>
        <KBtn className="w-8"><span className="text-[7px]">⌘ cmd</span></KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn className="w-8"><span className="text-[7px]">⌘ cmd</span></KBtn>
        <KBtn className="w-7"><span className="text-[6px]">option</span></KBtn>
        <div className="flex h-6 w-16 items-center justify-center gap-0.5">
          <KBtn className="h-5 w-4"><span className="text-[6px]">◀</span></KBtn>
          <div className="flex flex-col gap-0.5">
            <KBtn className="h-2.5 w-4"><span className="text-[5px]">▲</span></KBtn>
            <KBtn className="h-2.5 w-4"><span className="text-[5px]">▼</span></KBtn>
          </div>
          <KBtn className="h-5 w-4"><span className="text-[6px]">▶</span></KBtn>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({
  className = "",
  children,
  childrenClassName = "",
  backlit = true,
}) => {
  return (
    <div
      className={`[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform] ${
        backlit ? "bg-white/[0.2] shadow-sm shadow-white/30" : ""
      }`}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D] ${className}`}
        style={{
          boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={`flex w-full flex-col items-center justify-center text-[5px] text-neutral-200 ${childrenClassName} ${
            backlit ? "text-white" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
};

export default MacbookScroll;
