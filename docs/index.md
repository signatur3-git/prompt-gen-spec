---
title: Composite Random Prompt Generator
---

# Composite Random Prompt Generator

The Composite Random Prompt Generator (CRPG) project defines a deterministic, extensible, and testable ecosystem for authoring, validating, rendering, and distributing composite prompts. The specification will evolve through request-for-comment (RFC) documents and a modular reference implementation.

## Project Goals

- **Deterministic Rendering:** Given the same seed and inputs, the rendering engine must produce identical output across compliant implementations.
- **Author Empowerment:** Authors control ontologies, templates, morphers, and contextual rules while relying on the system for only a minimal set of technical random values (seeded random numbers, UUIDs, and timestamps when explicitly requested).
- **Composable Architecture:** Packages encapsulate namespaces, prompt sections, ontologies, and rulebooks that can depend on and reuse components from other packages.
- **Ecosystem-Ready:** Tiered compliance criteria ensure standalone implementations can participate early, while the reference implementation demonstrates the complete marketplace-enabled vision.

## Specification Artifacts

- [Architecture Overview](./architecture/components.md)
- [RFC 0001: Composite Random Prompt Generator](./rfc/0001-composite-random-prompt-generator.md)
- [Glossary](./glossary.md)

## Tooling Vision

The repository uses Markdown-first documentation so it can be published through GitHub Pages or rendered locally with VitePress. Diagrams and charts are written in [Mermaid](https://mermaid.js.org/) code blocks to ensure compatibility with both environments.

## Status

- **Drafting:** Establishing a baseline specification outline and capturing open questions.
- **Next Steps:** Refine the RFC, detail compliance criteria, and validate tooling assumptions.

## Feedback

Please open issues or discussions in the repository with questions, corrections, or proposals for the CRPG spec. The RFC process will be used to review and accept changes to the specification.
