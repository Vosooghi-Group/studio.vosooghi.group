"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaTrash } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im"; // Import spinner
import { FiEye } from "react-icons/fi";
import CreateJob from "./CreateJob";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Showcase {
  id: string; // Unique identifier for the showcase
  title: string; // Title of the showcase
  description: string; // Description of the showcase
  url: string; // URL of the image or media associated with the showcase
  createdAt: Date; // Timestamp of when the showcase was created
}

interface Resume {
  id: number;
  user: string; // Adjust based on the actual structure
  age: number;
  gender: string;
  showcases: Showcase[]; // Change this to an array of Showcase objects
}

interface Job {
  id: number;
  title: string;
  description: string;
  requiredSkills: string[];
  resumes: Resume[]; // Add resumes array
}

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/admin/jobs");
        const data = await response?.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchJobs();
  }, []);

  const handleUpdate = async () => {
    if (!selectedJob) return;

    const response = await fetch(`/api/admin/jobs/${selectedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedJob.id,
        title: selectedJob.title,
        description: selectedJob.description,
      }),
    });

    if (response.ok) {
      const updatedJobs = await fetch("/api/admin/jobs");
      const data = await updatedJobs.json();
      setJobs(data);
      setOpenDialog(false);
    } else {
      const errorData = await response.json();
      console.error(errorData);
    }
  };

  const handleDelete = async (jobId: number) => {
    const response = await fetch(`/api/admin/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: jobId }),
    });

    if (response.ok) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    } else {
      const errorData = await response.json();
      console.error(errorData);
    }
  };

  return (
    <div className="flex flex-col gap-7 h-full overflow-y-auto max-w-[80%] sm:mx-auto lg:max-w-full">
      {loading ? ( // Show loading spinner while fetching jobs
        <div className="w-full h-screen flex items-center justify-center">
          <ImSpinner8 className="animate-spin text-4xl" />
        </div>
      ) : (
        <>
          <div className="w-full flex items-center justify-between">
            <h1>Jobs</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add Job</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Job</DialogTitle>
                </DialogHeader>
                <div className="px-4">
                  <CreateJob />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableCaption>List of available jobs and resumes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Required Skills</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>{job.requiredSkills.join(", ")}</TableCell>
                  <TableCell className="flex items-center gap-1 lg:gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedJob(job);
                        setOpenDialog(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(job.id)}
                    >
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {jobs.map((job) => (
            <div key={job.id} className="mb-4">
              <h2 className="font-bold">{job.title} Resumes</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Showcases</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {job.resumes.length > 0 ? (
                    job.resumes.map((resume) => (
                      <TableRow key={resume.id}>
                        <TableCell>{resume.user}</TableCell>
                        <TableCell>{resume.age}</TableCell>
                        <TableCell>{resume.gender}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="icon" variant="outline">
                                <FiEye />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[450px]">
                              <Carousel className="w-full max-w-xs" dir="ltr">
                                <CarouselContent>
                                  {resume.showcases?.map(
                                    (showcase: Showcase) => (
                                      <CarouselItem key={showcase.id}>
                                        <div className="p-1">
                                          <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                              <Image
                                                src={showcase.url}
                                                alt={showcase.title} // Use showcase title for better accessibility
                                                layout="fill" // Fill the parent container
                                                objectFit="cover" // Cover the area with the image
                                                className="rounded-lg" // Optional: add rounded corners
                                              />
                                            </CardContent>
                                          </Card>
                                        </div>
                                      </CarouselItem>
                                    )
                                  )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                              </Carousel>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>No resumes available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ))}

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Job</DialogTitle>
              </DialogHeader>
              {selectedJob && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={selectedJob.title}
                      onChange={(e) =>
                        setSelectedJob({
                          ...selectedJob,
                          title: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={selectedJob.description}
                      onChange={(e) =>
                        setSelectedJob({
                          ...selectedJob,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
