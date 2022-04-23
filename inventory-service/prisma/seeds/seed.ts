import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.stock.createMany({
    data: [
      {
        itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
        quantity: 1250,
      },
      {
        itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
        quantity: 257,
      },
      {
        itemId: '17c2ed57-4d74-45c3-b317-8cad88655379',
        quantity: 2254,
      },
      {
        itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
        quantity: 759,
      },
      {
        itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
        quantity: 876,
      },
      {
        itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
        quantity: 907,
      },
      {
        itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
        quantity: 989,
      },
      {
        itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
        quantity: 349,
      },

      {
        itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
        quantity: 896,
      },
      {
        itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
        quantity: 745,
      },
      {
        itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
        quantity: 289,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
