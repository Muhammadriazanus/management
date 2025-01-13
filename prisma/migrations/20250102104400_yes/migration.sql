/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_teacherId_fkey";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "Roles" (
    "id" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "studentId" TEXT,
    "teacherId" TEXT,
    "adminId" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
