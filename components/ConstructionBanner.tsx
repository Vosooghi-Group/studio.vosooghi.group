"use client";
// import { useEffect, useState } from "react";
import React from "react";
import FlickeringGrid from "@/components/magicui/flickering-grid";
import logo from "@/assets/vs-nav.png";
import Image from "next/image";
import FlipText from "@/components/magicui/flip-text";
// import { useTheme } from "next-themes";

export const ConstructionBanner = () => {
  // const { theme } = useTheme();
  // const [color, setColor] = useState("#ffffff");

  // useEffect(() => {
  //   setColor(theme === "dark" ? "#ffffff" : "#000000");
  // }, [theme]);
  return (
    <div
      dir="ltr"
      className="w-full h-full px-2  py-10 flex items-center justify-center mt-[40px] 2xl:mt-[70px]"
    >
      <div className="relative flex h-[600px] py-[70px] w-[800px] flex-col items-center justify-center overflow-hidden rounded-lg  bg-background md:shadow-xl px-2">
        <div className=" flex flex-col items-center justify-center h-full  mx-auto z-40">
          <Image
            src={logo}
            alt="VA"
            width={50}
            height={50}
            priority
            className="mb-4 lg:mb-6 w-[50px] lg:w-[65px]"
          />
          <FlipText
            className="font-display  text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
            word="Welcome to"
          />
          <div className="flex items-center gap-3 lg:gap-4">
            <FlipText
              className="font-display text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
              word="Vosooghi Studio"
            />
           
          </div>
          <p className="text-md lg:text-xl text-neutral-400 mt-5 text-center max-w-[90%]">
            We are updating the website It may take hours to complete ...
          </p>
        </div>
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={3}
          gridGap={8}
          color="#6B7280"
          maxOpacity={0.6}
          flickerChance={0.1}
          height={800}
          width={800}
        />
      </div>
    </div>
  );
};
