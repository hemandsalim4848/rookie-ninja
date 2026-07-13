"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Client asked to pause the scroll-driven expand/pin effect for now.
// Flip this back to true to restore it — the implementation below is untouched.
const SCROLL_ZOOM_ENABLED = false;

/* ── Static fallback: plain video, scrolls normally, no pin/zoom ── */
function StillVideo() {
  return (
    <section className="relative w-full py-20 px-6 bg-white">
      <div className="relative w-full max-w-5xl mx-auto aspect-video
                      rounded-[32px] overflow-hidden shadow-2xl">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/videoo.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

function FixedVideoExpand() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Width and Height expansion
  const width = useTransform(scrollYProgress, [0, 0.8], ["60%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.8], ["60vh", "100vh"]);
  const rounded = useTransform(scrollYProgress, [0, 0.8], ["32px", "0px"]);

  // We manually handle the "stickiness" by switching to fixed position 
  // while scroll progress is between 0 and 1.
  const position = useTransform(scrollYProgress, (pos) => 
    pos > 0 && pos < 1 ? "fixed" : "absolute"
  );

  // If it's absolute, we need to handle whether it sits at the top or bottom of the container
  const top = useTransform(scrollYProgress, (pos) => 
    pos >= 1 ? "auto" : "0px"
  );
  const bottom = useTransform(scrollYProgress, (pos) => 
    pos >= 1 ? "0px" : "auto"
  );

  return (
    <section 
      ref={containerRef} 
      className="relative h-[300vh] bg-white w-full"
    >
      {/* This motion.div replaces the 'sticky' behavior. 
        It locks to the screen (fixed) while you scroll the 300vh.
      */}
      <motion.div
        style={{
          position,
          top,
          bottom,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <motion.div
          style={{
            width,
            height,
            borderRadius: rounded,
          }}
          className="relative overflow-hidden shadow-2xl"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="/videos/videoo.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function HomeVideoSection() {
  return SCROLL_ZOOM_ENABLED ? <FixedVideoExpand /> : <StillVideo />;
}