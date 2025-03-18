/*
  Warnings:

  - You are about to drop the `configuration` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color_theme` to the `MDS_TENANT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_url` to the `MDS_TENANT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value_text` to the `MDS_TENANT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MDS_TENANT" ADD COLUMN     "color_theme" "ColorTheme" NOT NULL,
ADD COLUMN     "img_url" TEXT NOT NULL,
ADD COLUMN     "value_text" TEXT NOT NULL;

-- DropTable
DROP TABLE "configuration";
