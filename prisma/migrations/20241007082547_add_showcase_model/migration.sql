/*
  Warnings:

  - You are about to drop the column `showcases` on the `Resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "showcases";

-- CreateTable
CREATE TABLE "Showcase" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Showcase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Showcase" ADD CONSTRAINT "Showcase_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
