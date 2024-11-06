import React from "react";
import Image from "next/image";
import Image1 from "@/assets/services/1.png";
import Image2 from "@/assets/services/2.png";
import Image3 from "@/assets/services/3.png";
import Image4 from "@/assets/services/4.png";
import Image5 from "@/assets/services/5.png";
import SectionTitle from "@/assets/services/services-title.png";
import { ServiceCard } from "./ServiceCard";

export const Services = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-[70px] items-center justify-center mx-auto">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={SectionTitle}
            alt=""
            width={200}
            height={140}
            className="w-[240px]"
          />
          <p className="max-w-[85%] md:max-w-[550px] text-center text-neutral-400 text-xs leading-[20px] md:text-[15px] md:leading-7">
            در این بخش، خدمات متنوع استودیو وثوق در حوزه مارکتینگ و برندسازی را
            مشاهده کنید و راهکارهایی برای تقویت هویت و رشد کسب‌وکار خود بیابید.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-5 lg:gap-8">
          <ServiceCard image={Image1} name="برندینگ" englishName="BRANDING" />
          <ServiceCard
            image={Image2}
            name="هویت بصری"
            englishName="VISUAL IDENTITY"
          />
          <div className=" hidden sm:block">
            <ServiceCard
              image={Image3}
              name="مارکتینگ"
              englishName="MARKETING"
            />
          </div>
          <ServiceCard
            image={Image4}
            name="طراحی سایت"
            englishName="WEB DEVELOP"
          />
          <ServiceCard image={Image5} name="سعو" englishName="SEO" />
        </div>
      </div>
    </div>
  );
};
