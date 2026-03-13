"use client";

import * as motion from "motion/react-client";
import { Github, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const bibtex = `@article{george2026torchlean,
  title={TorchLean: Formalizing Neural Networks in Lean},
  author={George, R. J. and Cruden, J. and Zhong, X.
          and Zhang, H. and Anandkumar, A.},
  journal={arXiv preprint arXiv:2602.22631},
  year={2026}
}`;

export function Footer() {
  return (
    <footer className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Citation */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-center text-2xl font-bold">Citation</h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            If you use TorchLean in your research, please cite our paper.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-border/50 bg-card/30 p-5 font-mono text-xs text-muted-foreground md:text-sm">
            <code>{bibtex}</code>
          </pre>
        </motion.div>

        <Separator className="mb-12 bg-border/30" />

        {/* Links & copyright */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-muted-foreground">
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text font-semibold text-transparent">
              TorchLean
            </span>{" "}
            &mdash; MIT License
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nktkt/torchlean"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://arxiv.org/abs/2602.22631"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
