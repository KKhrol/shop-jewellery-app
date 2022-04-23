import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';

const data = Array.from({ length: 50 }).map(() => ({
  name: faker.name.title(),
  description: faker.lorem.sentences(),
  image: faker.image.imageUrl(),
}));

const prisma = new PrismaClient();

async function main() {
  await prisma.collection.createMany({ data });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
