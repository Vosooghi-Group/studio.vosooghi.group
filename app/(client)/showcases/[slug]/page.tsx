import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import { ShowcaseType } from "@/utils/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import ShowCasesTopImage from "@/components/ShowCasesTopImage";
import ShowcaseText from "@/components/ShowcaseText";
import { Badge } from "@/components/ui/badge";
interface Params {
  params: {
    slug: string;
  };
}
interface Feature {
  name: string;
  icon: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const showcase = await getShowcase(params?.slug);

  if (!showcase) {
    return {
      title: "Vosooghi Studio | Showcase",
      description: "Explore our portfolio showcases.",
    };
  }

  const imageUrl = urlFor(showcase.images[0]).url();

  return {
    title: `Vosooghi Studio | ${showcase?.title}` || "Vosooghi Studio",
    description:
      showcase?.excerpt || showcase?.description || "Showcase description",
    openGraph: {
      title: `Vosooghi Studio | ${showcase?.title}` || "Vosooghi Studio",
      description: showcase?.excerpt || showcase?.description,
      url: `https://studio.vosooghi.group/showcases/${params?.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: showcase?.title || "Showcase Image",
        },
      ],
      type: "article",
    },
  };
}

export const revalidate = 60;

async function getShowcase(slug: string) {
  const query = `
  *[_type == "showcase" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    description,
    images,
    excerpt,
    features[] {
      name,
      icon
    },
    englishName,
    categories[]-> {
      name
    },
    instagram,
    website
  }
`;
  const showcase = await client.fetch(query);
  return showcase;
}
async function getRelatedShowcases(slug: string) {
  const query = `
    *[_type == "showcase" && slug.current != "${slug}"] | order(publishedAt desc) [0...4] {
      title,
      slug,
      publishedAt,
      images,
      excerpt
    }
  `;
  const showcases = await client.fetch(query);
  return showcases;
}

const SingleShowcasePage = async ({ params }: Params) => {
  const showcase = await getShowcase(params.slug);
  const relatedShowcases = await getRelatedShowcases(params.slug);
  if (!showcase) {
    notFound();
  }

  return (
    <div
      id="hello"
      className="w-full min-h-screen py-5 px-5 lg:px-10 max-w-[1660px] mx-auto"
    >
      <div className="w-full mb-[100px] flex flex-col gap-[50px] lg:gap-[100px] ">
        {/* <ShowcasesNavigation /> */}
        <div className="flex flex-col lg:flex-row items- justify-center gap-10 mt-[140px] lg:mt-[250px] w-full lg:w-[85%] mx-auto min-h-[300px] 2xl:min-h-[500px] max-w-[1200px]">
          <div className="w-full lg:w-1/2">
            <ShowcaseText delay={0.2}>
              <h1 className="text-3xl lg:text-6xl font-bold text-white">
                {showcase.title}
              </h1>
            </ShowcaseText>
          </div>
          <div className="flex flex-col gap-5 w-full lg:w-1/2">
            <div>
              <ShowcaseText delay={0.8}>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-2">
                    <Badge className="" variant="secondary">
                      طراحی سایت
                    </Badge>
                    <Badge className="" variant="secondary">
                      سعو
                    </Badge>
                    <Badge className="" variant="secondary">
                      مارکتینگ
                    </Badge>
                  </div>

                  <p className="text-[14px] lg:text-[17px] leading-7 lg:leading-8 text-neutral-300/80 sm:max-w-[85%] font-medium tracking-wider">
                    {showcase.description}
                  </p>
                </div>
              </ShowcaseText>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 ">
          <ShowCasesTopImage
            src={urlFor(showcase.images[0]).url()}
            classname=""
          />
        </div>

        <ShowcaseText delay={0.6}>
          <div className="flex flex-row items-center gap-x-8  w-full overflow-x-auto">
            <div>
              <Image
                src={urlFor(showcase.images[1]).url()}
                alt=""
                width={1000}
                height={700}
                priority
                className="rounded-[45px] min-w-[290px] h-[290px]  lg:min-w-[500px] lg:h-[500px] object-cover"
              />
            </div>
            <div>
              <Image
                src={urlFor(showcase.images[2]).url()}
                alt=""
                width={1000}
                height={700}
                priority
                className="rounded-[45px] min-w-[290px] h-[290px]  lg:min-w-[500px] lg:h-[500px] object-cover"
              />
            </div>
            <div>
              <Image
                src={urlFor(showcase.images[3]).url()}
                alt=""
                width={1000}
                height={700}
                priority
                className="rounded-[45px] min-w-[290px] h-[290px]  lg:min-w-[500px] lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </ShowcaseText>
        <div className="w-full lg:w-[85%] mx-auto my-[50px] lg:my-[100px]">
          <div className="flex items- flex-col gap-8 lg:flex-row justify-between">
            <ShowcaseText delay={0.1}>
              <h1 className="text-3xl lg:text-6xl font-bold text-white flex items-center gap-2">
                <span>درباره</span>
                {showcase.title}
              </h1>
            </ShowcaseText>
            <div className="flex flex-col gap-10 lg:max-w-[500px]">
              <ShowcaseText delay={0.6}>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 lg:gap-5">
                  {showcase?.features?.map(
                    (feature: Feature, index: number) => (
                      <div
                        className="flex items-start gap-3 lg:gap-4"
                        key={index}
                      >
                        <div className="text-md lg:text-lg">{feature.icon}</div>
                        <div className="text-md lg:text-lg text-neutral-300">
                          {feature.name}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </ShowcaseText>
              <ShowcaseText delay={0.7}>
                <div className="flex flex- gap-4">
                  <Link href={showcase.instagram} target="_blank">
                    <Button className="text-white flex items-center gap-2">
                      <FaInstagram />
                      <span>مشاهده در اینستاگرام</span>
                    </Button>
                  </Link>
                  <Link href={showcase.website} target="_blank">
                    <Button className="flex items-center gap-2 bg-neutral-900 text-white ">
                      <TbWorld />
                      <span>مشاهده وبسایت</span>
                    </Button>
                  </Link>
                </div>
              </ShowcaseText>
            </div>
          </div>
        </div>
        <div className="mt-[70px] w-full flex flex-col gap-7 lg:gap-10">
          <h1 className="text-xl lg:text-3xl font-bold text-white">
            پروژه های مشابه
          </h1>
          <div className="flex items-start justify-start w-full overflow-x-auto py-5 gap-6">
            {relatedShowcases &&
              relatedShowcases.map((relatedShowcase: ShowcaseType) => (
                <Link
                  href={`/showcases/${relatedShowcase.slug.current}`}
                  key={relatedShowcase._id}
                >
                  <Image
                    src={urlFor(relatedShowcase.images[0]).url()}
                    alt={relatedShowcase.title}
                    width={250}
                    height={150}
                    className="object-cover shadow-lg mb-2 min-w-[300px] lg:min-w-[500px] "
                  />
                  <div className="mt-3 flex flex-col gap-2">
                    <h1 className="text-sm lg:text-lg font-bold">
                      {relatedShowcase.title}
                    </h1>
                    <p className="text-xs lg:text-sm text-neutral-500">
                      {relatedShowcase.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        {/* <div className="w-full h-[400px] ">
          <ShowcasesFooter />
        </div> */}
      </div>
    </div>
  );
};

export default SingleShowcasePage;
