"use client";

import * as motion from "motion/react-client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Flame,
  Cpu,
  Shield,
  GitBranch,
  Swords,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Flame,
    title: "PyTorch-style API",
    description:
      "Define neural networks with a familiar PyTorch-like syntax. Supports Linear, Conv2d, BatchNorm, MaxPool, AvgPool, Dropout, and more.",
  },
  {
    icon: Cpu,
    title: "IEEE-754 Semantics",
    description:
      "Three-level floating-point semantics (Abstract / Concrete / Verified) built on a formal IEEE-754 binary32 representation.",
  },
  {
    icon: Shield,
    title: "Interval Bound Propagation",
    description:
      "Sound IBP verification with W\u207A/W\u207B weight decomposition for all supported layer types.",
  },
  {
    icon: GitBranch,
    title: "CROWN & \u03B1,\u03B2-CROWN",
    description:
      "Backward-mode linear relaxation bounds via CROWN/LiRPA, plus complete verification with branch-and-bound.",
  },
  {
    icon: Swords,
    title: "Adversarial Attacks",
    description:
      "FGSM and PGD adversarial attacks for empirical robustness testing alongside formal verification.",
  },
  {
    icon: ScrollText,
    title: "Formal Theorems",
    description:
      "20 formal theorems including IBP/CROWN soundness, Universal Approximation, Lyapunov stability, and semantic refinement.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Bridging the gap between deep learning and formal verification
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full border-border/50 bg-card/50 transition-colors hover:border-primary/30">
                <CardHeader>
                  <feature.icon className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
