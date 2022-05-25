/*
  Warnings:

  - You are about to drop the column `updatededAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" 
RENAME COLUMN "updatededAt" TO "updatedAt";
ALTER TABLE "users"
ADD COLUMN "deleted" BOOLEAN NOT NULL DEFAULT false;
