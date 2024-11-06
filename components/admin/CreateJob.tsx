"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

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
import { AiFillCheckCircle } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  employmentType: z.string().nonempty("Employment type is required"),
  requiredSkills: z
    .array(z.string())
    .min(1, { message: "At least one skill must be selected" }),
});
type JobData = z.infer<typeof formSchema>;
export default function CreateJob() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      employmentType: "",
      requiredSkills: [] as string[],
    },
  });

  const selectedSkills = form.watch("requiredSkills", []);

  const skills = [
    { name: "React", icon: <FaReact color="#61DBFB" /> },
    { name: "Node.js", icon: <FaNodeJs color="#3C873A" /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "Nest.js", icon: <SiNestjs color="#E0234E" /> },
    { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> },
    { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    { name: "HTML", icon: <FaHtml5 color="#E34C26" /> },
    { name: "CSS", icon: <FaCss3Alt color="#264DE4" /> },
    { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" /> },
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "Express", icon: <SiExpress /> },
    { name: "PHP", icon: <FaPhp color="#777BB4" /> },
    { name: "Laravel", icon: <FaLaravel color="#FF2D20" /> },
    { name: "WordPress", icon: <FaWordpress color="#21759B" /> },
    { name: "Figma", icon: <FaFigma color="#A259FF" /> },
  ];

  const toggleSkillSelection = (skill: string) => {
    const currentSkills = form.getValues("requiredSkills") || [];
    if (currentSkills.includes(skill)) {
      form.setValue(
        "requiredSkills",
        currentSkills.filter((s) => s !== skill)
      );
    } else {
      form.setValue("requiredSkills", [...currentSkills, skill]);
    }
  };

  const onSubmit = async (data : JobData) => {
    try {
      await axios.post("/api/jobs", data);
      console.log("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="max-w-[500px]">
      <h1>Create New Job</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان</FormLabel>
                <FormControl>
                  <Input placeholder="برنامه نویس" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>توضیحات</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نوع همکاری</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع همکاری را انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">تمام وقت</SelectItem>
                      <SelectItem value="PART_TIME">پاره وقت</SelectItem>
                      <SelectItem value="CONTRACT">Contract</SelectItem>
                      <SelectItem value="FREELANCE">فریلنسری</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Required Skills</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto py-3">
              {skills.map((skill) => (
                <div

                  key={skill.name}
                  onClick={() => toggleSkillSelection(skill.name)}
                  className={`flex items-center gap-2 p-2 cursor-pointer border ${
                    selectedSkills.includes(skill.name)
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  <div className="text-2xl">{skill.icon}</div>
                  <span>{skill.name}</span>
                  {selectedSkills.includes(skill.name) && (
                    <AiFillCheckCircle color="green" />
                  )}
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
          <Button type="submit">Create Job</Button>
        </form>
      </Form>
    </div>
  );
}
