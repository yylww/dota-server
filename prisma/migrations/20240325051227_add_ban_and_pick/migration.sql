/*
  Warnings:

  - You are about to drop the `_bans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_picks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_bans" DROP CONSTRAINT "_bans_A_fkey";

-- DropForeignKey
ALTER TABLE "_bans" DROP CONSTRAINT "_bans_B_fkey";

-- DropForeignKey
ALTER TABLE "_picks" DROP CONSTRAINT "_picks_A_fkey";

-- DropForeignKey
ALTER TABLE "_picks" DROP CONSTRAINT "_picks_B_fkey";

-- DropTable
DROP TABLE "_bans";

-- DropTable
DROP TABLE "_picks";

-- CreateTable
CREATE TABLE "Ban" (
    "id" SERIAL NOT NULL,
    "gameId" TEXT NOT NULL,
    "heroId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "radiant" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pick" (
    "id" SERIAL NOT NULL,
    "gameId" TEXT NOT NULL,
    "heroId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "radiant" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pick_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
