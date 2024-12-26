/*
  Warnings:

  - You are about to drop the column `numeroTelepehone` on the `Candidat` table. All the data in the column will be lost.
  - Added the required column `numeroTelephone` to the `Candidat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidat" DROP COLUMN "numeroTelepehone",
ADD COLUMN     "numeroTelephone" TEXT NOT NULL;
