import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Architecture } from "@/components/sections/architecture";
import { Verification } from "@/components/sections/verification";
import { Theorems } from "@/components/sections/theorems";
import { GettingStarted } from "@/components/sections/getting-started";
import { Footer } from "@/components/sections/footer";

export const runtime = "edge";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Architecture />
      <Verification />
      <Theorems />
      <GettingStarted />
      <Footer />
    </main>
  );
}
