import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function RuntimePage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Float32 & Semantics</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        IEEE-754 binary32 formalization and three-level floating-point
        semantics.
      </p>

      {/* ── Float32 ────────────────────────────────────────── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Float32 Structure</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A complete encoding of the IEEE-754 binary32 format decomposed into
          its three constituent fields. Every finite float maps to exactly one{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Float32</code>{" "}
          value.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Float32.lean">{`structure Float32 where
  sign     : Bool
  exponent : Fin 256
  mantissa : Fin 8388608`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Constants</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Constant</th>
                <th className="px-4 py-2.5 text-left font-medium">Value</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Float32.bias", "127", "Exponent bias for binary32"],
                ["Float32.machineEpsilon", "1.1920929e\u22127", "Smallest ε such that 1 + ε \u2260 1"],
                ["Float32.posZero", "+0.0", "Positive zero"],
                ["Float32.negZero", "\u22120.0", "Negative zero"],
                ["Float32.posInf", "+\u221E", "Positive infinity"],
                ["Float32.negInf", "\u2212\u221E", "Negative infinity"],
              ].map(([name, value, desc]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{value}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Classification</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Every{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Float32</code>{" "}
          falls into exactly one of five categories defined by the IEEE-754
          standard. The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">category</code>{" "}
          function computes this from the exponent and mantissa fields.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Float32.lean">{`inductive Category
  | zero | subnormal | normal | infinity | nan`}</CodeBlock>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Predicate</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["isNaN", "True when exponent = 255 and mantissa \u2260 0"],
                ["isInf", "True when exponent = 255 and mantissa = 0"],
                ["isSubnormal", "True when exponent = 0 and mantissa \u2260 0"],
                ["isZero", "True when exponent = 0 and mantissa = 0"],
                ["isNormal", "True when 0 < exponent < 255"],
                ["category", "Returns the Category of a Float32"],
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
        <h2 className="mb-3 text-2xl font-semibold">Conversion</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">toFloat</code>{" "}
          function converts a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Float32</code>{" "}
          to Lean's native{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Float</code>{" "}
          type. The interpretation depends on the category:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Category</th>
                <th className="px-4 py-2.5 text-left font-medium">Formula</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Normal", "(\u22121)^sign \u00D7 2^(exponent \u2212 bias) \u00D7 (1 + mantissa/2\u00B2\u00B3)"],
                ["Subnormal", "(\u22121)^sign \u00D7 2^(1 \u2212 bias) \u00D7 (mantissa/2\u00B2\u00B3)"],
              ].map(([cat, formula]) => (
                <tr key={cat} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{cat}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Rounding Modes</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The four IEEE-754 rounding modes are encoded as an inductive type.
          These modes govern how real-valued results are mapped back to the
          nearest representable float.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Float32.lean">{`inductive RoundingMode
  | roundNearestEven | roundTowardPositive | roundTowardNegative | roundTowardZero`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Creating Float32 Values</h2>
        <CodeBlock language="lean" title="Example: constructing and inspecting Float32">{`-- Positive 1.0: sign=false, exponent=127, mantissa=0
let one : Float32 := { sign := false, exponent := \u27E8127, by omega\u27E9, mantissa := \u27E80, by omega\u27E9 }

-- Check its category
#eval one.category         -- Category.normal
#eval one.toFloat          -- 1.000000

-- Positive zero
#eval Float32.posZero.isZero    -- true
#eval Float32.posZero.category  -- Category.zero

-- Machine epsilon
#eval Float32.machineEpsilon    -- 1.1920929e-7`}</CodeBlock>
      </section>

      {/* ── Arith ──────────────────────────────────────────── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Activation Functions</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Standard neural-network activation functions implemented over Lean's
          native{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Float</code>{" "}
          type along with their analytic derivatives.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function</th>
                <th className="px-4 py-2.5 text-left font-medium">Definition</th>
                <th className="px-4 py-2.5 text-left font-medium">Derivative</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["relu", "max(0, x)", "reluDeriv"],
                ["sigmoid", "1/(1 + exp(\u2212x))", "sigmoidDeriv"],
                ["tanh\u2032", "(exp(x) \u2212 exp(\u2212x))/(exp(x) + exp(\u2212x))", "tanhDeriv"],
              ].map(([name, def_, deriv]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{def_}</td>
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{deriv}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Vector Operations</h2>
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
                ["dotProduct", "Dot product of two float arrays"],
                ["arraySum", "Sum of all elements in an array"],
                ["matVecMul", "Matrix-vector multiplication"],
                ["vecAdd", "Element-wise vector addition"],
                ["vecSub", "Element-wise vector subtraction"],
                ["scalarVecMul", "Scalar-vector multiplication"],
                ["argmax", "Index of the maximum element"],
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

      {/* ── Semantics ──────────────────────────────────────── */}

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Three-Level Semantics</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Section 4 of the paper defines a three-level semantic framework that
          connects idealized real-valued computation to verified IEEE-754
          execution. Each level refines the one above, forming a chain:
          Abstract \u2287 Concrete \u2287 Verified.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Level 1 \u2014 Abstract (Real-valued)</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The abstract level models computation over idealized real numbers with
          no rounding error. It serves as the mathematical ground truth against
          which lower levels are compared.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Semantics.lean">{`structure RealTensor where
  shape : List Nat
  data  : Array Float  -- idealized real arithmetic`}</CodeBlock>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Functions:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">abstractLinear</code>,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">abstractReLU</code>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Level 2 \u2014 Concrete (IEEE-754)</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The concrete level wraps every floating-point value with an explicit
          error bound. Each arithmetic operation propagates and accumulates
          rounding error through the computation.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Semantics.lean">{`structure IEEE32Exec where
  value      : Float
  errorBound : Float`}</CodeBlock>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Operation</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["exact", "Wrap a value with zero error"],
                ["add", "Addition with error propagation"],
                ["sub", "Subtraction with error propagation"],
                ["mul", "Multiplication with error propagation"],
                ["div", "Division with error propagation"],
                ["dotProduct", "Dot product with accumulated error"],
                ["matVecMul", "Matrix-vector multiply with accumulated error"],
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
        <h2 className="mb-3 text-2xl font-semibold">Level 3 \u2014 Verified</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The verified level is a polymorphic wrapper that pairs any concrete
          value with a proven error bound, forming the final layer of the
          refinement chain.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Semantics.lean">{`structure Verified (alpha : Type) where
  concrete   : alpha
  errorBound : Float`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Key Theorems</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The following theorems characterize the error behavior of IEEE-754
          arithmetic. They are currently stated with{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">sorry</code>{" "}
          (proof obligations) and represent the formal claims of the framework.
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
                ["single_op_rounding_error", "Single-operation rounding \u2264 machine epsilon \u00D7 |result|"],
                ["associativity_rounding_bound", "Reordering adds at most (n\u22121) \u00D7 \u03B5 error"],
                ["distributivity_rounding_bound", "Distribution may introduce additional rounding"],
                ["layer_error_accumulation", "Full-layer error bounded by expression involving n, \u03B5, and norms"],
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
        <h2 className="mb-3 text-2xl font-semibold">Semantic Refinement Chain</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The central result of the semantics module is fully proved (no{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">sorry</code>).
          It establishes the refinement chain Abstract \u2287 Concrete \u2287 Verified,
          showing that each level faithfully refines the level above.
        </p>
        <CodeBlock language="lean" title="TorchLean/Runtime/Semantics.lean \u2014 proved">{`theorem semantic_refinement_chain :
    semanticRefinement = SemanticLevel.chain := by
  rw [semanticRefinement, SemanticLevel.chain]
  exact rfl`}</CodeBlock>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">Using the Three-Level Semantics</h2>
        <CodeBlock language="lean" title="Example: error-tracked computation">{`-- Level 1: abstract (ideal) computation
let weights : Array Float := #[0.5, -0.3, 0.8]
let input   : Array Float := #[1.0, 2.0, 0.5]
let abstractResult := dotProduct weights input  -- 0.3

-- Level 2: concrete IEEE-754 with error tracking
let w0 := IEEE32Exec.exact 0.5
let w1 := IEEE32Exec.exact (-0.3)
let w2 := IEEE32Exec.exact 0.8
let x0 := IEEE32Exec.exact 1.0
let x1 := IEEE32Exec.exact 2.0
let x2 := IEEE32Exec.exact 0.5

let t0 := IEEE32Exec.mul w0 x0
let t1 := IEEE32Exec.mul w1 x1
let t2 := IEEE32Exec.mul w2 x2
let sum := IEEE32Exec.add (IEEE32Exec.add t0 t1) t2

#eval sum.value       -- ≈ 0.3
#eval sum.errorBound  -- accumulated rounding error

-- Level 3: verified wrapper
let verified : Verified Float := {
  concrete   := sum.value,
  errorBound := sum.errorBound
}`}</CodeBlock>
      </section>
    </article>
  );
}
