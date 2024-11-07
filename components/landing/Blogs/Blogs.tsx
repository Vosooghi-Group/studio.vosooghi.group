import React from "react";
import { client } from "@/sanity/lib/client";
import { BlogType } from "@/utils/types";
import { BlogCard } from "@/components/blogs/BlogCard";
import Image from "next/image";
import BlogTitle from "@/assets/hero/blogs/blog-title.png";
import { StudioButton } from "@/components/StudioButton";

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
      <div className="flex items-center flex-col gap-[60px] lg:gap-5 lg:flex-row p-5 w-full">
        <div className="flex flex-col gap-5 max-w-[600px] px-4 w-full">
          <Image
            src={BlogTitle}
            alt=""
            width={70}
            height={70}
            className="w-[130px] lg:w-[200px]"
          />
          <p className="lg:max-w-[85%] text-neutral-400 leading-6 lg:leading-7 text-sm lg:text-md">
            مقالات و مطالب تخصصی در زمینه‌های مارکتینگ، برندسازی و رشد کسب‌وکار
            را پیدا کنید. ما با ارائه نکات و راهکارهای روز دنیا به شما کمک
            می‌کنیم تا دانش خود را گسترش داده و استراتژی‌های مؤثری برای موفقیت
            کسب‌وکارتان ایجاد کنید.
          </p>
          <StudioButton
            text="مشاهده همه"
            classname="bg-neutral-800 text-white w-[120px]"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center w-full overflow-x-auto overflow-y-hidden  lg:gap-[100px] xl:gap-10 gap-8">
          {blogs &&
            blogs?.map((blog, idx) => <BlogCard blog={blog} key={idx} />)}
        </div>
      </div>
    </div>
  );
};
