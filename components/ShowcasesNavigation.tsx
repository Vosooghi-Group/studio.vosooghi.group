import Image from "next/image";
import React from "react";
import Logo from "@/assets/vs-nav.png";
import { RainbowButton } from "./magicui/RainbowButton";
import { FaInstagram } from "react-icons/fa6";
import Link from "next/link";

const ShowcasesNavigation = () => {
  return (
    <div className="z-50 fixed top-0 w-full flex items-center justify-center left-0 right-0 h-[70px] bg-neutral-900/70 backdrop-blur-lg border-b-[1px] border-neutral-800/70 ">
      <div className="w-full flex items-center justify-between py-2 px-6 max-w-[1660px] mx-auto">
        <Image src={Logo} alt="VosooghiStudio" width={30} height={30} />
        <Link href='https://www.instagram.com/vosooghi.studio/' target="_blank" className="">
          <RainbowButton className="flex items-center justify-center gap-2">
            <FaInstagram />
            <span>vosooghi.studio</span>
          </RainbowButton>
        </Link>
      </div>
    </div>
  );
};

export default ShowcasesNavigation;
