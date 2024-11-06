import React from "react";
import { FeatureCard } from "./FeatureCard";
import FeatureIconOne from "@/assets/features/features-icon-1.png";
import FeatureIconTwo from "@/assets/features/features-icon-2.png";
import FeatureIconThree from "@/assets/features/features-icon-3.png";
import FeatureIconFour from "@/assets/features/features-icon-4.png";
import StarLine from "@/assets/features/planets-line.png";
import Image from "next/image";
import FetaturesTitle from "@/assets/features/features-title.png";
import CenterLogo from "@/assets/features/center-logo.png";
import { StaticImageData } from "next/image";

interface featuresList {
  id: string;
  icon: string | StaticImageData;
  title: string;
  description: string;
}
const featuresList: featuresList[] = [
  {
    id: "1",
    icon: FeatureIconOne,
    title: "حرفه ای و تخصصی",
    description: "طراحی تخصصی و حرفه ای برند شما",
  },
  {
    id: "2",
    icon: FeatureIconTwo,
    title: "مقرون به صرفه",
    description: "پایین ترین هزینه با بهترین کیفیت",
  },
  {
    id: "3",
    icon: FeatureIconThree,
    title: "پشتیبانی ۲۴ ساعته ",
    description: "پشتیبانی قوی و پاسخگو در همه ساعات روز",
  },
  {
    id: "4",
    icon: FeatureIconFour,
    title: "تضمین امنیت",
    description: "تضمین امنیت درگاه های پرداخت و محصولات شما",
  },
];

const Features: React.FC = () => {
  return (
    <div className="w-full mx-auto relative flex flex-col gap-[70px]">
      <div className="flex flex-col items-center gap-4 ">
        <Image
          src={FetaturesTitle}
          alt="vosooghi studio"
          width={700}
          height={700}
          className="w-[250px]"
        />
        <p className=" text-neutral-300 text-sm text-center max-w-[85%] leading-6  font-medium">
          چرا باید استودیوی تخصصی ما رو واسه ارتقای کسب و کارتون انتخاب کنین ؟
        </p>
      </div>
      <div className="max-w-full lg:max-w-[70%] mx-auto z-20">
        <div className="w-full h-full relative mx-auto">
          <Image
            src={StarLine}
            alt="vosooghi studio"
            width={700}
            height={400}
            className="items-center hidden lg:flex justify-center absolute top-10 w-full"
          />
        </div>
        <div className="flex flex-wrap gap-7 max-w-[1000px] items-center justify-center relative">
          <Image
            src={CenterLogo}
            alt="vosooghi studio"
            width={170}
            height={170}
            className=" absolute w-[60px] h-[35px] hidden lg:block"
          />
          {featuresList.map((feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              icon={feature.icon}
              description={feature.description}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
