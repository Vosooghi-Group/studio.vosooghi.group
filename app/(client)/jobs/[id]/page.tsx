"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import UploadFile from "@/components/UploadFile";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {User , Job} from '@prisma/client'


export interface JobDetails {
  title : string ;
  description : string;
  isAvailable : boolean
  id: string;
  userId: string;
  jobId: string;
  age: number;
  gender: string;
  showcases: string[];  // Array of strings for showcases
  user: User;           // User relation
  job: Job;             // Job relation
}
const formSchema = z.object({
  age: z.preprocess((value) => parseInt(value as string, 10), z.number()),
  gender: z.enum(["male", "female"], { message: "Gender is required" }),
  showcases: z.array(z.string()).min(1, { message: "At least one showcase is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      gender: "male",
      showcases: [],
    },
  });

  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/jobs/${params.id}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [params.id]);

  const handleUpload = (url: string) => {
    const currentShowcases = form.getValues("showcases") || [];
    form.setValue("showcases", [...currentShowcases, url]);
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      userId: session?.user.id,
      jobId: params.id,
    };

    try {
      await axios.post(`/api/resume`, payload);
      alert("Resume submitted successfully!");
      router.push("/jobs");
    } catch (error) {
      console.error("Error submitting resume:", error);
    }
  };

  if (!jobDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Job Details</h1>
      <div>
        <h2>{jobDetails?.title}</h2>
        <p>{jobDetails?.description}</p>
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              jobDetails.isAvailable ? "bg-green-600" : "bg-red-600"
            }`}
          ></span>
          {jobDetails.isAvailable ? "Active" : "Closed"}
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 flex flex-col">
          <label>Age</label>
          <Input type="number" {...form.register("age", { required: true })} />
        </div>
        
        <div className="space-y-2 flex flex-col">
          <label>Gender</label>
          <select {...form.register("gender", { required: true })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <Controller
          control={form.control}
          name="showcases"
          render={() => (
            <UploadFile
              accessKeyId="a5mvnqqf2neld1v6"
              secretAccessKey="c0119601-71ed-4e86-936c-8a4be80d8e40"
              endpoint="https://storage.iran.liara.space"
              bucket="digital"
              onUpload={handleUpload}
            />
          )}
        />

        <Button type="submit">Submit Resume</Button>
      </form>
    </div>
  );
}
