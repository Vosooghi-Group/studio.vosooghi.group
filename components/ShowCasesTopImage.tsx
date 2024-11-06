"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import React from "react";

export interface ImageProps {
  src: string;
  classname: string;
}
const ShowCasesTopImage: React.FC<ImageProps> = ({ src }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Image
        src={src}
        alt=""
        width={1000}
        height={700}
        priority
        className="w-full h-[500px] sm:h-[750px] rounded-[40px] drop-shadow-lg object-cover"
      />
    </motion.div>
  );
};

export default ShowCasesTopImage;
