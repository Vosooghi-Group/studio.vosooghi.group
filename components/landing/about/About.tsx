import React from "react";
import Image from "next/image";
import AboutTitle from "@/assets/about/about-title.png";
import CardLayoutRight from "@/assets/about/card-layout-right.png";
import CardLayoutLeft from "@/assets/about/card-layout-left.png";
import CenterFlag from "@/assets/about/center-flag.png";
import { StudioButton } from "@/components/StudioButton";

const About = () => {
  return (
    <div className="w-full flex flex-col gap-[160px] lg:gap-10 items-center mx-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={AboutTitle}
          alt="vosooghi studio"
          width={700}
          height={700}
          className="w-[200px]"
        />
        <p className=" text-neutral-300 text-sm  font-medium">
          استودیوی وثوقی با خدمات مختلف در خدمت شماست!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row relative items-center justify-center gap-10 lg:gap-[120px]">
        <div className=" relative flex flex-col  items-center ">
          <div className="flex flex-col">
            <Image
              src={CardLayoutRight}
              alt="Vosooghi Studio"
              width={500}
              height={500}
              className="w-[360px] h-[190px] lg:h-[230px] lg:w-[500px]"
            />
            <div className="flex flex-col gap-3 absolute p-5 lg:p-8">
              <h1 className="text-lg font-bold"> استودیو وثوقی</h1>
              <p className="text-xs leading-6 lg:leading-7 lg:text-sm">
                ما در استودیو وثوقی با ارائه خدمات حرفه‌ای دیجیتال مارکتینگ و
                برندینگ، به کسب‌وکارها کمک می‌کنیم تا جایگاه خود را در دنیای
                دیجیتال پیدا کنند. با طراحی استراتژی‌های نوآورانه و منحصر به
                فرد، همراه شما در مسیر موفقیت برندتان خواهیم بود.
              </p>
            </div>
          </div>
          <div className="flex  items-center justify-end gap-2 w-full mt-6">
            <StudioButton text="تماس باما" classname="" />
            <StudioButton
              text="درخواست پروژه"
              classname=" bg-neutral-300 hover:bg-neutral-400"
              href="https://www.instagram.com/vosooghi.studio/"
            />
          </div>
        </div>
        <div className=" absolute top-[-230px] z-20 lg:top-[-55px]">
          <Image
            src={CenterFlag}
            alt="VosooghiStudio"
            width={570}
            height={570}
            className="w-[350px] h-[350px]"
          />
        </div>
        <div className=" relative flex flex-col  items-center ">
          <div className="flex flex-col">
            <Image
              src={CardLayoutLeft}
              alt="Vosooghi Studio"
              width={500}
              height={500}
              className="w-[360px] h-[190px] lg:h-[230px] lg:w-[500px]"
            />
            <div className="flex flex-col gap-3 absolute p-5 lg:p-8">
              <h1 className="text-lg font-bold">Vosooghi Studio</h1>
              <p className="text-xs leading-6 lg:leading-7 lg:text-sm">
                At Vosoughi Studio, we help businesses find their place in the
                digital world by providing professional digital marketing and
                branding services. By designing innovative and unique
                strategies, we will accompany you on the path to your brand's
                success.
              </p>
            </div>
          </div>
          <div className="flex  items-center justify-start gap-2 w-full mt-6">
            <StudioButton text="Contact us" classname="" />
            <StudioButton
              text="Project"
              classname=" bg-neutral-300 hover:bg-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
