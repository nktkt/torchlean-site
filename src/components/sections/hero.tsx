"use client";

import * as motion from "motion/react-client";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, FileText, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.3_0.12_55/0.4),transparent)]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Badge
            variant="secondary"
            className="mb-8 border-border/50 bg-secondary/80 px-4 py-1.5 text-sm"
          >
            arXiv:2602.22631
          </Badge>
        </motion.div>

        <motion.h1
          className="mb-6 text-7xl font-bold tracking-tight md:text-9xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Torch
          </span>
          <span className="text-foreground">Lean</span>
        </motion.h1>

        <motion.p
          className="mb-4 text-xl text-muted-foreground md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Formalizing Neural Networks in Lean 4
        </motion.p>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-base text-muted-foreground/70 md:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          A mechanized framework for defining, executing, and formally verifying
          neural networks with PyTorch-style API and sound verification
          certificates.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a
            href="https://github.com/nktkt/torchlean"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-8 text-base"
            )}
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </a>
          <a
            href="/docs"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-12 px-8 text-base"
            )}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Documentation
          </a>
          <a
            href="https://arxiv.org/abs/2602.22631"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-12 px-8 text-base"
            )}
          >
            <FileText className="mr-2 h-5 w-5" />
            Paper
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mx-auto mt-20 grid max-w-lg grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {[
            { value: "20", label: "Formal Theorems" },
            { value: "10", label: "Layer Types" },
            { value: "3", label: "Verification Methods" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
