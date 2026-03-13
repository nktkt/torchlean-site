import { CodeBlock } from "@/components/docs/code-block";

export const runtime = "edge";

export default function TensorPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Tensor</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        The core data structure for neural network computations.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Structure</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A Tensor is defined by its shape (a list of dimension sizes) and a
          flat array of floating-point data. All operations validate shape
          compatibility and return <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Option Tensor</code> when
          the result may be invalid.
        </p>
        <CodeBlock language="lean" title="TorchLean/Frontend/Tensor.lean">{`structure Tensor where
  shape : List Nat
  data  : Array Float`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Creation Functions</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function</th>
                <th className="px-4 py-2.5 text-left font-medium">Signature</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["fill", "(shape : List Nat) (val : Float) : Option Tensor", "Create tensor filled with a value"],
                ["zeros", "(shape : List Nat) : Option Tensor", "Create tensor filled with zeros"],
                ["ones", "(shape : List Nat) : Option Tensor", "Create tensor filled with ones"],
                ["scalar", "(val : Float) : Tensor", "Create a scalar (shape []) tensor"],
                ["ofList", "(shape : List Nat) (data : List Float) : Option Tensor", "Create from a list of floats"],
                ["ofData", "(shape : List Nat) (data : Array Float) : Option Tensor", "Create from an array of floats"],
              ].map(([name, sig, desc]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{sig}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 mb-4 text-muted-foreground leading-relaxed">
          Functions returning <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Option Tensor</code> validate
          that the data length matches the product of the shape dimensions.
          The <code className="rounded bg-muted px-1.5 py-0.5 text-sm">scalar</code> constructor always succeeds since
          it produces a single-element tensor.
        </p>
        <CodeBlock language="lean" title="Creating tensors">{`-- Zero tensor of shape [2, 3]
let some t := Tensor.zeros [2, 3] | return

-- Tensor filled with 0.5
let some t := Tensor.fill [3, 3] 0.5 | return

-- From explicit data
let some t := Tensor.ofData [2, 2] #[1.0, 2.0, 3.0, 4.0] | return

-- Scalar
let s := Tensor.scalar 3.14`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Properties</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Property</th>
                <th className="px-4 py-2.5 text-left font-medium">Type</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ndim", "Nat", "Number of dimensions (length of shape)"],
                ["numel", "Nat", "Total number of elements (product of shape)"],
              ].map(([name, ty, desc]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{ty}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Element Access</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Elements are accessed by flat (linear) index. Out-of-bounds access
          returns <code className="rounded bg-muted px-1.5 py-0.5 text-sm">0.0</code> by default.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Function</th>
                <th className="px-4 py-2.5 text-left font-medium">Signature</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["getFlat", "(i : Nat) : Float", "Get element by flat index"],
                ["setFlat", "(i : Nat) (v : Float) : Tensor", "Set element by flat index"],
              ].map(([name, sig, desc]) => (
                <tr key={name} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{name}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{sig}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock language="lean" title="Element access">{`let some t := Tensor.ofData [2, 3] #[1.0, 2.0, 3.0, 4.0, 5.0, 6.0] | return

-- Get element at flat index 4 → 5.0
let val := t.getFlat 4

-- Set element at flat index 0 to 9.0
let t' := t.setFlat 0 9.0`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Element-wise Operations</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Element-wise operations require matching shapes and return{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Option Tensor</code> for
          binary operations that may fail on shape mismatch.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Operation</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["add", "Element-wise addition"],
                ["sub", "Element-wise subtraction"],
                ["mul", "Element-wise multiplication"],
                ["neg", "Element-wise negation"],
                ["scalarMul (s : Float)", "Multiply every element by a scalar"],
                ["maxWith", "Element-wise maximum of two tensors"],
                ["minWith", "Element-wise minimum of two tensors"],
                ["reluT", "Element-wise ReLU (max(0, x))"],
              ].map(([op, desc]) => (
                <tr key={op} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{op}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock language="lean" title="Element-wise operations">{`let some a := Tensor.ofData [3] #[1.0, -2.0, 3.0] | return
let some b := Tensor.ofData [3] #[4.0, 5.0, -1.0] | return

let some c := a.add b      -- [5.0, 3.0, 2.0]
let some d := a.mul b      -- [4.0, -10.0, -3.0]
let e := a.neg              -- [-1.0, 2.0, -3.0]
let f := a.scalarMul 2.0   -- [2.0, -4.0, 6.0]
let g := a.reluT            -- [1.0, 0.0, 3.0]`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Matrix Operations</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Matrix operations enforce rank and dimension compatibility. They are
          the building blocks for linear layers and fully-connected networks.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Operation</th>
                <th className="px-4 py-2.5 text-left font-medium">Shape</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["matVecMul", "[m, n] × [n] → [m]", "Matrix-vector multiplication"],
                ["matMul", "[m, k] × [k, n] → [m, n]", "Matrix-matrix multiplication"],
                ["transpose", "[m, n] → [n, m]", "Matrix transpose"],
              ].map(([op, shape, desc]) => (
                <tr key={op} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{op}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{shape}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock language="lean" title="Matrix operations">{`-- Matrix-vector multiply: [2, 3] × [3] → [2]
let some mat := Tensor.ofData [2, 3] #[1.0, 2.0, 3.0, 4.0, 5.0, 6.0] | return
let some vec := Tensor.ofData [3] #[1.0, 0.5, 0.1] | return
let some result := mat.matVecMul vec   -- [2.3, 7.1]

-- Matrix multiply: [2, 3] × [3, 2] → [2, 2]
let some b := Tensor.ofData [3, 2] #[1.0, 2.0, 3.0, 4.0, 5.0, 6.0] | return
let some prod := mat.matMul b

-- Transpose: [2, 3] → [3, 2]
let some t := mat.transpose`}</CodeBlock>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">Reductions</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Reduction operations collapse an entire tensor into a single value.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Operation</th>
                <th className="px-4 py-2.5 text-left font-medium">Return Type</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["sum", "Float", "Sum of all elements"],
                ["maxElem", "Float", "Maximum element"],
                ["minElem", "Float", "Minimum element"],
                ["argmaxT", "Nat", "Index of the maximum element"],
              ].map(([op, ret, desc]) => (
                <tr key={op} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{op}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{ret}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock language="lean" title="Reductions">{`let some t := Tensor.ofData [4] #[3.0, 1.0, 4.0, 1.5] | return

let s := t.sum        -- 9.5
let mx := t.maxElem   -- 4.0
let mn := t.minElem   -- 1.0
let idx := t.argmaxT  -- 2`}</CodeBlock>
      </section>
    </article>
  );
}
