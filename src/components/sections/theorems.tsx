"use client";

import * as motion from "motion/react-client";

const theorems = [
  {
    name: "IBP Soundness",
    description: "IBP output bounds contain all reachable outputs",
    tag: "Theorem 1",
  },
  {
    name: "CROWN Soundness",
    description: "CROWN linear relaxation bounds are sound",
    tag: "Theorem 2",
  },
  {
    name: "CROWN \u2265 IBP",
    description: "CROWN provides bounds at least as tight as IBP",
    tag: "Theorem 3",
  },
  {
    name: "\u03B1-CROWN \u2265 CROWN",
    description: "Optimizable relaxation is at least as tight",
    tag: "Theorem 4",
  },
  {
    name: "BaB Completeness",
    description: "Branch-and-bound is a complete verification method",
    tag: "Theorem 5",
  },
  {
    name: "Semantic Refinement Chain",
    description:
      "Abstract \u2287 Concrete \u2287 Verified \u2014 proved without sorry",
    tag: "Proved",
  },
  {
    name: "Universal Approximation",
    description:
      "ReLU networks can approximate any continuous function on compact domains",
    tag: "Theorem",
  },
  {
    name: "Yarotsky Bound",
    description:
      "Depth O(log(1/\u03B5)), width O(n\u00B7(1/\u03B5)^(n/2)) suffice for \u03B5-approximation",
    tag: "Theorem",
  },
  {
    name: "Lyapunov Stability",
    description:
      "V(x)>0 \u2227 V\u0307(x)<0 implies asymptotic stability of neural controllers",
    tag: "Theorem",
  },
  {
    name: "PINN Verification",
    description:
      "Physics + boundary conditions imply bounded PDE residual",
    tag: "Theorem",
  },
];

export function Theorems() {
  return (
    <section id="theorems" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Formal Theorems
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Mechanized proofs and formal specifications in Lean 4
          </p>
        </motion.div>

        <div className="space-y-3">
          {theorems.map((thm, i) => (
            <motion.div
              key={thm.name}
              className="group flex items-start gap-4 rounded-lg border border-border/30 bg-card/30 p-4 transition-colors hover:border-primary/20 hover:bg-card/50"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
                  thm.tag === "Proved"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {thm.tag}
              </span>
              <div className="min-w-0">
                <div className="font-semibold">{thm.name}</div>
                <div className="text-sm text-muted-foreground">
                  {thm.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 text-center text-sm text-muted-foreground/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Most theorems involving Float arithmetic use{" "}
          <code className="text-primary/70">sorry</code> as Lean 4&apos;s native
          Float type is opaque. Full proofs require Mathlib integration.
        </motion.p>
      </div>
    </section>
  );
}
