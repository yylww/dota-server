/*
  Warnings:

  - You are about to drop the column `online` on the `Stage` table. All the data in the column will be lost.
  - Added the required column `mode` to the `Stage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "online",
ADD COLUMN     "mode" INTEGER NOT NULL,
ALTER COLUMN "type" DROP NOT NULL;
