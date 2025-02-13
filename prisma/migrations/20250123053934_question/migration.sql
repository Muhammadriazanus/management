/*
  Warnings:

  - You are about to drop the column `Question` on the `AskedMe` table. All the data in the column will be lost.
  - Added the required column `question` to the `AskedMe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AskedMe" DROP COLUMN "Question",
ADD COLUMN     "question" TEXT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;
