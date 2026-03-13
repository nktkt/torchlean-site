"use client";

import * as motion from "motion/react-client";
import { Badge } from "@/components/ui/badge";

function Dots({ filled, total = 3 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < filled ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

const methods = [
  {
    name: "IBP",
    badge: "Incomplete",
    badgeVariant: "secondary" as const,
    description: "Interval Bound Propagation with W\u207A/W\u207B decomposition",
    tightness: 1,
    speed: 3,
    highlight: false,
  },
  {
    name: "CROWN",
    badge: "Recommended",
    badgeVariant: "default" as const,
    description: "Backward-mode linear relaxation bounds (LiRPA)",
    tightness: 2,
    speed: 2,
    highlight: true,
  },
  {
    name: "\u03B1,\u03B2-CROWN",
    badge: "Complete",
    badgeVariant: "outline" as const,
    description: "Optimizable relaxation with branch-and-bound",
    tightness: 3,
    speed: 1,
    highlight: false,
  },
];

const layers = [
  { name: "Linear (FC)", forward: true, ibp: true, crown: true },
  { name: "Conv2d", forward: true, ibp: true, crown: false },
  { name: "BatchNorm", forward: true, ibp: true, crown: false },
  { name: "MaxPool2d", forward: true, ibp: true, crown: false },
  { name: "AvgPool2d", forward: true, ibp: true, crown: false },
  { name: "ReLU", forward: true, ibp: true, crown: true },
  { name: "Sigmoid", forward: true, ibp: true, crown: false },
  { name: "Tanh", forward: true, ibp: true, crown: false },
  { name: "Dropout", forward: true, ibp: true, crown: true },
  { name: "Flatten", forward: true, ibp: true, crown: true },
];

function Check() {
  return <span className="text-emerald-400">\u2713</span>;
}
function Dash() {
  return <span className="text-muted-foreground/40">\u2014</span>;
}

export function Verification() {
  return (
    <section
      id="verification"
      className="bg-card/20 py-24 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Verification Methods
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From fast incomplete methods to complete verification with
            branch-and-bound
          </p>
        </motion.div>

        {/* Method cards */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {methods.map((method, i) => (
            <motion.div
              key={method.name}
              className={`rounded-xl border p-6 ${
                method.highlight
                  ? "border-primary/30 bg-card/60 ring-1 ring-primary/10"
                  : "border-border/50 bg-card/40"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Badge variant={method.badgeVariant} className="mb-4">
                {method.badge}
              </Badge>
              <h3 className="mb-2 text-xl font-bold">{method.name}</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                {method.description}
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tightness</span>
                  <Dots filled={method.tightness} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Speed</span>
                  <Dots filled={method.speed} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layer support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-6 text-center text-2xl font-bold">
            Supported Layers
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium">Layer</th>
                  <th className="px-4 py-3 text-center font-medium">Forward</th>
                  <th className="px-4 py-3 text-center font-medium">IBP</th>
                  <th className="px-4 py-3 text-center font-medium">CROWN</th>
                </tr>
              </thead>
              <tbody>
                {layers.map((layer) => (
                  <tr
                    key={layer.name}
                    className="border-b border-border/30 last:border-0"
                  >
                    <td className="px-4 py-2.5 font-mono text-xs">
                      {layer.name}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {layer.forward ? <Check /> : <Dash />}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {layer.ibp ? <Check /> : <Dash />}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      {layer.crown ? <Check /> : <Dash />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
