-- AlterTable
ALTER TABLE "client_users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CREATOR',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';
