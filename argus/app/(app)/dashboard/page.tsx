import { redirect } from "next/navigation";

// Redirect /dashboard to the Inicio page
export default function DashboardIndexPage() {
  redirect("/dashboard/inicio");
}
