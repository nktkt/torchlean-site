import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function ApplicationsPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Applications</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Case studies — PINN verification, Lyapunov stability, and Universal
        Approximation (Section 6).
      </p>

      {/* ── PINN Verification ── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          PINN Verification (Section 6.2)
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Physics-Informed Neural Networks (PINNs) embed PDE residuals into the
          training loss. TorchLean can verify that a trained PINN satisfies the
          governing PDE and boundary conditions within a certified tolerance.
        </p>
        <CodeBlock language="lean" title="Applications/PINN.lean — PDE structure">{`structure PDE where
  name       : String
  spatialDims : Nat
  residual   : Network → Tensor → Float`}</CodeBlock>
        <p className="mt-4 mb-4 text-muted-foreground leading-relaxed">
          A built-in example is{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">burgersEquation</code>,
          which encodes Burgers' equation: u_t + u·u_x = ν·u_xx.
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
                ["burgersEquation", "Burgers' equation PDE: u_t + u·u_x = ν·u_xx"],
                ["centralDiff", "First-order central finite difference"],
                ["centralDiff2", "Second-order central finite difference"],
                ["pinnResidual", "Compute PDE residual for a PINN at a given point"],
                ["maxResidual", "Maximum residual over a spatial grid"],
                ["checkBoundaryCondition", "Verify boundary conditions within tolerance"],
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
        <h2 className="mb-3 text-2xl font-semibold">PINN Verification Result</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The verification pipeline checks both the physics residual and the
          boundary error, returning a structured result that reports whether each
          criterion is satisfied.
        </p>
        <CodeBlock language="lean" title="Applications/PINN.lean — verification result">{`structure PINNVerificationResult where
  maxPhysicsResidual    : Float
  maxBoundaryError      : Float
  physicsVerified       : Bool
  boundaryVerified      : Bool
  overallVerified       : Bool`}</CodeBlock>
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
                ["verifyPINN", "Full PINN verification (physics + boundary)"],
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
        <p className="mt-4 text-muted-foreground leading-relaxed">
          <strong>Theorem</strong> (sorry):{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">pinn_verification</code>{" "}
          — Physics + boundary conditions verified ⟹ PDE residual bound holds.
        </p>
      </section>

      {/* ── Lyapunov Stability ── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          Lyapunov Stability (Section 6.3)
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Lyapunov stability analysis verifies that a neural controller
          stabilizes a dynamical system by checking a neural Lyapunov function.
          The core structures model the system, controller, and Lyapunov
          candidate.
        </p>
        <CodeBlock language="lean" title="Applications/Lyapunov.lean — DynamicalSystem">{`structure DynamicalSystem where
  stateDim   : Nat
  controlDim : Nat
  dynamics   : Tensor → Tensor → Tensor  -- (state, control) → next_state`}</CodeBlock>
        <CodeBlock language="lean" title="Applications/Lyapunov.lean — NeuralController">{`structure NeuralController where
  policy    : Network
  stateDim  : Nat
  controlDim : Nat`}</CodeBlock>
        <CodeBlock language="lean" title="Applications/Lyapunov.lean — LyapunovFunction">{`structure LyapunovFunction where
  network  : Network
  stateDim : Nat`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Lyapunov API</h2>
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
                ["evalLyapunov", "Evaluate V(x) for a given state"],
                ["evalController", "Evaluate the control policy π(x)"],
                ["lyapunovDerivative", "Compute V̇(x) via finite differences"],
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
        <h2 className="mb-3 text-2xl font-semibold">Lyapunov Verification</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Verification checks that V(x) {">"} 0 and V̇(x) {"<"} 0 across the
          state space, either by grid enumeration or IBP-based bound propagation.
        </p>
        <CodeBlock language="lean" title="Applications/Lyapunov.lean — verification result">{`structure LyapunovVerificationResult where
  minLyapunovValue  : Float  -- min V(x) > 0 needed
  maxLyapunovDeriv  : Float  -- max V̇(x) < 0 needed
  isStable          : Bool`}</CodeBlock>
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
                ["verifyLyapunovGrid", "Grid-based Lyapunov verification over sampled states"],
                ["verifyLyapunovIBP", "IBP-based Lyapunov verification with sound bounds"],
                ["pendulum", "Example system: simple pendulum dynamics"],
                ["linearSystem", "Example system: linear state-space dynamics"],
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
        <p className="mt-4 text-muted-foreground leading-relaxed">
          <strong>Theorem</strong> (sorry):{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">lyapunov_stability</code>{" "}
          — V(x) {">"} 0 ∧ V̇(x) {"<"} 0 ⟹ asymptotic stability.
        </p>
      </section>

      {/* ── Universal Approximation ── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">
          Universal Approximation (Section 6.4)
        </h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The universal approximation module formalizes the expressive power of
          ReLU networks. It includes predicate definitions, constructive building
          blocks, and key approximation theorems.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Definition</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["RealFunction", "Type alias for functions on real-valued tensors"],
                ["isContinuous", "Predicate: f is continuous on its domain"],
                ["inUnitCube", "Predicate: input lies in [0,1]^n"],
                ["isReLUNetwork", "Predicate: network uses only ReLU activations"],
                ["networkWidth", "Maximum width across all hidden layers"],
                ["networkDepth", "Number of layers in the network"],
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
        <h2 className="mb-3 text-2xl font-semibold">Constructive Building Blocks</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          These constructions show how ReLU networks can represent increasingly
          complex functions, culminating in arbitrary continuous function
          approximation.
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
                ["reluIdentity", "Identity via ReLU: relu(x) − relu(−x) = x"],
                ["reluHat", "Hat/tent function from ReLU units"],
                ["reluSawtoothApprox", "Sawtooth approximation from composed hat functions"],
                ["squareApproxNetwork", "x² approximation via sawtooth composition"],
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
        <h2 className="mb-3 text-2xl font-semibold">Approximation Theorems</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The following theorems formalize the approximation capabilities of ReLU
          networks. All are currently stated with{" "}
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
                ["universal_approximation", "For any continuous f on a compact domain and ε > 0, there exists a ReLU network within ε"],
                ["yarotsky_approximation_bound", "Quantitative bound: depth O(log(1/ε)), width O(n·(1/ε)^(n/2))"],
                ["relu_piecewise_linear_exact", "ReLU networks represent piecewise linear functions exactly"],
                ["relu_product_approximation", "x·y approximated via the identity xy = ((x+y)² − (x−y)²)/4"],
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
    </article>
  );
}
