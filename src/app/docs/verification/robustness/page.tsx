import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function RobustnessPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Robustness & Certificates</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Formal robustness definitions, safety properties, and verification
        certificates (Section 5.3, 6.1).
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Robustness Definitions</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The robustness module formalizes what it means for a neural network to
          be robust: every input within a specified perturbation set must receive
          the same classification as the original input.
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
                ["tensorInInterval", "Check if a tensor lies within interval bounds element-wise"],
                ["inLinfBall", "Check if an input is within the L\u221e ball of radius \u03b5 around a center"],
                ["classify", "Return the argmax class index for a network output"],
                ["isRobust", "Formal \u03b5-robustness: all inputs in the L\u221e \u03b5-ball receive the same classification"],
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
        <CodeBlock language="lean" title="TorchLean/Verification/Robustness.lean">{`-- Formal \u03b5-robustness definition:
-- For all x' in L\u221e ball of radius \u03b5 around x,
-- classify(net(x')) = classify(net(x))
def isRobust (net : Network) (x : Tensor) (eps : Float) : Prop :=
  \u2200 x', inLinfBall x x' eps \u2192
    classify (net.forward x') = classify (net.forward x)`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Safety Properties</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Safety properties generalize robustness to arbitrary input/output
          constraints. A safety property specifies a precondition on the input
          and a postcondition on the output that must hold for all inputs
          satisfying the precondition.
        </p>
        <CodeBlock language="lean" title="Safety property">{`structure SafetyProperty where
  inputConstraint  : Tensor \u2192 Prop
  outputConstraint : Tensor \u2192 Prop`}</CodeBlock>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The <code className="rounded bg-muted px-1.5 py-0.5 text-sm">classificationSafety</code> function
          constructs a safety property for classification robustness: the input
          constraint is membership in the L\u221e \u03b5-ball, and the output constraint
          is that the argmax class equals the true class.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Formal Certificate</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A <code className="rounded bg-muted px-1.5 py-0.5 text-sm">FormalCertificate</code> bundles
          computed bounds with a soundness proof, providing a machine-checkable
          guarantee that the bounds contain all reachable outputs.
        </p>
        <CodeBlock language="lean" title="Formal certificate with proof">{`structure FormalCertificate where
  inputBounds  : Interval
  outputBounds : Interval
  trueClass    : Nat
  soundness    : -- proof that bounds are sound`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">BoundPair</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A <code className="rounded bg-muted px-1.5 py-0.5 text-sm">BoundPair</code> carries a
          lower and upper bound together with a proof that the lower bound does
          not exceed the upper bound. This invariant is enforced at construction
          time, preventing invalid bounds from propagating through the
          verification pipeline.
        </p>
        <CodeBlock language="lean" title="BoundPair with proof obligation">{`structure BoundPair where
  lower : Float
  upper : Float
  hle   : lower \u2264 upper  -- proof that lower \u2264 upper`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Soundness Theorems</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The following theorems connect the verification algorithms to the
          formal robustness definition. All are currently stated with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">sorry</code> as proof
          placeholders.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Theorem</th>
                <th className="px-4 py-2.5 text-left font-medium">Statement</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ibp_soundness (Thm 1)", "IBP bounds contain all reachable outputs for inputs in the interval"],
                ["crown_soundness", "CROWN linear bounds are sound over the input region"],
                ["crown_tighter_than_ibp", "CROWN bounds are at least as tight as IBP bounds"],
                ["robustness_via_ibp", "If IBP verifies the output bounds, then \u03b5-robustness holds"],
                ["robustness_via_crown", "If CROWN verifies the output bounds, then \u03b5-robustness holds"],
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
        <h2 className="mb-3 text-2xl font-semibold">Verification Certificates</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The certificate module provides a unified interface for generating,
          verifying, and comparing verification results across all supported
          methods.
        </p>
        <CodeBlock language="lean" title="TorchLean/Verification/Certificate.lean">{`inductive VerificationMethod
  | ibp | crown | alphaBetaCrown

structure Certificate where
  method      : VerificationMethod
  inputCenter : Tensor
  epsilon     : Float
  trueClass   : Nat
  outputLower : Tensor
  outputUpper : Tensor
  isRobust    : Bool`}</CodeBlock>
        <div className="overflow-x-auto mt-4 rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["generate", "Generate a certificate using the specified verification method"],
                ["verify", "Independently verify a certificate by re-checking its bounds"],
                ["toString", "Pretty-print a certificate with method, bounds, and result"],
                ["batchVerify", "Verify a batch of inputs and return certificates for each"],
                ["compareMethods", "Run all verification methods on the same input and compare results"],
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
        <CodeBlock language="lean" title="Generating and comparing certificates">{`let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return

-- Generate a certificate with each method
let certIBP := Certificate.generate net input 0 0.05 .ibp
let certCROWN := Certificate.generate net input 0 0.05 .crown

-- Compare all methods side-by-side
let comparison := Certificate.compareMethods net input 0 0.05
-- Shows which methods verify and the tightness of each

-- Batch verification over multiple inputs
let inputs := [input1, input2, input3]
let certs := Certificate.batchVerify net inputs 0 0.05 .crown`}</CodeBlock>
      </section>
    </article>
  );
}
