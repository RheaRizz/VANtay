-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "ticket_id" SERIAL NOT NULL,
    "passenger_name" TEXT NOT NULL,
    "passenger_classification" TEXT NOT NULL,
    "passenger_address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "phone_number" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "seat_number" INTEGER NOT NULL,
    "fare" DOUBLE PRECISION NOT NULL,
    "van_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateTable
CREATE TABLE "Van" (
    "van_id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "plate_no" TEXT NOT NULL,
    "standby_time" TIMESTAMP(3) NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "driver_name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "date_of_trip" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Van_pkey" PRIMARY KEY ("van_id")
);

-- CreateTable
CREATE TABLE "_UserToVan" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToVan_AB_unique" ON "_UserToVan"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToVan_B_index" ON "_UserToVan"("B");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_van_id_fkey" FOREIGN KEY ("van_id") REFERENCES "Van"("van_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVan" ADD CONSTRAINT "_UserToVan_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToVan" ADD CONSTRAINT "_UserToVan_B_fkey" FOREIGN KEY ("B") REFERENCES "Van"("van_id") ON DELETE CASCADE ON UPDATE CASCADE;
