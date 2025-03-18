/*
  Warnings:

  - You are about to drop the `FeeCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FeeStructure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentFee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FeeStructure" DROP CONSTRAINT "FeeStructure_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_studentFeeId_fkey";

-- DropForeignKey
ALTER TABLE "StudentFee" DROP CONSTRAINT "StudentFee_feeId_fkey";

-- DropForeignKey
ALTER TABLE "StudentFee" DROP CONSTRAINT "StudentFee_studentId_fkey";

-- DropTable
DROP TABLE "FeeCategory";

-- DropTable
DROP TABLE "FeeStructure";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "StudentFee";

-- CreateTable
CREATE TABLE "FEE_CATEGORY" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "FEE_CATEGORY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FEE_STRUCTURE" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "classes" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FEE_STRUCTURE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "STUDENT_FEE" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "feeId" INTEGER NOT NULL,
    "status" "FeeStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "STUDENT_FEE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PAYMENT" (
    "id" SERIAL NOT NULL,
    "studentFeeId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" "PaymentMethod" NOT NULL,

    CONSTRAINT "PAYMENT_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FEE_CATEGORY_name_key" ON "FEE_CATEGORY"("name");

-- AddForeignKey
ALTER TABLE "FEE_STRUCTURE" ADD CONSTRAINT "FEE_STRUCTURE_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FEE_CATEGORY"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STUDENT_FEE" ADD CONSTRAINT "STUDENT_FEE_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STUDENT_FEE" ADD CONSTRAINT "STUDENT_FEE_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "FEE_STRUCTURE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PAYMENT" ADD CONSTRAINT "PAYMENT_studentFeeId_fkey" FOREIGN KEY ("studentFeeId") REFERENCES "STUDENT_FEE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
