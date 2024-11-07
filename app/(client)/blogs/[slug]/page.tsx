import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BlogType } from "@/utils/types";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import { BlogCard } from "@/components/blogs/BlogCard";
import jalaali from "jalaali-js";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Params {
  params: {
    slug: string;
  };
}
interface SanityImage {
  asset: {
    _ref: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlog(params?.slug);
  const imageUrl = urlFor(blog?.image).url();

  return {
    title: `Vosooghi Studio | ${blog?.title}` || "Vosooghi Studio",
    description: `Read about ${blog?.title}`,

    openGraph: {
      title: `Vosooghi Studio | ${blog?.title}` || "Vosooghi Studio",
      description: `Read about ${blog?.title}`,
      url: `https://Studio.vosooghi.group/blogs/${params?.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog?.title || "Blog Post Image",
        },
      ],
      type: "article",
    },
  };
}

export const revalidate = 60;

async function getBlog(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == "${slug}"][0] {
      title,
      slug,
      publishedAt,
      author->{
        name,
        image
      },
       categories[]->{
      _id,
      name
    },
      excerpt,
      image,
      _id,
      body
    }
  `;
  const blog = await client.fetch(query);
  return blog;
}
async function getSimilarBlogs(slug: string) {
  const query = `
    *[_type == "blog" && slug.current != "${slug}"] | order(publishedAt desc) [0...4] {
      title,
      slug,
      publishedAt,
      author->{
        name
      },
        categories[]->{
      _id,
      name
    },
      image,
      excerpt
    }
  `;
  const blogs = await client.fetch(query);
  return blogs;
}

const SingleBlogPage = async ({ params }: Params) => {
  const blog: BlogType = await getBlog(params?.slug);
  const similarBlogs = await getSimilarBlogs(params?.slug);
  if (!blog) {
    notFound();
  }
  const convertToJalaali = (date: string) => {
    const { jy, jm, jd } = jalaali.toJalaali(new Date(date));
    return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
  };
  const publishedAtPersian = convertToJalaali(blog.publishedAt);
  return (
    <div className=" max-w-[1500px] 2xl:max-w-[1600px] m-auto ">
      <div className="w-full min-h-screen p-6 sm:p-8 lg:p-10 flex flex-col  gap-10  text-justify ">
        <div className=" mt-10 text-justify max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <div className="pb-3  mb-3 ">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="lg:text-lg">
                        خانه
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className=" rotate-180 lg:mx-1 text-lg" />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/#blogs" className="lg:text-lg">
                        مقالات
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className=" rotate-180 lg:mx-1" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="lg:text-lg">
                        {blog.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex flex-col gap-5">
                <h1 className=" text-2xl lg:text-4xl dark:text-white font-bold flex items-center gap-2.5">
                  <span className="w-[5px] h-[35px] mb-[-6px] bg-[#01C466] rounded-lg"></span>
                  {blog?.title}
                </h1>
                <div className="flex items-center flex-wrap gap-3 lg:gap-5 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <HiMiniPencilSquare
                        size={15}
                        className="text-neutral-200"
                      />
                      <span className="text-md lg:text-lg text-neutral-200">
                        نویسنده :
                      </span>
                    </div>
                    <h1 className=" text-neutral-200">{blog?.author?.name}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt
                        size={15}
                        className="text-neutral-200"
                      />
                      <span className="text-md lg:text-lg text-neutral-200">
                        تاریخ :
                      </span>
                    </div>
                    <span className="">{publishedAtPersian}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <FaHashtag className="text-neutral-200" />
                      <span className="text-md lg:text-lg text-neutral-200">
                        هشتگ ها :
                      </span>
                    </div>
                    <div className="flex items-center justify-start max-w-[200px] overflow-x-auto gap-1">
                      {blog.categories?.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Image
                src={urlFor(blog.image).url()}
                alt=""
                width={300}
                height={300}
                priority
                className="w-full max-h-[200px] md:max-h-[350px] object-cover rounded-lg mb-3"
              />
            </div>
            <div className={richTextStyles}>
              <PortableText
                components={myPortableTextComponent}
                value={blog?.body}
              />
            </div>
          </div>
          <div className="mt-[70px]">
            <h2 className="text-xl lg:text-2xl  lg:text-start font-bold mb-8">
              مطالب مرتبط
            </h2>
            <div className="flex items-center justify-center flex-wrap gap-6">
              {similarBlogs.map((similarBlog: BlogType) => (
                <BlogCard blog={similarBlog} key={similarBlog._id} />
              ))}
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="mt-10 "></div>
    </div>
  );
};

export default SingleBlogPage;

const myPortableTextComponent = {
  types: {
    image: ({ value }: { value: SanityImage }) => (
      <Image
        src={urlFor(value).url()}
        alt=""
        width={700}
        height={700}
        className="rounded-lg w-full lg:max-h-[600px] object-cover shadow-lg"
      />
    ),
  },
};

const richTextStyles = `
 
  prose
  // prose-blue
  dark:prose-invert
  prose-li:marker:text-primary
  prose-a:text-blue-500
  prose prose-lg
  prose-h1:mb-4
  prose-h2:mb-4
  prose-h3:mb-4
  prose-h1:font-bold 
  prose-h2:text-2xl 
  prose-h2:font-bold 
  prose-h3:text-xl 
  prose-h4:text-xl 
  prose-h3:font-bold 
  prose-h4:font-bold 
  prose-h4:mb-10
  prose-heading:my-5 
  prose-p:mb-2 
  prose-p:leading-8
  prose-p:text-[17px]
  lg:prose-p:leading-9
  prose-li:list-disc 
  prose-li:text-[17px] 
  prose-li:text-neutral-300 
  prose-li:leading-7 
  lg:prose-li:ml-4 
  prose-li:ml-2
  prose-li:text-lg /* Increase size of list items */
  prose-li:font-medium /* Medium weight for list items */
  prose-blockquote:pl-4 /* Add padding for blockquotes */
  prose-blockquote:border-blue-500 /* Border color for blockquotes */
  prose-blockquote:text-gray-600 /* Text color for blockquotes */
`;
