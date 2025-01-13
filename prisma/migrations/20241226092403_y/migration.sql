/*
  Warnings:

  - Made the column `username` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Admin_username_key";

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "username" SET NOT NULL;
