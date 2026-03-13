"use client";

import * as motion from "motion/react-client";

const steps = [
  {
    label: "Clone the repository",
    code: "git clone https://github.com/nktkt/torchlean.git\ncd torchlean",
  },
  {
    label: "Build the project",
    code: "lake build",
  },
  {
    label: "Run the demo",
    code: "lake exe torchlean",
  },
];

const demoOutput = `\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551  TorchLean: Neural Network Verification  \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D

\u2500\u2500 2. Forward Pass \u2500\u2500
  Input:  Tensor(shape=[2], data=[0.5, 0.8])
  Output: Tensor(shape=[2], data=[0.448, 0.049])

\u2500\u2500 4. IBP Robustness Verification \u2500\u2500
  \u03B5 = 0.05, IBP robust: true

\u2500\u2500 5. CROWN Robustness Verification \u2500\u2500
  CROWN robust: true (tighter bounds than IBP)

\u2500\u2500 6. \u03B1,\u03B2-CROWN Verification \u2500\u2500
  Verified: true, Branches: 1`;

export function GettingStarted() {
  return (
    <section id="getting-started" className="bg-card/20 py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Getting Started
          </h2>
          <p className="text-lg text-muted-foreground">
            Requires{" "}
            <a
              href="https://leanprover.github.io/lean4/doc/quickstart.html"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lean 4
            </a>{" "}
            (v4.28.0) and Lake
          </p>
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">
                  {step.label}
                </span>
              </div>
              <pre className="overflow-x-auto rounded-lg border border-border/50 bg-background/80 p-4 font-mono text-sm text-foreground/90">
                <code>{step.code}</code>
              </pre>
            </motion.div>
          ))}
        </div>

        {/* Demo output */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="mb-4 text-center text-lg font-semibold text-muted-foreground">
            Demo Output
          </h3>
          <pre className="overflow-x-auto rounded-xl border border-primary/20 bg-background/80 p-6 font-mono text-xs leading-relaxed text-foreground/80 md:text-sm">
            <code>{demoOutput}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
