-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "durationSeconds" INTEGER,
ADD COLUMN     "isFirstAttempt" BOOLEAN NOT NULL DEFAULT false;
