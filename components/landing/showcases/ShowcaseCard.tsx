import React from "react";
import { Card } from "@/components/ui/card";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import CardLayout from "@/assets/about/card-layout-left.png";
import { Button } from "@/components/ui/button";
import { ShowcaseType } from "@/utils/types";

interface ShowcaseCardProps {
  Showcase: ShowcaseType;
}
export const ShowcaseCard = ({ Showcase }: ShowcaseCardProps) => {
  return (
    <Card className="  bg-transparent border-none p-0 relative flex items-center justify-center h-[350px] lg:h-[520px] ">
      <Image
        src={CardLayout}
        alt="VosooghiStudio"
        priority
        width={1000}
        height={1000}
        className="lg:min-w-[500px] lg:h-[350px] w-[350px] h-[250px]"
      />
      <Link
        href={`/showcases/${Showcase.slug.current}`}
        className=" absolute flex items-center flex-col w-fll p-5 "
      >
        <div className="flex items-center gap-2 mt-[-75px] lg:mt-[-120px]">
          <Image
            src={urlFor(Showcase.images[0]).url()}
            alt=""
            width={600}
            priority
            height={450}
            className="lg:w-[250px] w-[200px] h-[250px] lg:h-[350px] object-cover rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <Image
              src={urlFor(Showcase.images[1]).url()}
              alt=""
              width={300}
              priority
              height={250}
              className="lg:w-[150px] w-[100px] h-[118px] lg:h-[170px] object-cover rounded-xl"
            />
            <Image
              src={urlFor(Showcase.images[2]).url()}
              alt=""
              width={300}
              priority
              height={250}
              className="lg:w-[150px] w-[100px] h-[118px] lg:h-[170px] object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="flex  items-start justify-between w-full px-5 gap-2 py-2 mt-1 lg:mt-4">
          <h1 className="text-lg lg:text-xl font-bold text-neutral-300">
            {Showcase.title}
          </h1>
          <Button className=" relative z-10 py-1">
            <div className="">
              <span className=" w-[15px] h-[15px] bg-[#1d1f1e]  absolute top-[-8px] left-[-8px] rotate-45 z-0"></span>
              <span className="z-10 font-bold">بیشتر ببینید</span>
              <span className=" w-[15px] h-[15px] bg-[#1d1f1e] absolute bottom-[-8px] right-[-8px] rotate-45 z-0"></span>
            </div>
          </Button>
        </div>
      </Link>
    </Card>
  );
};
