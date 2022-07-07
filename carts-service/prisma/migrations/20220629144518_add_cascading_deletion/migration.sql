-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_itemId_fkey";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
