"use client";

import React, { useRef, useState } from "react";
import { S3 } from "aws-sdk";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuUpload } from "react-icons/lu";

interface UploadFileProps {
  accessKeyId: string;
  secretAccessKey: string;
  endpoint: string;
  bucket: string;
  onUpload: (url: string) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  accessKeyId,
  secretAccessKey,
  endpoint,
  bucket,
  onUpload,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<{
    [key: string]: boolean;
  }>({});
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Keep old files
      setError(null);
      await handleUpload(selectedFiles);
    }
  };

  const handleUpload = async (selectedFiles: File[]) => {
    const uploadFileStatuses = { ...uploadingFiles };
    selectedFiles.forEach((file) => {
      uploadFileStatuses[file.name] = true;
    });
    setUploadingFiles(uploadFileStatuses);

    try {
      if (selectedFiles.length === 0) {
        setError("Please select at least one file");
        return;
      }

      const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
        s3ForcePathStyle: true,
        signatureVersion: "v4",
      });

      const uploadPromises = selectedFiles.map(async (file) => {
        const params = {
          Bucket: bucket,
          Key: file.name,
          Body: file,
        };

        const response = await s3.upload(params).promise();
        return { name: file.name, url: response.Location };
      });

      const uploaded = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...uploaded]);

      uploaded.forEach(({ name, url }) => {
        onUpload(url);
        setUploadingFiles((prev) => ({
          ...prev,
          [name]: false,
        }));
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Error uploading files: " + error.message);
      } else {
        setError("Error uploading files: Unknown error");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const truncateFileName = (fileName: string) => {
    return fileName.length > 17 ? fileName.substring(0, 17) + "..." : fileName;
  };

  return (
    <div className="space-y-4">
      <h2>Upload Showcases</h2>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
      />
      <Button
        onClick={triggerFileInput}
        variant="outline"
        className="w-full border-dashed dark:text-neutral-300 text-neutral-700 py-10 hover:bg-transparent"
      >
        <LuUpload className="w-5 h-5" />
      </Button>
      <div className="mt-4">
        {files.map((file, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="bg-neutral-200 dark:bg-neutral-700/60 border-[0.5px] border-neutral-300 dark:border-neutral-700 rounded-md px-3 py-2 w-full overflow-x-auto mt-4 flex items-center gap-3">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{truncateFileName(file.name)}</span>
                </div>
                <div className="">
                  {uploadingFiles[file.name] ? (
                    <FaSpinner className="animate-spin ml-2" />
                  ) : (
                    <div className="flex items-center gap-2">
                      {uploadedFiles.find(
                        (uploaded) => uploaded.name === file.name
                      ) && (
                        <Link
                          href={
                            uploadedFiles.find(
                              (uploaded) => uploaded.name === file.name
                            )?.url || "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 "
                        >
                          <MdOutlineRemoveRedEye className="w-5 h-5" />
                        </Link>
                      )}
                      {!uploadingFiles[file.name] &&
                        uploadedFiles.find(
                          (uploaded) => uploaded.name === file.name
                        ) && <FaCheckCircle className="text-green-500 ml-2" />}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UploadFile;
