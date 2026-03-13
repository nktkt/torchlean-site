import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function BenchmarksPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Benchmarks</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        ACAS Xu, MNIST/CIFAR-10, and VNN-COMP evaluation (Section 7).
      </p>

      {/* ── ACAS Xu ── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">ACAS Xu (Section 7.1)</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          ACAS Xu (Airborne Collision Avoidance System for Unmanned aircraft) is
          a standard neural network verification benchmark. Each network takes
          five sensor inputs and produces an advisory for the pilot.
        </p>
        <CodeBlock language="lean" title="Benchmarks/AcasXu.lean — input">{`structure AcasXuInput where
  rho   : Float  -- distance between ownship and intruder
  theta : Float  -- angle to intruder relative to ownship heading
  psi   : Float  -- heading angle of intruder relative to ownship
  vOwn  : Float  -- speed of ownship
  vInt  : Float  -- speed of intruder`}</CodeBlock>
        <CodeBlock language="lean" title="Benchmarks/AcasXu.lean — advisory">{`inductive AcasXuAdvisory
  | clearOfConflict | weakLeft | weakRight | strongLeft | strongRight`}</CodeBlock>
        <p className="mt-4 mb-4 text-muted-foreground leading-relaxed">
          Network architecture: 5 inputs → 6×50 hidden (ReLU) → 5 outputs.
          Input normalization is handled by{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">AcasXuNormalization</code>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">ACAS Xu Properties</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Five safety properties (φ₁–φ₅) encode expected behavior under
          different encounter geometries.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Property</th>
                <th className="px-4 py-2.5 text-left font-medium">Condition</th>
                <th className="px-4 py-2.5 text-left font-medium">Expected Advisory</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["φ₁ (acasProperty1)", "Intruder is far away", "Clear-of-conflict"],
                ["φ₂ (acasProperty2)", "Intruder is far and moving away", "Not right advisory"],
                ["φ₃ (acasProperty3)", "Intruder is close and approaching", "Not clear-of-conflict"],
                ["φ₄ (acasProperty4)", "Intruder is approaching and close", "Not clear-of-conflict"],
                ["φ₅ (acasProperty5)", "Intruder is near and approaching", "Strong left"],
              ].map(([name, cond, advisory]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{cond}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{advisory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                ["AcasXuVerifyResult", "Verification result for a single ACAS Xu property"],
                ["verifyAcasProperty", "Verify one of the five safety properties on a given network"],
                ["runAcasXuBenchmark", "Run all properties across the full ACAS Xu network family"],
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

      {/* ── MNIST & CIFAR-10 ── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          MNIST & CIFAR-10 (Sections 7.2, 7.3)
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Image classification benchmarks for L∞ robustness verification. Each
          benchmark defines the image spec, perturbation budgets, and model
          architectures.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Benchmark</th>
                <th className="px-4 py-2.5 text-left font-medium">Image Size</th>
                <th className="px-4 py-2.5 text-left font-medium">Input Dim</th>
                <th className="px-4 py-2.5 text-left font-medium">Classes</th>
                <th className="px-4 py-2.5 text-left font-medium">ε Values</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["MNISTSpec", "28×28×1", "784", "10", "0.02, 0.05, 0.1"],
                ["CIFAR10Spec", "32×32×3", "3072", "10", "2/255, 4/255, 8/255"],
              ].map(([name, size, dim, classes, eps]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{size}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{dim}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{classes}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{eps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Model Architectures</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Builder</th>
                <th className="px-4 py-2.5 text-left font-medium">Architecture</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["buildMNISTSmall", "784 → 256 → 128 → 10"],
                ["buildMNISTMedium", "784 → 512 → 256 → 128 → 10"],
                ["buildMNISTConv", "Convolutional architecture"],
                ["buildCIFAR10Small", "Fully connected small network for CIFAR-10"],
                ["buildCIFAR10Conv", "VGG-like convolutional architecture"],
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
                ["BenchmarkResult", "Result structure for a single verification run"],
                ["runVerificationBenchmark", "Run verification on a model/dataset/ε combination"],
                ["syntheticMNISTSample", "Generate a synthetic MNIST sample for testing"],
                ["formatBenchmarkTable", "Pretty-print benchmark results as a table"],
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

      {/* ── VNN-COMP ── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">VNN-COMP (Section 7.4)</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          VNN-COMP is the annual Verification of Neural Networks Competition.
          TorchLean supports its standard categories and scoring system.
        </p>
        <CodeBlock language="lean" title="Benchmarks/VNNComp.lean — categories">{`inductive VNNCategory
  | acasXu | mnistFC | mnistConv | cifar10 | ovalBab | sri | tinyImageNet`}</CodeBlock>
        <CodeBlock language="lean" title="Benchmarks/VNNComp.lean — results">{`inductive VNNResult
  | sat | unsat | unknown | timeout | error`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">VNN-COMP API</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function / Structure</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["VNNInstance", "A single benchmark instance (category, network, property)"],
                ["VNNInstanceResult", "Result for one instance including timing and outcome"],
                ["verifyVNNInstanceIBP", "Verify an instance using IBP"],
                ["verifyVNNInstanceCROWN", "Verify an instance using CROWN"],
                ["verifyVNNInstanceAlphaBetaCROWN", "Verify an instance using α,β-CROWN"],
                ["VNNScore", "Scoring structure per VNN-COMP rules"],
                ["computeVNNScore", "Compute the aggregate score across instances"],
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
        <h2 className="mb-3 text-2xl font-semibold">Method Comparison</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          TorchLean includes reference results from external tools for
          comparison. The following table shows the supported comparison targets.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function / Structure</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ToolComparison", "Structure for comparing TorchLean against reference tools"],
                ["marabouReference", "Reference results from the Marabou verifier"],
                ["alphaBetaCrownReference", "Reference results from α,β-CROWN"],
                ["formatVNNCompTable", "Format full VNN-COMP results as a comparison table"],
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
        <h2 className="mb-3 text-2xl font-semibold">
          Verification Methods at a Glance
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Comparison of the three verification methods across VNN-COMP
          categories in terms of precision and scalability.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Method</th>
                <th className="px-4 py-2.5 text-left font-medium">Precision</th>
                <th className="px-4 py-2.5 text-left font-medium">Speed</th>
                <th className="px-4 py-2.5 text-left font-medium">Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["IBP", "Low (loose bounds)", "Very fast", "Quick filtering, small ε"],
                ["CROWN", "Medium (linear relaxation)", "Fast", "Medium networks, moderate ε"],
                ["α,β-CROWN", "High (optimized + BaB)", "Slower", "Hard instances, large networks"],
              ].map(([method, precision, speed, best]) => (
                <tr key={method} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{method}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{precision}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{speed}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
