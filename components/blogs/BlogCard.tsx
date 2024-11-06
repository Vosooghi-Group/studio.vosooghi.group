import React from "react";
import { Card } from "../ui/card";
import { BlogType } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { FaCalendarAlt } from "react-icons/fa";
import jalaali from "jalaali-js";

interface BlogCardProps {
  blog: BlogType;
}
export const BlogCard = ({ blog }: BlogCardProps) => {
  const convertToJalaali = (date: string) => {
    const { jy, jm, jd } = jalaali.toJalaali(new Date(date));
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  };

  // Usage
  const publishedAtPersian = convertToJalaali(blog.publishedAt);
  return (
    <Card className="  bg-transparent border-none p-0 min-w-[350px] max-h-[450px]  rounded-t-2xl rounded-b-none relative">
      <Link href={`/blogs/${blog.slug.current}`}>
        <div className="  flex flex-col w-full h-full ">
          <Image
            src={urlFor(blog.image).url()}
            alt=""
            width={500}
            priority
            height={450}
            className="object-cover  min-h-[250px] min-w-[300px] shadow-lg rounded-2xl"
          />
          <div className="flex flex-col justify-between w-full h-full  gap-3 pt-3 pb-6 mt-4 px-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-md lg:text-lg font-bold">{blog.title}</h1>
              <p className="text-sm lg:text-md text-neutral-300 leading-6 max-w-[400px]">
                {blog.excerpt}
              </p>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-green-500" size={15} />
                <span>{publishedAtPersian}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
