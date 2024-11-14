import RightHero from "@/assets/hero/hero-right.png";
import RightLeft from "@/assets/hero/hero-left.png";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  weight: ["400", "700"], // Choose weights you need (e.g., 400 for regular, 700 for bold)
  subsets: ["latin"], // Choose subsets you need
  display: "swap", // Optional: improves loading behavior
});

const HeroSection = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col lg:flex-row w-full max-w-[95%] lg:max-w-[95%] mx-auto">
        <div className="relative w-full bg-black lg:rounded-br-3xl">
          <Image
            src={RightHero}
            alt=""
            width={500}
            height={500}
            priority
            className="w-full object-cover h-[300px] lg:h-[450px] 2xl:h-[530px] lg:rounded-br-3xl"
          />
          <div className="flex items-start justify-normal flex-col gap-3 absolute bottom-10 right-10 lg:bottom-[60px] lg:right-[60px]">
            <h1
              className={`${montserrat.className} text-xl lg:text-4xl tracking-wider text-white font-bold`}
            >
              MARKETING
            </h1>
            <p className="text-md lg:text-xl text-neutral-300">
              خدمات مارکتینگ
            </p>
            <Button variant="secondary" className="lg:text-lg px-6 py-4">
              <Link href="/#contact">ثبت درخواست</Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full">
          <Image
            src={RightLeft}
            alt=""
            width={500}
            height={500}
            priority
            className="w-full object-cover h-[300px] lg:h-[450px] 2xl:h-[530px] rounded-b-3xl lg:rounded-bl-3xl"
          />
          <div className="flex items-end justify-end flex-col gap-3 absolute bottom-10 left-10 lg:bottom-[60px] lg:left-[60px]">
            <h1
              className={`${montserrat.className} text-xl lg:text-4xl tracking-wider text-white font-bold`}
            >
              BRANDING
            </h1>
            <p className="text-md lg:text-xl text-neutral-300">خدمات برندینگ</p>
            <Button variant="secondary" className="lg:text-lg px-6 py-4">
              <Link href="/#contact">ثبت درخواست</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
