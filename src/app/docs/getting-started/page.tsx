import { CodeBlock } from "@/components/docs/code-block";


export default function GettingStarted() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Getting Started</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Install TorchLean and run your first neural network verification.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Requirements</h2>
        <ul className="list-inside space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <a
                href="https://leanprover.github.io/lean4/doc/quickstart.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lean 4
              </a>{" "}
              (v4.28.0)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <a
                href="https://github.com/leanprover/lake"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lake
              </a>{" "}
              (bundled with Lean)
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Installation</h2>

        <h3 className="mb-2 mt-6 text-lg font-medium">1. Clone the repository</h3>
        <CodeBlock language="bash">{`git clone https://github.com/nktkt/torchlean.git
cd torchlean`}</CodeBlock>

        <h3 className="mb-2 mt-6 text-lg font-medium">2. Build the project</h3>
        <CodeBlock language="bash">{`lake build`}</CodeBlock>
        <p className="mb-4 text-sm text-muted-foreground">
          This compiles all 28 Lean files with 58 build jobs.
        </p>

        <h3 className="mb-2 mt-6 text-lg font-medium">3. Run the demo</h3>
        <CodeBlock language="bash">{`lake exe torchlean`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Demo Output</h2>
        <p className="mb-4 text-muted-foreground">
          The demo showcases network construction, forward pass, IBP, CROWN,
          &alpha;,&beta;-CROWN verification, adversarial attacks, and more:
        </p>
        <CodeBlock>{`\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551  TorchLean: Neural Network Verification  \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D

\u2500\u2500 1. Network Construction \u2500\u2500
  Layers: 3, Parameters: 22

\u2500\u2500 2. Forward Pass \u2500\u2500
  Input:  Tensor(shape=[2], data=[0.5, 0.8])
  Output: Tensor(shape=[2], data=[0.448, 0.049])

\u2500\u2500 4. IBP Robustness Verification \u2500\u2500
  \u03B5 = 0.05, IBP robust: true

\u2500\u2500 5. CROWN Robustness Verification \u2500\u2500
  CROWN robust: true (tighter bounds than IBP)

\u2500\u2500 6. \u03B1,\u03B2-CROWN Verification \u2500\u2500
  Verified: true, Branches: 1

\u2500\u2500 8. Method Comparison \u2500\u2500
  IBP total output width:   0.284
  CROWN total output width: 0.200
  \u2192 CROWN provides tighter bounds

\u2500\u2500 9. Adversarial Attacks \u2500\u2500
  FGSM: successful=false  (attack failed \u2192 robust)
  PGD:  successful=false  (attack failed \u2192 robust)`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Using as a Library</h2>
        <p className="mb-4 text-muted-foreground">
          Add TorchLean as a dependency in your <code className="rounded bg-muted px-1.5 py-0.5 text-sm">lakefile.toml</code>:
        </p>
        <CodeBlock language="toml" title="lakefile.toml">{`[[require]]
name = "TorchLean"
git = "https://github.com/nktkt/torchlean"
rev = "main"`}</CodeBlock>

        <p className="mt-4 mb-4 text-muted-foreground">
          Then import in your Lean file:
        </p>
        <CodeBlock language="lean">{`import TorchLean

open TorchLean`}</CodeBlock>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">Project Structure</h2>
        <CodeBlock>{`TorchLean/
\u251C\u2500\u2500 Runtime/            \u00A7 4 \u2014 IEEE-754 Floating-Point Semantics
\u2502   \u251C\u2500\u2500 Float32.lean         IEEE-754 binary32 representation
\u2502   \u251C\u2500\u2500 Arith.lean           Activation functions & vector operations
\u2502   \u2514\u2500\u2500 Semantics.lean       Three-level semantics
\u2502
\u251C\u2500\u2500 Frontend/           \u00A7 3 \u2014 PyTorch-Style Neural Network API
\u2502   \u251C\u2500\u2500 Tensor.lean          Tensor type with operations
\u2502   \u251C\u2500\u2500 Layers.lean          Layer definitions & forward pass
\u2502   \u251C\u2500\u2500 Graph.lean           Computation graph IR
\u2502   \u2514\u2500\u2500 Execution.lean       Eager/Compiled modes, ONNX import
\u2502
\u251C\u2500\u2500 Verification/       \u00A7 5 \u2014 Bound Propagation & Verification
\u2502   \u251C\u2500\u2500 IBP.lean             Interval Bound Propagation
\u2502   \u251C\u2500\u2500 Crown.lean           CROWN/LiRPA backward bounds
\u2502   \u251C\u2500\u2500 AlphaBetaCrown.lean  \u03B1,\u03B2-CROWN with branch-and-bound
\u2502   \u251C\u2500\u2500 Robustness.lean      Formal robustness theorems
\u2502   \u251C\u2500\u2500 Certificate.lean     Verification certificates
\u2502   \u251C\u2500\u2500 Attacks.lean         FGSM & PGD attacks
\u2502   \u2514\u2500\u2500 Tactics.lean         ReLU analysis & adaptive verification
\u2502
\u251C\u2500\u2500 Applications/       \u00A7 6 \u2014 Case Studies
\u2502   \u251C\u2500\u2500 PINN.lean            Physics-Informed NN verification
\u2502   \u251C\u2500\u2500 Lyapunov.lean        Neural controller stability
\u2502   \u2514\u2500\u2500 UniversalApprox.lean Universal Approximation Theorem
\u2502
\u2514\u2500\u2500 Benchmarks/         \u00A7 7 \u2014 Benchmark Infrastructure
    \u251C\u2500\u2500 AcasXu.lean          ACAS Xu safety properties
    \u251C\u2500\u2500 MNIST.lean           MNIST & CIFAR-10 models
    \u2514\u2500\u2500 VNNComp.lean         VNN-COMP evaluation`}</CodeBlock>
      </section>
    </article>
  );
}
