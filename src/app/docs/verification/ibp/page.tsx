import { CodeBlock } from "@/components/docs/code-block";


export default function IBPPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Interval Bound Propagation</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Sound neural network verification via interval arithmetic (Section 5.1).
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Interval Structure</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          An interval is defined by a pair of tensors representing element-wise
          lower and upper bounds. All IBP operations propagate these bounds
          through network layers while maintaining soundness: the true output is
          always contained within the computed interval.
        </p>
        <CodeBlock language="lean" title="TorchLean/Verification/IBP.lean">{`structure Interval where
  lower : Tensor
  upper : Tensor`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Interval Utilities</h2>
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
                ["point", "Create a zero-width interval from a single tensor (lower = upper = x)"],
                ["epsBall", "Create an interval [x \u2212 \u03b5, x + \u03b5] representing an L\u221e ball around x"],
                ["isValid", "Check that lower \u2264 upper holds element-wise"],
                ["width", "Compute the interval width (upper \u2212 lower)"],
                ["midpoint", "Compute the interval midpoint ((lower + upper) / 2)"],
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
        <CodeBlock language="lean" title="Creating intervals">{`-- Point interval (no uncertainty)
let some x := Tensor.ofData [3] #[1.0, 2.0, 3.0] | return
let ptInterval := Interval.point x

-- \u03b5-ball around x with \u03b5 = 0.1
let epsInterval := Interval.epsBall x 0.1
-- lower = [0.9, 1.9, 2.9], upper = [1.1, 2.1, 3.1]`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Layer-wise IBP</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Each layer type has a dedicated IBP function that propagates intervals
          while preserving soundness. The key insight for linear layers is the
          W\u207a/W\u207b decomposition: splitting the weight matrix into its positive
          and negative parts allows tight interval computation.
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
                ["ibpLinear", "W\u207a/W\u207b decomposition: lower = W\u207a\u00d7lower + W\u207b\u00d7upper + bias, upper = W\u207a\u00d7upper + W\u207b\u00d7lower + bias"],
                ["ibpReLU", "lower = max(0, lower), upper = max(0, upper)"],
                ["ibpSigmoid", "Apply monotone sigmoid to both bounds directly"],
                ["ibpTanh", "Apply monotone tanh to both bounds directly"],
                ["ibpConv2d", "Interval convolution analogous to ibpLinear using kernel decomposition"],
                ["ibpBatchNorm", "Propagate intervals through batch normalization parameters"],
                ["ibpMaxPool2d", "Interval max pooling over spatial regions"],
                ["ibpAvgPool2d", "Interval average pooling over spatial regions"],
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
        <CodeBlock language="lean" title="W\u207a/W\u207b decomposition for linear layers">{`-- ibpLinear splits weight W into positive and negative parts:
-- W\u207a = max(W, 0)   W\u207b = min(W, 0)
--
-- new_lower = W\u207a \u00d7 lower + W\u207b \u00d7 upper + bias
-- new_upper = W\u207a \u00d7 upper + W\u207b \u00d7 lower + bias
--
-- This is exact for intervals: positive weights preserve
-- bound direction, negative weights swap them.`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Network-level Propagation</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The network-level functions compose layer-wise IBP to propagate
          intervals through an entire network and check the resulting output
          bounds for robustness certification.
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
                ["ibpLayer", "Dispatch an interval to the appropriate layer-wise IBP function"],
                ["ibpNetwork", "Propagate an interval through the entire network layer by layer"],
                ["verifyRobustnessIBP", "Verify L\u221e robustness: create \u03b5-ball, propagate with IBP, check output bounds"],
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
        <h2 className="mb-3 text-2xl font-semibold">Example: IBP Verification</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The following example shows how to verify that a network classifies
          all inputs within an L\u221e \u03b5-ball identically. The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">verifyRobustnessIBP</code>{" "}
          function creates the input interval, propagates it through the
          network, and checks whether the lower bound of the true class exceeds
          the upper bounds of all other classes.
        </p>
        <CodeBlock language="lean" title="IBP robustness verification">{`-- Build a small network: 2 \u2192 4 (ReLU) \u2192 2
let some net := buildNetwork | return

-- Input to verify around
let some input := Tensor.ofData [2] #[0.5, 0.8] | return

-- Verify \u03b5-robustness with \u03b5 = 0.05
let trueClass := 0
let result := verifyRobustnessIBP net input trueClass 0.05

-- result.verified = true means ALL inputs in [x\u2212\u03b5, x+\u03b5]
-- are guaranteed to be classified as trueClass

-- You can also inspect the output bounds directly:
let epsInput := Interval.epsBall input 0.05
let some outputBounds := ibpNetwork net epsInput | return
-- outputBounds.lower, outputBounds.upper contain the
-- certified output range for every class`}</CodeBlock>
      </section>
    </article>
  );
}
