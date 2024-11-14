import React from "react";
import Image from "next/image";
import TopLogo from "@/assets/t-h-logo.png";
import GradientGreenDot from "@/assets/gradient-green-dot.png";
import { FaPhone } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import Enamad from "@/assets/e-namad.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoLogoLinkedin } from "react-icons/io";

export const Footer = () => {
  return (
    <div id="contact" className="w-full h-full ">
      <div className="flex flex-col gap-4 w-full lg:h-[570px] px-5">
        <div className="flex items-center justify-center gap-4 w-full">
          <span className="w-[30%] lg:w-[42%] bg-gradient-to-tr from-neutral-900/10 to-neutral-700/50 h-[1.2px] lg:h-[1.5px]"></span>

          <div className="w-[40%] lg:w-[15%] pt-2 pb-7 lg:pb-5">
            <Image
              alt="vosooghi-studio"
              src={TopLogo}
              width={500}
              height={300}
              className="  mx-auto w-[150px] lg:w-[170px]"
            />
          </div>
          <span className="w-[30%] lg:w-[42%]  bg-gradient-to-tl from-neutral-900/10 to-neutral-700/50 h-[1.2px] lg:h-[1.5px]"></span>
        </div>
        <div className="flex flex-col w-full h-full lg:flex-row gap-5 xl:p-10">
          <div className="flex flex-col gap-8 w-full lg:w-1/3">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-1">
                <Image
                  src={GradientGreenDot}
                  alt="VosooghiStudio"
                  width={100}
                  height={100}
                  className="w-[20px] h-[20px]"
                />
                <h1 className="text-lg font-bold">دسترسی سریع </h1>
              </div>
              <div className=" grid grid-cols-3 gap-3">
                <Link
                  href="/"
                  className=" h-[40px] flex items-center justify-center rounded-lg lg:text-sm text-xs bg-neutral-800"
                >
                  صفحه اصلی
                </Link>
                <Link
                  href="/#services"
                  className=" h-[40px] flex items-center justify-center rounded-lg lg:text-sm text-xs bg-neutral-800"
                >
                  خدمات
                </Link>
                <Link
                  href="/#showcases"
                  className=" h-[40px] flex items-center justify-center rounded-lg lg:text-sm text-xs bg-neutral-800"
                >
                  نمونه کارها
                </Link>
                <Link
                  href="/#blogs"
                  className=" h-[40px] flex items-center justify-center rounded-lg lg:text-sm text-xs bg-neutral-800"
                >
                  وبلاگ
                </Link>
                <Link
                  href="/#contact"
                  className=" h-[40px] flex items-center justify-center rounded-lg lg:text-sm text-xs bg-neutral-800"
                >
                  تماس باما
                </Link>
                <Link
                  href="/#about"
                  className=" h-[40px] flex items-center justify-center rounded-lg lg:text-sm text-xs bg-neutral-800"
                >
                  درباره ما
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-1">
                <Image
                  src={GradientGreenDot}
                  alt="VosooghiStudio"
                  width={100}
                  height={100}
                  className="w-[20px] h-[20px]"
                />
                <h1 className="text-lg font-bold">اطلاعات تماس</h1>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-[#01C466]" />
                  <span>0992-666-7069</span>
                </div>
                <div className="flex items-center gap-3">
                  <BiLogoTelegram className="text-[#01C466]" />
                  <Link target="_blank" href="https://t.me/vosooghi_studio">
                    vosooghi_studio@
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <CgMail className="text-[#01C466]" />
                  <span>info@vosooghi.group</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full justify-between gap-8 w-full lg:w-1/3 lg:border-x-[0.8px] border-neutral-700/60 px-6">
            <p className="text-xs lg:text-sm max-w-full lg:max-w-[400px]  leading-6 lg:leading-8 tracking-wider lg:mt-10">
              ما در استودیو وثوقی با ارائه خدمات حرفه‌ای دیجیتال مارکتینگ و
              برندینگ، به کسب‌وکارها کمک می‌کنیم تا جایگاه خود را در دنیای
              دیجیتال پیدا کنند. با طراحی استراتژی‌های نوآورانه و منحصر به فرد،
              همراه شما در مسیر موفقیت برندتان خواهیم بود.
            </p>
            <div className="flex items-center justify-center gap-5">
              <Link
                target="_blank"
                href="https://www.linkedin.com/company/vosooghi-studio/"
              >
                <IoLogoLinkedin size={20} className="text-neutral-400" />
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/vosooghi.studio/"
              >
                <FaInstagram size={20} className="text-neutral-400" />
              </Link>
              <Link
                target="_blank"
                href="https://t.me/vosooghi_studio"
                className="flex flex-col gap-2 items-center justify-start mb-[-32px] "
              >
                <BiLogoTelegram size={20} className="text-white" />
                <span className="w-[3.5px] h-[25px] rounded-lg bg-[#01C466]"></span>
              </Link>
              <Link href="/" target="_blank">
                <FaWhatsapp size={20} className="text-neutral-400" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-8 w-full lg:w-1/3">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-1">
                <Image
                  src={GradientGreenDot}
                  alt="VosooghiStudio"
                  width={100}
                  height={100}
                  className="w-[20px] h-[20px]"
                />
                <h1 className="text-lg font-bold">مجوز ها </h1>
              </div>
              <div className=" grid grid-cols-2 gap-4 w-full">
                <div className="w-full bg-neutral-800 rounded-lg flex items-center justify-center">
                  <Image
                    src={Enamad}
                    alt="VosooghiStudio"
                    width={100}
                    height={100}
                    className="w-[60px]"
                  />
                </div>
                <div className="w-full h-[80px] bg-neutral-800 rounded-lg flex items-center justify-center"></div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-1">
                <Image
                  src={GradientGreenDot}
                  alt="VosooghiStudio"
                  width={100}
                  height={100}
                  className="w-[20px] h-[20px]"
                />
                <h1 className="text-lg font-bold">خبرنامه </h1>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  disabled
                  className="bg-neutral-800/70"
                  placeholder="ایمیل خود را وارد کنید"
                />
                <Button disabled className="text-white">
                  ثبت
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className=" border-t-[0.8px] border-neutral-800 mt-5 mb-5 pt-5">
          <p className="text-neutral-400 text-center text-xs lg:text-sm">
            کلیه حقوق این وبسایت متعلق به استودیو وثوقی می باشد.
          </p>
        </div>
      </div>
    </div>
  );
};
