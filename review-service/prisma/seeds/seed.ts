import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.create({
    data: {
      id: '0819515d-9f0a-4462-8fe2-67c493465263',
      image: 'http://lorempixel.com/640/480',
      name: 'Miranda Bold Hoops',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 4.1,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 4.2,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.7,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 2.1,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.7,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 3.6,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 2.1,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 5.0,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '149b40b3-b3ad-4b6d-b667-718324c2990d',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Ring',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 2.9,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 3.97,
          },
          {
            userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
            mark: 4.15,
          },
          {
            userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
            mark: 4.24,
          },
          {
            userId: 'e8351360-26d3-4580-9197-69a952ceae86',
            mark: 4.56,
          },
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 3.3,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '17c2ed57-4d74-45c3-b317-8cad88655379',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Necklace',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 1.95,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 1.2,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 2.34,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 4.89,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '524e8b96-c55e-4dd6-9105-7515b4908625',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Necklace',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 3.95,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 3.78,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 2.67,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 2.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.34,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 4.99,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 3.45,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 2.12,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 4.45,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 1.25,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
      image: 'http://lorempixel.com/640/480',
      name: 'Miranda Pendant Necklace',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 3.99,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 3.88,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.67,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 1.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.34,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 2.99,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 4.45,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 3.12,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 2.45,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 2.25,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Ring',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 3.99,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 3.88,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.67,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 2.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.67,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 2.99,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 4.15,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 1.12,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 3.47,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 4.19,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
      image: 'http://lorempixel.com/640/480',
      name: 'Miranda Pendant Necklace',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 2.99,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 4.88,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.17,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 1.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.67,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 3.99,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 3.15,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 2.11,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 3.37,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 4.29,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Earrings',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 2.99,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 4.88,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.67,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 1.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.67,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 3.69,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 3.75,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 2.11,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 3.37,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 4.29,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: 'ace666b1-7536-48bf-817f-56d26e543b8b',
      image: 'http://lorempixel.com/640/480',
      name: 'Miranda Bold Hoops',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 4.99,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 4.88,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.67,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 2.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.67,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 3.59,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 3.15,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 2.81,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 4.37,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 4.29,
          },
          {
            userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
            mark: 4.37,
          },
          {
            userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
            mark: 4.29,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Necklace',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            mark: 4.99,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            mark: 4.88,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            mark: 3.67,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            mark: 2.98,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            mark: 4.67,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            mark: 3.59,
          },
        ],
      },
    },
  });
  await prisma.item.create({
    data: {
      id: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
      image: 'http://lorempixel.com/640/480',
      name: 'Amanda Lve Earrings',
      metalImage: 'http://lorempixel.com/640/480',
      rating: {
        create: [
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            mark: 3.15,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            mark: 2.81,
          },
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            mark: 4.37,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            mark: 4.29,
          },
          {
            userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
            mark: 4.37,
          },
          {
            userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
            mark: 4.29,
          },
        ],
      },
    },
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
