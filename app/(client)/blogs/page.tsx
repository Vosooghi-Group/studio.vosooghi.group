import React from "react";
import { client } from "@/sanity/lib/client";
import { BlogType } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import jalaali from "jalaali-js";
import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

async function getBlogs() {
  const query = `*[_type == "blog"] {
    title,
    slug,
    publishedAt,
    excerpt,
    categories[]->{
      name
    },
    image
  }`;
  const data: BlogType[] = await client.fetch(query);
  return data;
}

const convertToJalaali = (date: string) => {
  const { jy, jm, jd } = jalaali.toJalaali(new Date(date));
  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
};

const BlogsPage = async () => {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen p-5 space-y-7">
      {blogs.map((blog, idx) => {
        const publishedAtPersian = convertToJalaali(blog.publishedAt);

        return (
          <Link href={`/blogs/${blog.slug.current}`} key={blog.slug.current} className="block">
            <div
              className={`bg-transparent border-none rounded-2xl overflow-hidden shadow-lg ${
                idx === 0 ? "flex flex-row max-h-[250px] w-full" : "flex flex-col min-w-[350px] md:min-w-[450px] max-h-[450px]"
              }`}
            >
              <Image
                 src={urlFor(blog.image).url()}
                alt={blog.title}
                width={idx === 0 ? 250 : 500}
                height={idx === 0 ? 250 : 450}
                className={`object-cover shadow-lg ${idx === 0 ? "rounded-l-2xl" : "rounded-t-2xl"}`}
              />
              <div className="flex flex-col justify-between w-full p-4 gap-5">
                <div className="flex flex-col gap-4">
                  <h1 className="text-md lg:text-lg font-bold">{blog.title}</h1>
                  <p className="text-xs lg:text-sm text-neutral-400 leading-6 max-w-[400px]">
                    {blog.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center max-w-[200px] overflow-x-auto gap-1">
                    {blog.categories.map((category, index) => (
                      <Badge key={index} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-neutral-300 mt-[2px]" size={12} />
                    <span className="text-ms lg:text-sm">{publishedAtPersian}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogsPage;