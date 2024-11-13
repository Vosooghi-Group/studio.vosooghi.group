import React from "react";
import { Card } from "../ui/card";
import { BlogType } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { FaCalendarAlt } from "react-icons/fa";
import jalaali from "jalaali-js";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  blog: BlogType;
}
export const BlogCard = ({ blog }: BlogCardProps) => {
  const convertToJalaali = (date: string) => {
    const { jy, jm, jd } = jalaali.toJalaali(new Date(date));
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  };
  const publishedAtPersian = convertToJalaali(blog.publishedAt);

  return (
    <Card className="  bg-transparent border-none p-0 min-w-[280px] md:min-w-[450px] max-h-[450px]  rounded-t-2xl rounded-b-none relative">
      <Link href={`/blogs/${blog.slug.current}`}>
        <div className="  flex flex-col w-full h-full ">
          <Image
            src={urlFor(blog.image).url()}
            alt=""
            width={500}
            priority
            height={450}
            className="object-cover  min-h-[220px] min-w-[280px] shadow-lg rounded-2xl"
          />
          <div className="flex flex-col justify-between w-full h-full  gap-5 pt-3 pb-6 mt-4 px-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-md lg:text-lg font-bold">{blog.title}</h1>
              {/* <p className="text-xs lg:text-sm text-neutral-400 leading-6 max-w-[400px]">
                {blog.excerpt}
              </p> */}
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start max-w-[140px] md:max-w-[200px] overflow-x-auto gap-1">
                {blog.categories?.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category.name}
                  </Badge>
                ))}
              </div>
              <div className="flex items-cetner   gap-1.5">
                <FaCalendarAlt
                  className="text-neutral-300 mt-[2px]"
                  size={12}
                />
                <span className="text-ms lg:text-sm">{publishedAtPersian}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
