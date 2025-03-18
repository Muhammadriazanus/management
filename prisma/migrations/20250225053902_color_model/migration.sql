-- CreateTable
CREATE TABLE "COLOR_MODEL" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "primary" TEXT NOT NULL,
    "secondary" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "surface" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "border" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "COLOR_MODEL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "COLOR_MODEL_tenant_id_key" ON "COLOR_MODEL"("tenant_id");
