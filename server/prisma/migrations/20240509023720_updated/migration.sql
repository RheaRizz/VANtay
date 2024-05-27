/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `phone_number` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seat_number` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `van_id` on the `Ticket` table. All the data in the column will be lost.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `trip_id` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `van_id` on the `Trip` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `Van` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `van_id` on the `Van` table. All the data in the column will be lost.
  - You are about to drop the `_UserToVan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `passenger_phone_no` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_no` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vanId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vanId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Van` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CASHIER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_van_id_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_van_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVan" DROP CONSTRAINT "_UserToVan_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToVan" DROP CONSTRAINT "_UserToVan_B_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_pkey",
DROP COLUMN "phone_number",
DROP COLUMN "seat_number",
DROP COLUMN "ticket_id",
DROP COLUMN "user_id",
DROP COLUMN "van_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "passenger_phone_no" TEXT NOT NULL,
ADD COLUMN     "seat_no" INTEGER NOT NULL,
ADD COLUMN     "tripId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "vanId" INTEGER NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
DROP COLUMN "trip_id",
DROP COLUMN "van_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "vanId" INTEGER NOT NULL,
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Van" DROP CONSTRAINT "Van_pkey",
DROP COLUMN "van_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Van_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_UserToVan";

-- AddForeignKey
ALTER TABLE "Van" ADD CONSTRAINT "Van_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "Van"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_vanId_fkey" FOREIGN KEY ("vanId") REFERENCES "Van"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
