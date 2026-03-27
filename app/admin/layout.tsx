import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login?unauthorized=1");
  }
  // Kontrollera isAdmin-flagga i databasen
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user?.isAdmin) {
    redirect("/login?unauthorized=1");
  }
  return <>{children}</>;
}
