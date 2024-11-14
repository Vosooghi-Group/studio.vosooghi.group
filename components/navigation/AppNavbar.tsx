"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import TopLogo from "@/assets/t-h-logo.png";
import { CgMenuRight } from "react-icons/cg";
import PulsatingButton from "@/components/magicui/pulsating-button";
import Index from "./menu";
import { BiSupport } from "react-icons/bi";

const adminLinks: string[] = [
  "/admin",
  "/admin/overview",
  "/admin/jobs",
  "/admin/notifications",
  "/admin/showcases",
  "/admin/blogs",
];

const AppNavbar = () => {
  const pathname = usePathname();
  const isHiddenRoute = adminLinks.includes(pathname);
  if (isHiddenRoute) {
    return null;
  }

  return (
    <div className={`w-full py-5 h-auto border-b-[1px] border-neutral-800/80`}>
      <div className="flex items-center justify-center gap-4 w-full ">
        <span className="w-[30%] lg:w-[42%] bg-gradient-to-tr from-neutral-900/10 to-neutral-700/50 h-[1.2px] lg:h-[1.5px]"></span>

        <div className="w-[40%] lg:w-[15%] pt-2 pb-4 lg:pb-5">
          <Image
            alt="vosooghi-studio"
            src={TopLogo}
            width={500}
            height={300}
            priority
            className="mx-auto w-[150px] lg:w-[170px]"
          />
        </div>
        <span className="w-[30%] lg:w-[42%] bg-gradient-to-tl from-neutral-900/10 to-neutral-700/50 h-[1.2px] lg:h-[1.5px]"></span>
      </div>
      <div className="w-full hidden lg:flex  items-center justify-between px-5 lg:px-10 max-w-[1400px] mx-auto">
        <Button size="icon" variant="secondary" className="lg:hidden">
          <CgMenuRight size={15} />
        </Button>
        <nav className="items-center gap-7 hidden lg:flex">
          <Link href="/" className="font-semibold text-md">
            صفحه اصلی
          </Link>
          <Link href="/#services" className="text-md text-neutral-300">
            خدمات
          </Link>
          <Link href="/#showcases" className="text-md text-neutral-300">
            نمونه کارها
          </Link>
          <Link href="/#blogs" className="text-md text-neutral-300">
            وبلاگ
          </Link>
          <Link href="/#contact" className="text-md text-neutral-300">
            تماس باما
          </Link>
          <Link href="/#about" className="text-md text-neutral-300">
            درباره ما
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <PulsatingButton className="h-[40px]">
            <Link href="https://t.me/vosooghi_studio" target="_blank">
              <div className="w-full flex items-center gap-2">
                <span className="">مشاوره رایگان</span>
                <BiSupport size={17} />
              </div>
            </Link>
          </PulsatingButton>
        </div>
      </div>
      <div className=" flex items-center  justify-between lg:hidden   rounded-full  px-5 h-[50px] z-50">
        <div className=" flex items-center relative justify-between w-full h-full">
          <div className=" absolute left-[10px]">
            <PulsatingButton className="h-[40px]">
              <Link href="https://t.me/vosooghi_studio" target="_blank">
                <div className="w-full flex items-center gap-2">
                  <span className="">مشاوره رایگان</span>
                  <BiSupport size={17} />
                </div>
              </Link>
            </PulsatingButton>
          </div>
          <Index />
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
