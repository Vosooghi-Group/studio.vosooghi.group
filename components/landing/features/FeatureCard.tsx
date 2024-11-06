import React from "react";
import CardLayout from "@/assets/features/services-card-elemnt.png";
import CardLayout2 from "@/assets/features/services-card-elemant-2-3.png";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  icon?: string | StaticImageData;
}
export const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  title,
  description,
  icon,
}) => {
  return (
    <div className="w-[350px] relative flex items-center justify-center">
      {id === "2" || id === "3" ? (
        <Image
          src={CardLayout2}
          width={350}
          height={80}
          className={`w-full h-full z-0`}
          alt="VosooghiStudio"
          priority
        />
      ) : (
        <Image
          src={CardLayout}
          width={350}
          height={80}
          className={`w-full h-full z-0`}
          alt="VosooghiStudio"
          priority
        />
      )}
      <div className="flex flex-col items-center justify-center w-full space-y-3 absolute z-20 ">
        {icon && (
          <Image
            src={icon}
            alt="VosooghiStudio"
            width={200}
            height={200}
            className="w-[70px] h-[70px] z-20"
            priority
          />
        )}
        <h1 className="text-white text-xl font-bold">{title}</h1>
        <p className="text-neutral-300 text-sm max-w-[80%] mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};
