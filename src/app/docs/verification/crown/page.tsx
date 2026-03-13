import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function CROWNPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">CROWN</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        CROWN/LiRPA backward-mode linear bound propagation (Section 5.1).
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          CROWN (Convex Relaxation with Optimized bounds for Neural networks)
          computes linear bounds on the network output as a function of the
          input. Unlike IBP, which propagates intervals forward and loses
          inter-layer dependencies, CROWN works backward from the output and
          retains linear relationships between layers. This produces
          significantly tighter bounds, especially for deeper networks.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">CrownBound Structure</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A <code className="rounded bg-muted px-1.5 py-0.5 text-sm">CrownBound</code> represents
          linear bounds on a layer's output. The output y is bounded by{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">lowerMatrix \u00d7 x + lowerBias \u2264 y \u2264 upperMatrix \u00d7 x + upperBias</code>,
          where x is the network input.
        </p>
        <CodeBlock language="lean" title="TorchLean/Verification/Crown.lean">{`structure CrownBound where
  lowerMatrix : Tensor
  lowerBias   : Tensor
  upperMatrix : Tensor
  upperBias   : Tensor`}</CodeBlock>
        <div className="overflow-x-auto mt-4 rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/30 last:border-0">
                <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-sm">identity</code>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Create identity bounds (lower = upper = identity matrix, zero bias)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">ReLU Relaxation</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The core challenge in CROWN is handling the non-linear ReLU
          activation. Since ReLU is piecewise linear, CROWN relaxes it with
          linear upper and lower bounds depending on the pre-activation interval
          [l, u] of each neuron.
        </p>
        <CodeBlock language="lean" title="ReLU relaxation parameters">{`structure ReluRelax where
  lowerSlope     : Float
  lowerIntercept : Float
  upperSlope     : Float
  upperIntercept : Float`}</CodeBlock>
        <p className="mt-4 mb-4 text-muted-foreground leading-relaxed">
          The <code className="rounded bg-muted px-1.5 py-0.5 text-sm">computeReluRelax</code> function
          determines the relaxation based on three cases:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Case</th>
                <th className="px-4 py-2.5 text-left font-medium">Condition</th>
                <th className="px-4 py-2.5 text-left font-medium">Relaxation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Always active", "l \u2265 0", "Identity (slope = 1, intercept = 0 for both bounds)"],
                ["Always inactive", "u \u2264 0", "Zero (slope = 0, intercept = 0 for both bounds)"],
                ["Unstable", "l < 0 < u", "Upper: slope = u/(u\u2212l), intercept = \u2212lu/(u\u2212l). Lower: adaptive slope"],
              ].map(([name, cond, relax]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">{name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{cond}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{relax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          For unstable neurons, the upper bound is uniquely determined by the
          tightest convex relaxation. The lower bound slope is chosen adaptively
          (typically 0 or the upper slope) to minimize overall bound looseness.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Backward Pass</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          CROWN performs a single backward pass through the network. Starting
          from identity bounds at the output, it propagates linear bounds
          backward through each layer, substituting ReLU activations with their
          linear relaxations. The result is a pair of linear functions of the
          input that bound the network output.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["crownBackward", "Full CROWN backward bound propagation through the network, starting from the output layer"],
                ["verifyRobustnessCROWN", "Verify L\u221e robustness using CROWN bounds: compute linear bounds, evaluate on \u03b5-ball, check certification"],
              ].map(([name, desc]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">CROWN vs IBP</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          CROWN produces tighter bounds than IBP because it captures linear
          dependencies between layers. IBP treats each layer independently,
          computing the worst-case interval at each step, which compounds
          over-approximation across layers. CROWN, by propagating linear
          functions backward, avoids this compounding and accounts for
          correlations in how inputs affect the output.
        </p>
        <CodeBlock language="lean" title="CROWN robustness verification">{`-- Build a network: 2 \u2192 4 (ReLU) \u2192 2
let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return

-- CROWN verification with \u03b5 = 0.1
let trueClass := 0
let result := verifyRobustnessCROWN net input trueClass 0.1

-- CROWN may verify cases where IBP cannot, because
-- its bounds are provably at least as tight:
--   crown_lower \u2265 ibp_lower
--   crown_upper \u2264 ibp_upper

-- The backward pass computes linear bounds:
--   output \u2265 lowerMatrix \u00d7 input + lowerBias
--   output \u2264 upperMatrix \u00d7 input + upperBias
-- These are then minimized/maximized over the \u03b5-ball.`}</CodeBlock>
      </section>
    </article>
  );
}
