-- CreateTable
CREATE TABLE "REGISTOR_SCHOOL" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "REGISTOR_SCHOOL_pkey" PRIMARY KEY ("id")
);
