# prompt-gen-spec

A full spec for an ambitious Composite Random Prompt Generation System.

The documentation lives under [`docs/`](docs/). Start with the [overview](docs/index.md) and browse additional sections through the
VitePress navigation when running the local preview. Operational guidance for previewing, building, and contributing is collected
in [`docs/operations/index.md`](docs/operations/index.md).
# Composite Random Prompt Generator Specification

This repository contains the evolving specification for the Composite Random Prompt Generator (CRPG) ecosystem. The spec is organized as Markdown documents that can be published with GitHub Pages or rendered locally using [VitePress](https://vitepress.dev/).

## Documentation Structure

The specification lives under [`docs/`](docs/):

- [`index.md`](docs/index.md) — project overview and status.
- [`architecture/components.md`](docs/architecture/components.md) — description of core components.
- [`sanity-checks/index.md`](docs/sanity-checks/index.md) — scenario-driven sanity checks and example backlogs.
- [`rfc/0001-composite-random-prompt-generator.md`](docs/rfc/0001-composite-random-prompt-generator.md) — baseline RFC draft for CRPG.
- [`glossary.md`](docs/glossary.md) — terminology reference.

Navigation for local previews is configured through [`docs/.vitepress/config.ts`](docs/.vitepress/config.ts).

## Local Preview with VitePress

```bash
npm install
npx vitepress dev docs
```

> **Note:** Dependency management is not yet configured; install VitePress globally or add it as a dev dependency in a follow-up change.

## Publishing

The Markdown files are compatible with GitHub Pages. Enable GitHub Pages to serve the `docs/` directory, or generate a static site via VitePress.

Authoring examples prefer YAML serialization with JSON mirrors when parity testing is required; see the RFC for schema parity expectations.

## Contributing

1. Fork the repository and create a feature branch.
2. Update or add documentation in `docs/`.
3. Open a pull request describing your changes and reference any relevant RFCs.

Feedback and questions are welcome via issues or discussions.
