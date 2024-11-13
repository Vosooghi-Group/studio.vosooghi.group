import React from "react";
import { client } from "@/sanity/lib/client";
import { BlogType } from "@/utils/types";
import { BlogCard } from "@/components/blogs/BlogCard";
import Image from "next/image";
import BlogTitle from "@/assets/hero/blogs/blog-title.png";
import { StudioButton } from "@/components/StudioButton";
import Link from "next/link";

export const revalidate = 60;
async function getBlogs() {
  const query = `*[_type == "blog"] {
    title,
    slug,
    publishedAt,
    author,
    image,
    excerpt,
    categories[]->{
      _id,
      name
    }
  }`;
  const data = await client.fetch(query);
  return data;
}

export const Blogs = async () => {
  const blogs: BlogType[] = await getBlogs();
  console.log(blogs);
  return (
    <div className="flex flex-col gap-10 ">
      <div className="flex items-center flex-col gap-[60px] p-5 w-full">
        <div className="flex flex-col items-center justify-center gap-5 max-w-[600px] px-4 w-full">
          <Image
            src={BlogTitle}
            alt=""
            width={70}
            height={70}
            className="w-[70px] lg:w-[130px]"
          />
          <p className="lg:max-w-[85%] text-neutral-400 leading-6 lg:leading-7 text-center text-sm lg:text-md">
            مقالات و مطالب تخصصی در زمینه‌های مارکتینگ، برندسازی و رشد کسب‌وکار
            را پیدا کنید. ما با ارائه نکات و راهکارهای روز دنیا به شما کمک
            می‌کنیم تا دانش خود را گسترش داده و استراتژی‌های مؤثری برای موفقیت
            کسب‌وکارتان ایجاد کنید.
          </p>
          <StudioButton
            text="مشاهده همه"
            href="/blogs"
            classname="bg-neutral-800 text-white w-[120px]"
          />
        </div>
        <div className="flex  gap-7 justify-cetner overflow-x-auto overflow-y-hidden w-full">
          <div className="flex items-center justify-start w-full gap-6 md:gap-8">
            {blogs?.map((blog, idx) => <BlogCard blog={blog} key={idx} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
