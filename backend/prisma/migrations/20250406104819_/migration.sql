/*
  Warnings:

  - You are about to drop the column `clientId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clientId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clientId";
