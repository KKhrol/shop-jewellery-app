/*
  Warnings:

  - You are about to drop the column `updatededAt` on the `collections` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collections"
RENAME COLUMN "updatededAt" TO "updatedAt";
