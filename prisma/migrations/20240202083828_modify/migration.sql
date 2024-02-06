/*
  Warnings:

  - You are about to drop the column `createAt` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Article` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" RENAME COLUMN "createAt" TO "createdAt";
ALTER TABLE "Article" RENAME COLUMN "updateAt" TO "updatedAt";
