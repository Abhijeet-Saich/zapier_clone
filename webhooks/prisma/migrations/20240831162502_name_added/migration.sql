/*
  Warnings:

  - Added the required column `name` to the `AvailableAction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "name" TEXT NOT NULL;
