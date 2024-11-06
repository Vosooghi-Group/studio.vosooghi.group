import About from "@/components/landing/about/About";
import { Blogs } from "@/components/landing/Blogs/Blogs";
import HeroSection from "@/components/landing/hero/Hero";
import { Services } from "@/components/landing/services/Services";
import { ShowCases } from "@/components/landing/showcases/ShowCases";
import { client } from "@/sanity/lib/client";
import { BlogType } from "@/utils/types";
export const revalidate = 60;
async function getBlogs() {
  const query = `*[_type == "blog"] {
  title,
  slug,
  publishedAt,
  author,
  image,
  excerpt,
}`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const blogs: BlogType[] = await getBlogs();
  console.log(blogs);
  return (
    <div className="w-full h-full flex flex-col gap-[150px] pb-[200px] ">
      <div className="">
        <HeroSection />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="showcases">
        <ShowCases />
      </div>
      <div id="blogs">
        <Blogs />
      </div>
    </div>
  );
}
