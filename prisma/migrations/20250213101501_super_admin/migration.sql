/*
  Warnings:

  - Added the required column `super_admin_id` to the `MDS_TENANT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MDS_TENANT" ADD COLUMN     "super_admin_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SUPER_ADMIN" (
    "id" SERIAL NOT NULL,
    "super_admin" BOOLEAN NOT NULL,

    CONSTRAINT "SUPER_ADMIN_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MDS_TENANT" ADD CONSTRAINT "MDS_TENANT_super_admin_id_fkey" FOREIGN KEY ("super_admin_id") REFERENCES "SUPER_ADMIN"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
