-- CreateTable
CREATE TABLE "Champion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "baseHealth" INTEGER NOT NULL,
    "baseMana" INTEGER NOT NULL,
    "healthRegen" DOUBLE PRECISION NOT NULL,
    "manaRegen" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);
