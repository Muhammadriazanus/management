/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AskedMe` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `AskedMe` table. All the data in the column will be lost.
  - You are about to drop the column `searchText` on the `AskedMe` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `AskedMe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AskedMe` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `gradeId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `supervisorId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `assignmentId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `examId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `bloodtype` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gradeId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `bloodtype` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `tenant_id` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `AskedMe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `search_text` to the `AskedMe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `AskedMe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `AskedMe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `AskedMe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lesson_id` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_type` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blood_type` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_classId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_assignmentId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_examId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_classId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_parentId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "classId",
ADD COLUMN     "class_id" INTEGER,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AskedMe" DROP COLUMN "createdAt",
DROP COLUMN "endTime",
DROP COLUMN "searchText",
DROP COLUMN "startTime",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "search_text" TEXT NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "dueDate",
DROP COLUMN "lessonId",
DROP COLUMN "startDate",
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lesson_id" INTEGER NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "lessonId",
DROP COLUMN "studentId",
ADD COLUMN     "lesson_id" INTEGER NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "gradeId",
DROP COLUMN "supervisorId",
ADD COLUMN     "grade_id" INTEGER NOT NULL,
ADD COLUMN     "supervisor_id" TEXT,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "classId",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "class_id" INTEGER,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "endTime",
DROP COLUMN "lessonId",
DROP COLUMN "startTime",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lesson_id" INTEGER NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "classId",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "subjectId",
DROP COLUMN "teacherId",
ADD COLUMN     "class_id" INTEGER NOT NULL,
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "subject_id" INTEGER NOT NULL,
ADD COLUMN     "teacher_id" TEXT NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "assignmentId",
DROP COLUMN "examId",
DROP COLUMN "studentId",
ADD COLUMN     "assignment_id" INTEGER,
ADD COLUMN     "exam_id" INTEGER,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "bloodtype",
DROP COLUMN "classId",
DROP COLUMN "createdAt",
DROP COLUMN "gradeId",
DROP COLUMN "parentId",
ADD COLUMN     "blood_type" TEXT NOT NULL,
ADD COLUMN     "class_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "grade_id" INTEGER NOT NULL,
ADD COLUMN     "parent_id" TEXT NOT NULL,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "bloodtype",
DROP COLUMN "createdAt",
ADD COLUMN     "blood_type" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tenant_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
