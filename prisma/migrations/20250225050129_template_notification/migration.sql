-- CreateTable
CREATE TABLE "TEMPLATE_NOTIFICATION" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "placeholders" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "updated_on" TIMESTAMP(3) NOT NULL,
    "updated_by" INTEGER,
    "deleted_on" TIMESTAMP(3),
    "deleted_by" INTEGER,

    CONSTRAINT "TEMPLATE_NOTIFICATION_pkey" PRIMARY KEY ("id")
);
