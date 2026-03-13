import { CodeBlock } from "@/components/docs/code-block";


export default function AlphaBetaCROWNPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">\u03b1,\u03b2-CROWN</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Complete verification with optimizable bounds and branch-and-bound
        (Section 5.2).
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          \u03b1,\u03b2-CROWN extends CROWN in two directions. The \u03b1 (alpha) parameters
          make the lower-bound slopes of unstable ReLU relaxations optimizable,
          allowing gradient-based tightening. The \u03b2 (beta) parameters encode
          neuron-split constraints via Lagrangian multipliers, enabling a
          branch-and-bound procedure that achieves complete verification.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Alpha Parameters</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          In standard CROWN, the lower-bound slope for unstable ReLU neurons is
          chosen heuristically. \u03b1-CROWN instead treats these slopes as
          learnable parameters that are optimized to produce the tightest
          possible bounds.
        </p>
        <CodeBlock language="lean" title="TorchLean/Verification/AlphaBetaCrown.lean">{`structure AlphaParams where
  slopes : List (Array Float)`}</CodeBlock>
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
                ["AlphaParams.init", "Initialize alpha slopes (one per unstable neuron per layer)"],
                ["AlphaParams.clamp", "Clamp slopes to [0, 1] to maintain valid relaxation"],
                ["computeAlphaReluRelax", "Compute ReLU relaxation using learned alpha slopes for unstable neurons"],
                ["alphaCrownBackward", "\u03b1-CROWN backward pass with optimizable parameters"],
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

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Beta Parameters</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          \u03b2-CROWN introduces Lagrangian multipliers that encode neuron-split
          constraints. When the branch-and-bound procedure decides a neuron is
          active or inactive, these constraints are incorporated into the bound
          computation via \u03b2 parameters, yielding tighter bounds on each
          sub-problem.
        </p>
        <CodeBlock language="lean" title="Neuron splits and beta parameters">{`structure NeuronSplit where
  layerIdx  : Nat
  neuronIdx : Nat
  isActive  : Bool

structure BetaParams where
  multipliers : List Float  -- Lagrangian multipliers`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Branch-and-Bound</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Branch-and-bound (BaB) achieves complete verification by recursively
          splitting unstable ReLU neurons into active/inactive cases. Each split
          creates two sub-problems with tighter bounds. The procedure terminates
          when all sub-problems are either verified or a counterexample is found.
        </p>
        <CodeBlock language="lean" title="BaB data structures">{`structure BaBNode where
  inputBounds : Interval
  splits      : List NeuronSplit
  lowerBound  : Float
  upperBound  : Float

structure BaBResult where
  verified       : Bool
  numBranches    : Nat
  finalLowerBound : Float`}</CodeBlock>
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
                ["selectSplitNeuron", "Select the most unstable ReLU neuron to split (largest interval width)"],
                ["babStep", "One BaB step: split a neuron, create two sub-problems with tightened bounds"],
                ["branchAndBound", "Full BaB loop with configurable maximum iterations"],
                ["verifyRobustnessAlphaBetaCROWN", "End-to-end L\u221e robustness verification using \u03b1,\u03b2-CROWN with BaB"],
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

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Key Theorems</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The following theorems establish the formal properties of \u03b1,\u03b2-CROWN.
          Both are currently stated with{" "}
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
                ["alpha_crown_tighter_than_crown", "\u03b1-CROWN bounds are at least as tight as standard CROWN bounds"],
                ["bab_completeness", "Branch-and-bound is a complete verification method: it will either verify or find a counterexample"],
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
        <h2 className="mb-3 text-2xl font-semibold">Example</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The full \u03b1,\u03b2-CROWN pipeline first attempts verification with
          optimized \u03b1 bounds. If the relaxation alone is insufficient, it falls
          back to branch-and-bound with \u03b2 constraints.
        </p>
        <CodeBlock language="lean" title="\u03b1,\u03b2-CROWN verification">{`let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return

-- \u03b1,\u03b2-CROWN verification with \u03b5 = 0.15
let result := verifyRobustnessAlphaBetaCROWN net input 0 0.15
  (maxIterations := 100)

-- result : BaBResult
-- result.verified      -- true if robustness is certified
-- result.numBranches   -- number of BaB branches explored
-- result.finalLowerBound -- tightest lower bound achieved

-- The hierarchy of tightness:
-- IBP \u2264 CROWN \u2264 \u03b1-CROWN \u2264 \u03b1,\u03b2-CROWN (with BaB = complete)`}</CodeBlock>
      </section>
    </article>
  );
}
