import React from "react";
import Link from "next/link";
import Logo from "@/assets/vosooghi-group-logo-without-bg.png";
import Image from "next/image";

const SanityNavigation = () => {
  return (
    <div className=" flex items-center justify-between px-5 py-3 lg:py-5 lg:px-10q ">
      <Image alt="VA" width={50} height={50} src={Logo} className="w-[35px]" />
      <Link href="/" className=" text-blue-500">
        return home
      </Link>
    </div>
  );
};

export default SanityNavigation;
