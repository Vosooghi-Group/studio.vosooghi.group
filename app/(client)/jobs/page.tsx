import { Card } from "@/components/ui/card";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaLaravel,
  FaWordpress,
  FaFigma,
  FaCss3Alt,
  FaHtml5,
  FaJsSquare,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiTypescript,
  SiExpress,
} from "react-icons/si";

export default async function JobsPage() {
  const jobs = await db.job.findMany({
    where: { isAvailable: true },
    select: { id: true, title: true, description: true, requiredSkills: true }, // Select fields to display
  });

  const skillIcons: { [key: string]: React.ReactNode } = {
    React: <FaReact color="#61DBFB" />,
    "Node.js": <FaNodeJs color="#3C873A" />,
    "Next.js": <SiNextdotjs />,
    "Nest.js": <SiNestjs color="#E0234E" />,
    PostgreSQL: <SiPostgresql color="#336791" />,
    MongoDB: <SiMongodb color="#47A248" />,
    HTML: <FaHtml5 color="#E34C26" />,
    CSS: <FaCss3Alt color="#264DE4" />,
    JavaScript: <FaJsSquare color="#F7DF1E" />,
    TypeScript: <SiTypescript color="#3178C6" />,
    Express: <SiExpress />,
    PHP: <FaPhp color="#777BB4" />,
    Laravel: <FaLaravel color="#FF2D20" />,
    WordPress: <FaWordpress color="#21759B" />,
    Figma: <FaFigma color="#A259FF" />,
  };
  return (
    <div className="container">
      <h1>Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {jobs.map((job) => (
          <Card key={job.id} className="p-5">
            <Link href={`/jobs/${job.id}`}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <div className="flex flex-wrap items-center mt-2">
                {job.requiredSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 p-2">
                    {skillIcons[skill] || <span>{skill}</span>}
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
