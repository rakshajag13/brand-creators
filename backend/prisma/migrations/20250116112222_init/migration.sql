/*
  Warnings:

  - You are about to drop the column `employeeCount` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "employeeCount";

-- CreateTable
CREATE TABLE "ClientDomain" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "ClientDomain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientDomain_domain_key" ON "ClientDomain"("domain");

-- AddForeignKey
ALTER TABLE "ClientDomain" ADD CONSTRAINT "ClientDomain_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
