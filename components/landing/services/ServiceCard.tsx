import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { StaticImageData } from "next/image";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export interface ServiceCardProps {
  name: string;
  englishName: string;
  image: string | StaticImageData;
}
export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  englishName,
  image,
}) => {
  return (
    <div className=" relative flex items-center justify-center ">
      <Image
        src={image}
        alt=""
        width={200}
        height={300}
        className="sm:w-[219px] w-[170px] h-[250px] sm:h-[310px]"
      />
      <div className="flex flex-col gap-1 sm:gap-2 items-center justify-center absolute bottom-[25px] sm:bottom-[40px]">
        <h1
          className={`${montserrat.className} text-md lg:text-lg font-bold text-white`}
        >
          {englishName}
        </h1>
        <p className="text-xs lg:text-md text-neutral-300">{name}</p>
      </div>
    </div>
  );
};
