import { CodeBlock } from "@/components/docs/code-block";


export default function DocsIntroduction() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Introduction</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        TorchLean is a mechanized framework for defining, executing, and
        formally verifying neural networks in Lean 4.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">What is TorchLean?</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Based on the paper{" "}
          <a
            href="https://arxiv.org/abs/2602.22631"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>TorchLean: Formalizing Neural Networks in Lean</em>
          </a>{" "}
          (George, Cruden, Zhong, Zhang, Anandkumar, 2026), TorchLean bridges
          the gap between deep learning and formal verification.
        </p>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          It provides a PyTorch-style API for constructing neural networks, a
          formal IEEE-754 floating-point semantics, and multiple verification
          methods ranging from fast incomplete approaches (IBP) to complete
          verification (&alpha;,&beta;-CROWN with branch-and-bound).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Key Capabilities</h2>
        <ul className="list-inside space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>PyTorch-style API for defining neural networks in Lean 4</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>IEEE-754 binary32 floating-point formalization with three-level semantics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>Interval Bound Propagation (IBP) for all layer types</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>CROWN/LiRPA linear relaxation bound propagation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>&alpha;,&beta;-CROWN with branch-and-bound for complete verification</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>Adversarial attacks (FGSM, PGD) for empirical robustness testing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>20 formal theorems and verification certificates</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Quick Example</h2>
        <p className="mb-4 text-muted-foreground">
          Build a simple 2-layer ReLU network and verify its robustness:
        </p>
        <CodeBlock language="lean" title="Main.lean">{`import TorchLean

open TorchLean

def buildNetwork : Option Network := do
  let w1 \u2190 Tensor.ofData [4, 2] #[0.5, 0.3, -0.2, 0.8, 0.7, -0.4, 0.1, 0.6]
  let b1 \u2190 Tensor.ofData [4] #[0.1, -0.1, 0.2, 0.0]
  let linear1 : LinearLayer := \u27E82, 4, w1, b1\u27E9

  let w2 \u2190 Tensor.ofData [2, 4] #[0.4, -0.3, 0.6, 0.2, -0.5, 0.7, -0.1, 0.3]
  let b2 \u2190 Tensor.ofData [2] #[0.1, -0.1]
  let linear2 : LinearLayer := \u27E84, 2, w2, b2\u27E9

  let net := Network.empty
    |>.addLinearAct linear1 .relu
    |>.addLayer (.linear linear2)
  return net

-- Verify robustness with IBP
let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return
let robust := verifyRobustnessIBP net input 0.05 0
-- robust = true`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Project Statistics</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <tbody>
              {[
                ["Lean files", "28"],
                ["Total lines", "~4,070"],
                ["Layer types", "10"],
                ["Verification methods", "3 (IBP, CROWN, \u03B1,\u03B2-CROWN)"],
                ["Formal theorems", "20"],
                ["Benchmarks", "3 (ACAS Xu, MNIST/CIFAR-10, VNN-COMP)"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium">{k}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">Paper Coverage</h2>
        <p className="text-muted-foreground leading-relaxed">
          TorchLean implements all sections from the paper: Frontend (&sect;3),
          Runtime (&sect;4), Verification (&sect;5), Applications (&sect;6), and
          Benchmarks (&sect;7). Each module in the codebase maps directly to a
          section of the paper.
        </p>
      </section>
    </article>
  );
}
