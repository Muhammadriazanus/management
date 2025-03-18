/*
  Warnings:

  - Added the required column `color_theme` to the `configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `configuration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ColorTheme" AS ENUM ('LIGHT', 'DARK', 'BLUE', 'GREEN', 'RED', 'GRAY', 'YELLOW', 'ORANGE', 'WHITE');

-- AlterTable
ALTER TABLE "configuration" ADD COLUMN     "color_theme" "ColorTheme" NOT NULL,
ADD COLUMN     "img_url" TEXT NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;
