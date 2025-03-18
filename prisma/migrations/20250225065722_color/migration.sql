/*
  Warnings:

  - Added the required column `color` to the `COLOR_MODEL` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "COLOR_MODEL" ADD COLUMN     "color" TEXT NOT NULL;
