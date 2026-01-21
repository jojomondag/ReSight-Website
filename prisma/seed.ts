import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "josef.nobach@outlook.com";
const ADMIN_LICENSE_KEY = "ADMIN-PERMA-NENT-KEY1";

async function main() {
  console.log("Seeding database...");

  // Find or create admin user
  let user = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!user) {
    console.log(`Creating admin user: ${ADMIN_EMAIL}`);
    user = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        passwordHash: hashSync("temp-password-change-me", 10),
      },
    });
  }

  // Check if admin already has a license
  const existingLicense = await prisma.license.findFirst({
    where: {
      userId: user.id,
      licenseKey: ADMIN_LICENSE_KEY,
    },
  });

  if (!existingLicense) {
    console.log(`Creating permanent license for: ${ADMIN_EMAIL}`);
    await prisma.license.create({
      data: {
        licenseKey: ADMIN_LICENSE_KEY,
        userId: user.id,
        status: "active",
      },
    });
  } else {
    console.log(`Admin license already exists for: ${ADMIN_EMAIL}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
