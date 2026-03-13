"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = { title: string; href: string };
type NavGroup = { title: string; items: NavItem[] };

const nav: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Getting Started", href: "/docs/getting-started" },
    ],
  },
  {
    title: "Frontend (\u00A7 3)",
    items: [
      { title: "Tensor", href: "/docs/frontend/tensor" },
      { title: "Layers", href: "/docs/frontend/layers" },
      { title: "Graph & Execution", href: "/docs/frontend/graph" },
    ],
  },
  {
    title: "Runtime (\u00A7 4)",
    items: [{ title: "Float32 & Semantics", href: "/docs/runtime" }],
  },
  {
    title: "Verification (\u00A7 5)",
    items: [
      { title: "IBP", href: "/docs/verification/ibp" },
      { title: "CROWN", href: "/docs/verification/crown" },
      {
        title: "\u03B1,\u03B2-CROWN",
        href: "/docs/verification/alpha-beta-crown",
      },
      { title: "Robustness & Certificates", href: "/docs/verification/robustness" },
      { title: "Attacks & Tactics", href: "/docs/verification/attacks" },
    ],
  },
  {
    title: "Applications (\u00A7 6)",
    items: [{ title: "PINN, Lyapunov & UAT", href: "/docs/applications" }],
  },
  {
    title: "Benchmarks (\u00A7 7)",
    items: [
      { title: "ACAS Xu, MNIST & VNN-COMP", href: "/docs/benchmarks" },
    ],
  },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 text-sm">
      {nav.map((group) => (
        <div key={group.title}>
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
            {group.title}
          </div>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "block rounded-md px-3 py-1.5 transition-colors",
                      active
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
