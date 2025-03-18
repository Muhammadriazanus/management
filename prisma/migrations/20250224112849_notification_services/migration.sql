-- CreateTable
CREATE TABLE "NOTIFICATION_SERVICES" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "recipient_type" TEXT NOT NULL,
    "template_id" INTEGER NOT NULL,
    "placeholders" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "template_content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NOTIFICATION_SERVICES_pkey" PRIMARY KEY ("id")
);
