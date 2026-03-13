import { CodeBlock } from "@/components/docs/code-block";


export default function GraphPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Graph & Execution</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Computation graph IR and execution modes.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">ComputeGraph</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          TorchLean compiles a <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Network</code> into
          a low-level intermediate representation (IR) called a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">ComputeGraph</code>. The
          graph is a directed acyclic graph of operations, where each node
          carries its operation type, input references, output shape, and
          optional constant data.
        </p>

        <h3 className="mb-2 mt-6 text-lg font-medium">Op</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The set of primitive operations supported by the graph IR:
        </p>
        <CodeBlock language="lean" title="TorchLean/Frontend/Graph.lean">{`inductive Op
  | input | matMul | add | relu | sigmoid | tanh | constant`}</CodeBlock>

        <h3 className="mb-2 mt-6 text-lg font-medium">GraphNode</h3>
        <CodeBlock language="lean">{`structure GraphNode where
  id          : Nat
  op          : Op
  inputs      : List Nat
  outputShape : List Nat
  constData   : Option Tensor`}</CodeBlock>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Each node has a unique <code className="rounded bg-muted px-1.5 py-0.5 text-sm">id</code>,
          references its inputs by their node IDs, and tracks its output shape.
          Constant nodes (weights, biases) store their data in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">constData</code>.
        </p>

        <h3 className="mb-2 mt-6 text-lg font-medium">ComputeGraph</h3>
        <CodeBlock language="lean">{`structure ComputeGraph where
  nodes    : List GraphNode
  inputIds : List Nat
  outputId : Nat`}</CodeBlock>

        <h3 className="mb-2 mt-6 text-lg font-medium">Key Functions</h3>
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
                ["ofNetwork", "Compile a Network into a ComputeGraph"],
                ["eval", "Evaluate the graph given input tensors"],
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
        <CodeBlock language="lean" title="Compiling and evaluating a graph">{`-- Compile a network to a compute graph
let some net := buildNetwork | return
let graph := ComputeGraph.ofNetwork net [2]

-- Evaluate the graph
let some input := Tensor.ofData [2] #[0.5, 0.8] | return
let some output := graph.eval [input]`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">ExecutionMode</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          TorchLean supports two execution modes. Eager mode runs the forward
          pass directly through <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Network.forward</code>,
          while compiled mode first lowers the network to a{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">ComputeGraph</code> and
          evaluates the graph.
        </p>
        <CodeBlock language="lean" title="TorchLean/Frontend/Execution.lean">{`inductive ExecutionMode
  | eager | compiled`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">ExecutableModel</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The <code className="rounded bg-muted px-1.5 py-0.5 text-sm">ExecutableModel</code> wraps
          a network and its compiled graph, allowing seamless switching between
          eager and compiled execution.
        </p>

        <h3 className="mb-2 mt-6 text-lg font-medium">Functions</h3>
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
                ["eagerModel", "Create a model that runs in eager mode"],
                ["compiledModel", "Create a model with a pre-compiled graph"],
                ["forward", "Run inference using the current execution mode"],
                ["setMode", "Switch between eager and compiled modes"],
                ["getGraph", "Retrieve the underlying ComputeGraph (if compiled)"],
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
        <CodeBlock language="lean" title="Using ExecutableModel">{`let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return

-- Eager execution (direct forward pass)
let eagerModel := ExecutableModel.eagerModel net
let some out1 := eagerModel.forward input

-- Compiled execution (via graph IR)
let compiledModel := ExecutableModel.compiledModel net [2]
let some out2 := compiledModel.forward input

-- Switch modes at runtime
let model := eagerModel.setMode .compiled`}</CodeBlock>
      </section>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">ONNX Import</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          TorchLean can import models from an ONNX-like graph representation,
          converting standard ONNX operators into TorchLean layers.
        </p>

        <h3 className="mb-2 mt-6 text-lg font-medium">ONNXOp</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Supported ONNX operators that map to TorchLean layer types:
        </p>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">ONNXOp</th>
                <th className="px-4 py-2.5 text-left font-medium">TorchLean Layer</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["gemm", "LinearLayer (general matrix multiply)"],
                ["relu", "ActivationFn.relu"],
                ["sigmoid", "ActivationFn.sigmoid"],
                ["tanh", "ActivationFn.tanh"],
                ["conv", "Conv2dLayer"],
                ["batchNorm", "BatchNormLayer"],
                ["maxPool", "MaxPool2dLayer"],
                ["averagePool", "AvgPool2dLayer"],
                ["flatten", "Layer.flatten"],
                ["dropout", "DropoutLayer"],
                ["add", "Element-wise add"],
                ["matMul", "Matrix multiplication"],
              ].map(([op, layer]) => (
                <tr key={op} className="border-b border-border/30 last:border-0">
                  <td className="px-4 py-2.5 font-medium whitespace-nowrap">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{op}</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{layer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mb-2 mt-6 text-lg font-medium">importONNX</h3>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The <code className="rounded bg-muted px-1.5 py-0.5 text-sm">importONNX</code> function
          converts an ONNX-like graph (a list of operator nodes with associated
          tensor data) into a TorchLean{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Network</code>, enabling
          verification of models trained in PyTorch or other frameworks.
        </p>
        <CodeBlock language="lean" title="Importing an ONNX model">{`-- Define ONNX nodes (simplified)
let onnxNodes : List ONNXNode := [
  { op := .gemm,    inputs := ["input"], outputs := ["fc1"],
    attrs := [], tensors := [("weight", w1), ("bias", b1)] },
  { op := .relu,    inputs := ["fc1"],   outputs := ["relu1"],
    attrs := [], tensors := [] },
  { op := .gemm,    inputs := ["relu1"], outputs := ["output"],
    attrs := [], tensors := [("weight", w2), ("bias", b2)] }
]

-- Convert to TorchLean Network
let some net := importONNX onnxNodes | return

-- Now use the network for verification
let some output := net.forward input`}</CodeBlock>
      </section>
    </article>
  );
}
