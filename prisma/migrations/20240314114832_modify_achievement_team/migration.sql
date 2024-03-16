/*
  Warnings:

  - You are about to drop the column `teamId` on the `Achievement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_teamId_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_AchievementToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToTeam_AB_unique" ON "_AchievementToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToTeam_B_index" ON "_AchievementToTeam"("B");

-- AddForeignKey
ALTER TABLE "_AchievementToTeam" ADD CONSTRAINT "_AchievementToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToTeam" ADD CONSTRAINT "_AchievementToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
