/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId,clientId]` on the table `UserGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserGroup_userId_groupId_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "clientId" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserGroup" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_userId_groupId_clientId_key" ON "UserGroup"("userId", "groupId", "clientId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
