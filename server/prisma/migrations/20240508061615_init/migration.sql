/*
  Warnings:

  - You are about to drop the column `date_of_trip` on the `Van` table. All the data in the column will be lost.
  - You are about to drop the column `departure_time` on the `Van` table. All the data in the column will be lost.
  - You are about to drop the column `driver_name` on the `Van` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Van` table. All the data in the column will be lost.
  - You are about to drop the column `standby_time` on the `Van` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Van` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Van" DROP COLUMN "date_of_trip",
DROP COLUMN "departure_time",
DROP COLUMN "driver_name",
DROP COLUMN "number",
DROP COLUMN "standby_time",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Trip" (
    "trip_id" SERIAL NOT NULL,
    "van_id" INTEGER NOT NULL,
    "standby_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "driver_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_van_id_fkey" FOREIGN KEY ("van_id") REFERENCES "Van"("van_id") ON DELETE RESTRICT ON UPDATE CASCADE;
