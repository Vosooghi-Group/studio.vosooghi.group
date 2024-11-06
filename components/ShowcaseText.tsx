"use client";
import { motion } from "framer-motion";


import React from "react";

export interface ShowcaseTextProps {
  children: React.ReactNode;
  delay : number
}
const ShowcaseText: React.FC<ShowcaseTextProps> = ({ children , delay}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
     {children}
    </motion.div>
  );
};

export default ShowcaseText;
