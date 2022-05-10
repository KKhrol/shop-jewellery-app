/*
  Warnings:

  - You are about to drop the column `summary` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `item_in_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `item_in_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metalImage` to the `item_in_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `item_in_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_in_order" DROP CONSTRAINT "item_in_order_itemId_fkey";

-- AlterTable
ALTER TABLE "item_in_order" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "metalImage" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "summary",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- DropTable
DROP TABLE "items";
