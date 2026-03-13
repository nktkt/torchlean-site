import { CodeBlock } from "@/components/docs/code-block";


export default function LayersPage() {
  return (
    <article>
      <h1 className="mb-4 text-4xl font-bold">Layers</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Neural network layer definitions with forward pass.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Activation Functions</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Activation functions are represented as an inductive type and applied
          element-wise during the forward pass.
        </p>
        <CodeBlock language="lean" title="TorchLean/Frontend/Layers.lean">{`inductive ActivationFn
  | relu | sigmoid | tanh`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">LinearLayer</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A fully-connected (dense) layer computing{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">y = Wx + b</code>.
          The weight tensor has shape [outFeatures, inFeatures] and the bias
          has shape [outFeatures].
        </p>
        <CodeBlock language="lean">{`structure LinearLayer where
  inFeatures  : Nat
  outFeatures : Nat
  weight      : Tensor  -- shape [outFeatures, inFeatures]
  bias        : Tensor  -- shape [outFeatures]`}</CodeBlock>

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
                ["mk'", "Construct from raw weight and bias arrays with validation"],
                ["zeros", "Create a layer with all-zero weights and biases"],
                ["forward", "Compute y = Wx + b for an input vector"],
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
        <CodeBlock language="lean" title="LinearLayer example">{`-- Create a linear layer: 2 inputs → 4 outputs
let some w := Tensor.ofData [4, 2] #[0.5, 0.3, -0.2, 0.8, 0.7, -0.4, 0.1, 0.6] | return
let some b := Tensor.ofData [4] #[0.1, -0.1, 0.2, 0.0] | return
let linear : LinearLayer := ⟨2, 4, w, b⟩

-- Forward pass
let some input := Tensor.ofData [2] #[1.0, 0.5] | return
let some output := linear.forward input
-- output shape: [4]`}</CodeBlock>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Conv2dLayer</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A 2D convolution layer with configurable stride and padding. The
          weight tensor has shape [outChannels, inChannels, kernelH, kernelW]
          and the bias has shape [outChannels].
        </p>
        <CodeBlock language="lean">{`structure Conv2dLayer where
  inChannels  : Nat
  outChannels : Nat
  kernelH     : Nat
  kernelW     : Nat
  strideH     : Nat := 1
  strideW     : Nat := 1
  padH        : Nat := 0
  padW        : Nat := 0
  weight      : Tensor  -- [outChannels, inChannels, kernelH, kernelW]
  bias        : Tensor  -- [outChannels]`}</CodeBlock>

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
                ["outputH", "Compute output height from input height, kernel, stride, and padding"],
                ["outputW", "Compute output width from input width, kernel, stride, and padding"],
                ["forward", "Apply 2D convolution to input tensor"],
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
        <h2 className="mb-3 text-2xl font-semibold">Other Layer Types</h2>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-4 py-2.5 text-left font-medium">Layer</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["BatchNormLayer", "Batch normalization with running mean, variance, learnable gamma/beta, and configurable epsilon"],
                ["MaxPool2dLayer", "2D max pooling with configurable kernel size, stride, and padding"],
                ["AvgPool2dLayer", "2D average pooling with configurable kernel size, stride, and padding"],
                ["DropoutLayer", "Dropout regularization with a configurable drop probability"],
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
        <h2 className="mb-3 text-2xl font-semibold">Layer (Inductive)</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          The unified <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Layer</code> type
          wraps all concrete layer types into a single inductive, enabling
          heterogeneous lists of layers in a network.
        </p>
        <CodeBlock language="lean">{`inductive Layer
  | linear     : LinearLayer → Layer
  | conv2d     : Conv2dLayer → Layer
  | batchNorm  : BatchNormLayer → Layer
  | maxPool2d  : MaxPool2dLayer → Layer
  | avgPool2d  : AvgPool2dLayer → Layer
  | dropout    : DropoutLayer → Layer
  | activation : ActivationFn → Layer
  | flatten    : Layer`}</CodeBlock>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Each constructor carries the corresponding layer data. The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">flatten</code> variant
          takes no parameters and reshapes its input into a 1D vector.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-2xl font-semibold">Network</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          A <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Network</code> is a
          sequential stack of layers. Layers are applied in order during the
          forward pass.
        </p>
        <CodeBlock language="lean">{`structure Network where
  layers : List Layer`}</CodeBlock>

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
                ["empty", "Create an empty network with no layers"],
                ["addLayer", "Append a single layer to the network"],
                ["addLinearAct", "Append a linear layer followed by an activation"],
                ["forward", "Run the forward pass on an input tensor"],
                ["linearLayers", "Extract all linear layers from the network"],
                ["numLayers", "Return the total number of layers"],
                ["numParams", "Return the total number of trainable parameters"],
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
        <h2 className="mb-3 text-2xl font-semibold">Building a Network</h2>
        <p className="mb-4 text-muted-foreground leading-relaxed">
          Use <code className="rounded bg-muted px-1.5 py-0.5 text-sm">Network.empty</code> and
          the builder methods to construct a multi-layer network. The{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">addLinearAct</code> helper
          adds both a linear layer and its activation in one call.
        </p>
        <CodeBlock language="lean" title="Building a 2-layer ReLU network">{`def buildNetwork : Option Network := do
  -- Layer 1: 2 → 4 with ReLU
  let w1 ← Tensor.ofData [4, 2] #[0.5, 0.3, -0.2, 0.8, 0.7, -0.4, 0.1, 0.6]
  let b1 ← Tensor.ofData [4] #[0.1, -0.1, 0.2, 0.0]
  let linear1 : LinearLayer := ⟨2, 4, w1, b1⟩

  -- Layer 2: 4 → 2 (no activation)
  let w2 ← Tensor.ofData [2, 4] #[0.4, -0.3, 0.6, 0.2, -0.5, 0.7, -0.1, 0.3]
  let b2 ← Tensor.ofData [2] #[0.1, -0.1]
  let linear2 : LinearLayer := ⟨4, 2, w2, b2⟩

  let net := Network.empty
    |>.addLinearAct linear1 .relu
    |>.addLayer (.linear linear2)
  return net

-- Run forward pass
let some net := buildNetwork | return
let some input := Tensor.ofData [2] #[0.5, 0.8] | return
let some output := net.forward input
-- output shape: [2]

-- Inspect the network
net.numLayers  -- 3 (linear + relu + linear)
net.numParams  -- 22 (8 + 4 + 8 + 2)`}</CodeBlock>
      </section>
    </article>
  );
}
