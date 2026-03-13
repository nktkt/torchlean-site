# TorchLean Website

The official website and documentation for [TorchLean](https://github.com/nktkt/torchlean) — a mechanized framework for formalizing neural networks in Lean 4.

**Live:** [https://torchlean.org](https://torchlean.org)

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [shadcn/ui](https://ui.shadcn.com/) components
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Motion](https://motion.dev/) (animations)
- [Bun](https://bun.sh/) (package manager & runtime)
- [Cloudflare Workers](https://workers.cloudflare.com/) (deployment via `@opennextjs/cloudflare`)

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
site/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Theme (dark, orange accent)
│   │   └── docs/                       # Documentation (13 pages)
│   │       ├── page.tsx                # Introduction
│   │       ├── layout.tsx              # Docs layout with sidebar
│   │       ├── getting-started/
│   │       ├── frontend/{tensor,layers,graph}/
│   │       ├── runtime/
│   │       ├── verification/{ibp,crown,alpha-beta-crown,robustness,attacks}/
│   │       ├── applications/
│   │       └── benchmarks/
│   └── components/
│       ├── ui/                         # shadcn components
│       ├── sections/                   # Landing page sections
│       └── docs/                       # Docs components (sidebar, code-block)
├── wrangler.toml                       # Cloudflare Workers config
└── package.json
```

## Build & Deploy

```bash
# Build for Cloudflare Workers
bun run cf:build

# Deploy
bun run cf:deploy
```

## Landing Page Sections

- **Hero** — Gradient title, stats, CTA buttons (GitHub, Docs, Paper)
- **Features** — 6 feature cards with icons and motion animations
- **Architecture** — Interactive module tree mapping to paper sections
- **Verification Methods** — IBP / CROWN / α,β-CROWN comparison cards
- **Theorems** — 10 formal theorems with tags
- **Getting Started** — Installation steps and demo output
- **Footer** — BibTeX citation and links

## Documentation Pages

| Route | Content |
|-------|---------|
| `/docs` | Introduction & project overview |
| `/docs/getting-started` | Installation, demo, project structure |
| `/docs/frontend/tensor` | Tensor API reference |
| `/docs/frontend/layers` | Layer definitions & Network construction |
| `/docs/frontend/graph` | Computation graph IR & execution modes |
| `/docs/runtime` | IEEE-754 Float32, arithmetic, three-level semantics |
| `/docs/verification/ibp` | Interval Bound Propagation |
| `/docs/verification/crown` | CROWN/LiRPA backward bounds |
| `/docs/verification/alpha-beta-crown` | α,β-CROWN with branch-and-bound |
| `/docs/verification/robustness` | Robustness definitions & certificates |
| `/docs/verification/attacks` | FGSM/PGD attacks & verification tactics |
| `/docs/applications` | PINN, Lyapunov stability, Universal Approximation |
| `/docs/benchmarks` | ACAS Xu, MNIST/CIFAR-10, VNN-COMP |

## License

MIT
