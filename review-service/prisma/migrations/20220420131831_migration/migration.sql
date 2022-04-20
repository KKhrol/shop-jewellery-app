-- CreateTable
CREATE TABLE "reviews" (
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "mark" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("userId","itemId")
);
