-- AlterTable
ALTER TABLE "jewelleries" ALTER COLUMN "description" SET DEFAULT E'No description provided';

-- AlterTable
ALTER TABLE "metals" ALTER COLUMN "care" SET DEFAULT E'No care instructions provided',
ALTER COLUMN "image" SET DEFAULT E'No image provided';
