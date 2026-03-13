import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function AttacksPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Attacks & Tactics</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Adversarial attacks and automated verification tactics (Section 5.4,
        5.5).
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Loss & Gradient Estimation</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Adversarial attacks require computing or estimating gradients of a loss
          function with respect to the input. Since TorchLean operates in a
          purely functional setting without automatic differentiation,
          gradients are estimated via finite differences.
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
                ["crossEntropyLoss", "Standard cross-entropy loss for classification"],
                ["marginLoss", "Margin-based loss: difference between true class and runner-up"],
                ["estimateGradient", "Finite-difference gradient estimation with configurable step size"],
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
        <h2 className="mb-3 text-2xl font-semibold">FGSM</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The Fast Gradient Sign Method (FGSM) is a single-step attack that
          perturbs the input in the direction of the loss gradient sign, scaled
          by \u03b5. It is fast but less effective than iterative methods.
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
                ["fgsm", "Untargeted FGSM: x_adv = x + \u03b5 \u00d7 sign(\u2207loss)"],
                ["fgsmTargeted", "Targeted FGSM: perturb toward a specific target class"],
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
        <CodeBlock language="lean" title="FGSM attack">{`-- Single-step FGSM attack
let some input := Tensor.ofData [2] #[0.5, 0.8] | return
let adversarial := fgsm net input trueClass 0.1
-- adversarial = input + \u03b5 \u00d7 sign(\u2207 crossEntropyLoss)`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">PGD</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Projected Gradient Descent (PGD) is an iterative attack that takes
          multiple small steps in the gradient direction, projecting back onto
          the L\u221e \u03b5-ball after each step. Random restarts improve the chance of
          finding adversarial examples.
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
                ["pgd", "Multi-step PGD attack with L\u221e projection and random restarts"],
                ["projectLinf", "Project a perturbed input back onto the L\u221e \u03b5-ball around the original"],
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
        <CodeBlock language="lean" title="PGD attack">{`-- Multi-step PGD attack with 20 iterations
let result := pgd net input trueClass 0.1
-- Internally performs:
--   1. Random start within \u03b5-ball
--   2. For each step: x \u2190 x + \u03b1 \u00d7 sign(\u2207loss)
--   3. Project back: x \u2190 projectLinf(x, x_orig, \u03b5)`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">AttackResult</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          All attacks return an{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">AttackResult</code> that
          captures the adversarial input, whether the attack succeeded, and the
          perturbation magnitude.
        </p>
        <CodeBlock language="lean" title="TorchLean/Verification/Attacks.lean">{`structure AttackResult where
  adversarialInput  : Tensor
  isSuccessful      : Bool
  originalClass     : Nat
  adversarialClass  : Nat
  perturbationNorm  : Float`}</CodeBlock>
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
                ["evaluateAttack", "Run the network on the adversarial input and populate the result"],
                ["runAttacks", "Run both FGSM and PGD, returning the strongest adversarial example found"],
                ["empiricalRobustness", "Estimate empirical robustness rate over a batch of inputs"],
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
        <h2 className="mb-3 text-2xl font-semibold">ReLU Stability Analysis</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The tactics module provides tools for analyzing ReLU neuron stability,
          which is critical for choosing an efficient verification strategy.
          Neurons that are always active or always inactive do not require
          relaxation, reducing the complexity of verification.
        </p>
        <CodeBlock language="lean" title="TorchLean/Verification/Tactics.lean">{`inductive ReLUStatus
  | alwaysActive | alwaysInactive | unstable`}</CodeBlock>
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
                ["reluStatus", "Determine the status of a single ReLU neuron from its pre-activation bounds"],
                ["analyzeReLUStability", "Classify all ReLU neurons in the network as active, inactive, or unstable"],
                ["countUnstableNeurons", "Count the total number of unstable ReLU neurons"],
                ["tightenBounds", "Iterative bound tightening: alternate IBP and CROWN to reduce interval widths"],
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
        <h2 className="mb-3 text-2xl font-semibold">Verification Strategy Selection</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The tactics module automatically selects a verification strategy based
          on network complexity and the number of unstable neurons. Simpler
          methods are tried first for efficiency, with more expensive methods
          used only when needed.
        </p>
        <CodeBlock language="lean" title="Strategy selection">{`inductive VerifyStrategy
  | ibpOnly | crownOnly | ibpThenCrown | alphaBetaCrown | adaptive`}</CodeBlock>
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
                ["selectStrategy", "Automatically select strategy based on unstable neuron count and network size"],
                ["verifyWithStrategy", "Run verification using the selected strategy"],
                ["verificationWitness", "Generate a human-readable proof witness describing the verification steps"],
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
        <CodeBlock language="lean" title="Adaptive verification">{`let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return

-- Analyze network to choose strategy
let numUnstable := countUnstableNeurons net input 0.1
let strategy := selectStrategy net numUnstable

-- Run verification with the chosen strategy
let result := verifyWithStrategy net input 0 0.1 strategy

-- Generate a human-readable proof witness
let witness := verificationWitness net input 0 0.1 strategy
-- "Verified via IBP: 0 unstable neurons, output margin = 0.42"
-- or "Verified via \u03b1,\u03b2-CROWN with 3 BaB branches"`}</CodeBlock>
      </section>
    </article>
  );
}
