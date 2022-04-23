-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "jewelleryId" TEXT NOT NULL,
    "metalId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "imageId" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "metals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "care" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "metals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jewelleries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "collectionId" TEXT,

    CONSTRAINT "jewelleries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_jewelleryId_metalId_key" ON "items"("jewelleryId", "metalId");

-- CreateIndex
CREATE UNIQUE INDEX "metals_name_key" ON "metals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "jewelleries_name_key" ON "jewelleries"("name");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_metalId_fkey" FOREIGN KEY ("metalId") REFERENCES "metals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_jewelleryId_fkey" FOREIGN KEY ("jewelleryId") REFERENCES "jewelleries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
