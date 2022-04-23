import * as faker from 'faker';
import { PrismaClient, Role } from '@prisma/client';

const data = Array.from({ length: 12 }).map(() => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}));
const adminData = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  userRole: Role.ADMIN,
};

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data });
  await prisma.user.create({ data: adminData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
