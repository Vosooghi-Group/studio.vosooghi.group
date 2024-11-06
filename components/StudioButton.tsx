import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface StudioButtonProps {
  classname?: string;
  text?: string;
  href?: string;
}
export const StudioButton: React.FC<StudioButtonProps> = ({
  classname,
  text,
  href,
}) => {
  return (
    <Button className={`${classname} relative z-10`}>
      {href ? (
        <Link href={href}>
          <span className=" w-[15px] h-[15px] bg-[#121413] absolute top-[-8px] left-[-8px] rotate-45 z-0"></span>
          <span className="z-10">{text}</span>
          <span className=" w-[15px] h-[15px] bg-[#121413] absolute bottom-[-8px] right-[-8px] rotate-45 z-0"></span>
        </Link>
      ) : (
        <div className="">
          <span className=" w-[15px] h-[15px] bg-[#121413]  absolute top-[-8px] left-[-8px] rotate-45 z-0"></span>
          <span className="z-10">{text}</span>
          <span className=" w-[15px] h-[15px] bg-[#121413] absolute bottom-[-8px] right-[-8px] rotate-45 z-0"></span>
        </div>
      )}
    </Button>
  );
};
