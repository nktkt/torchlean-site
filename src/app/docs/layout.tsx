"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
import { Sidebar } from "@/components/docs/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 md:px-6">
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Torch
            </span>
            <span className="-ml-1.5">Lean</span>
          </Link>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Documentation
          </span>
          <div className="flex-1" />
          <a
            href="https://github.com/nktkt/torchlean"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </header>

      <div className="mx-auto flex max-w-screen-2xl">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-border/30">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 px-4">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {open && (
          <div className="fixed inset-0 top-14 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            <div className="relative h-full w-64 overflow-y-auto border-r border-border/30 bg-background py-6 px-4">
              <Sidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-6 py-10 md:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
