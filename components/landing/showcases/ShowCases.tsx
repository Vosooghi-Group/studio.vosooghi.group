import { client } from "@/sanity/lib/client";
import Image from "next/image";
import showcasesTitle from "@/assets/showcases/showcases-title.png";
import { ShowcaseCard } from "./ShowcaseCard";
import { ShowcaseType } from "@/utils/types";

async function getShowcases() {
  const query = `*[_type == "showcase"] | order(publishedAt desc) {
       _id,
       title,
       description,
       slug,
       publishedAt,
       images
     }`;
  const data = await client.fetch(query);
  return data;
}

export const ShowCases = async () => {
  const showcases: ShowcaseType[] = await getShowcases();
  console.log(showcases);

  return (
    <div className="w-full h-full ">
      <div className="flex items-center justify-center mx-auto w-full">
        <div className="w-full h-full flex flex-col items-center gap-[80px]">
          <div className="flex items-center justify-center flex-col gap-4">
            <Image
              src={showcasesTitle}
              alt="VosooghiStudio"
              width={200}
              priority
              height={200}
            />
            <p className=" text-neutral-300 text-sm  font-medium">
              همه نمونه کارهای ما رو میتونید از گالریمون ببینید!
            </p>
          </div>
          <div className="w-full flex items-center justify-center flex-col lg:grid lg:grid-cols-2 gap-2 lg:max-w-[1100px]">
            {showcases.map((showcase: ShowcaseType) => (
              <ShowcaseCard Showcase={showcase} key={showcase._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
