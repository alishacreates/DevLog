"use client";

import { motion } from "motion/react";

type ScrollRevealProps = {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
};

export function ScrollReveal({
  children,
  direction = "left",
  delay = 0,
}: ScrollRevealProps) {
  const x = direction === "left" ? -40 : 40;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}