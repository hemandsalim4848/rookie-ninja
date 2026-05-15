"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FixedVideoExpand() {
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