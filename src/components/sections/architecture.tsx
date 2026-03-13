"use client";

import * as motion from "motion/react-client";

const modules = [
  {
    name: "Runtime",
    section: "\u00A7 4",
    description: "IEEE-754 Floating-Point Semantics",
    color: "text-red-400",
    files: ["Float32.lean", "Arith.lean", "Semantics.lean"],
  },
  {
    name: "Frontend",
    section: "\u00A7 3",
    description: "PyTorch-Style Neural Network API",
    color: "text-blue-400",
    files: ["Tensor.lean", "Layers.lean", "Graph.lean", "Execution.lean"],
  },
  {
    name: "Verification",
    section: "\u00A7 5",
    description: "Bound Propagation & Verification",
    color: "text-emerald-400",
    files: [
      "IBP.lean",
      "Crown.lean",
      "AlphaBetaCrown.lean",
      "Robustness.lean",
      "Certificate.lean",
      "Attacks.lean",
      "Tactics.lean",
    ],
  },
  {
    name: "Applications",
    section: "\u00A7 6",
    description: "Case Studies",
    color: "text-violet-400",
    files: ["PINN.lean", "Lyapunov.lean", "UniversalApprox.lean"],
  },
  {
    name: "Benchmarks",
    section: "\u00A7 7",
    description: "Benchmark Infrastructure",
    color: "text-amber-400",
    files: ["AcasXu.lean", "MNIST.lean", "VNNComp.lean"],
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Architecture</h2>
          <p className="text-lg text-muted-foreground">
            Modular design mapping directly to paper sections
          </p>
        </motion.div>

        <div className="rounded-xl border border-border/50 bg-card/30 p-6 md:p-8">
          <div className="font-mono text-sm">
            <motion.div
              className="mb-3 text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="font-semibold text-primary">TorchLean/</span>
            </motion.div>

            {modules.map((mod, i) => {
              const isLast = i === modules.length - 1;
              const connector = isLast ? "\u2514\u2500\u2500" : "\u251C\u2500\u2500";
              const indent = isLast ? "    " : "\u2502   ";
              return (
                <motion.div
                  key={mod.name}
                  className="mb-1"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-muted-foreground/50">{connector} </span>
                    <span className={`font-semibold ${mod.color}`}>
                      {mod.name}/
                    </span>
                    <span className="hidden text-xs text-muted-foreground/60 sm:inline">
                      {mod.section} &mdash; {mod.description}
                    </span>
                  </div>
                  {mod.files.map((file, j) => {
                    const fileIsLast = j === mod.files.length - 1;
                    const fileConnector = fileIsLast
                      ? "\u2514\u2500\u2500"
                      : "\u251C\u2500\u2500";
                    return (
                      <div
                        key={file}
                        className="text-muted-foreground/50"
                      >
                        <span>{indent} {fileConnector} </span>
                        <span className="text-muted-foreground/70">{file}</span>
                      </div>
                    );
                  })}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
