import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.client.deleteMany();
  // await prisma.company.deleteMany();

  const companies = await prisma.company.createMany({
    data: [
      { name: 'Acme Inc', address: '123 Market St, NY' },
      { name: 'Globex Corp', address: '456 Ocean Ave, LA' },
    ],
  });

  const acme = await prisma.company.findFirst({ where: { name: 'Acme Inc' } });
  const globex = await prisma.company.findFirst({
    where: { name: 'Globex Corp' },
  });

  const clients = await prisma.client.createMany({
    data: [
      {
        email: 'jane.doe@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
        companyId: acme?.id!,
      },
      {
        email: 'john.smith@example.com',
        firstName: 'John',
        lastName: 'Smith',
        companyId: globex?.id!,
      },
    ],
  });

  const jane = await prisma.client.findUnique({
    where: { email: 'jane.doe@example.com' },
  });
  const john = await prisma.client.findUnique({
    where: { email: 'john.smith@example.com' },
  });

  console.log('✅ Seed completed with companies, clients');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
