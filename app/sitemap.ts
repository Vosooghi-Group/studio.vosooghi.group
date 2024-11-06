import { client } from "@/sanity/lib/client";
import { MetadataRoute } from "next";
import { BlogType, ShowcaseType } from "@/utils/types";

async function getShowcases() {
  const query = `*[_type == "showcase"] | order(publishedAt desc) {
       _id,
       title,
       slug,
       publishedAt,
       images
     }`;
  const data = await client.fetch(query);
  return data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getBlogs() {
    const query = `*[_type == "blog"] {
           title,
           slug,
           publishedAt,
           author->{
             name,
             image
           },
           excerpt,
           image,
           _id,
           body
        }`;
    const data = await client.fetch(query);
    return data;
  }

  const blogs: BlogType[] = await getBlogs();
  const showcases: ShowcaseType[] = await getShowcases();

  const blogUrls = blogs.map((blog) => ({
    url: `https://studio.vosooghi.group/blogs/${blog?.slug?.current}`,
    lastModified: new Date(blog?.publishedAt),
  }));

  const showcaseUrls = showcases.map((showcase) => ({
    url: `https://studio.vosooghi.group/showcases/${showcase?.slug?.current}`,
    lastModified: new Date(showcase?.publishedAt),
  }));

  return [
    {
      url: `https://studio.vosooghi.group/`,
      lastModified: new Date(),
    },
    {
      url: "https://studio.vosooghi.group/blogs",
      lastModified: new Date(),
    },
    {
      url: "https://studio.vosooghi.group/showcases",
      lastModified: new Date(),
    },
    ...blogUrls,
    ...showcaseUrls,
  ];
}