import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// Landing page with hero, benefits and CTA
export default function LandingPage() {
  const benefits = [
    "Real-time insights",
    "Customizable dashboards",
    "Collaborative chat",
  ];

  return (
    <main className="mx-auto max-w-4xl p-8 text-center">
      <section className="py-20">
        <h1 className="mb-4 text-4xl font-bold">Argus Platform</h1>
        <p className="mb-8 text-lg text-gray-600">
          Monitor your data and collaborate with your team.
        </p>
        <Link href="/dashboard">
          <Button>Ir al dashboard</Button>
        </Link>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex flex-col items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <p>{benefit}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
