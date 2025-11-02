---
title: Architecture Overview
---

# Architecture Overview

This overview summarizes the Random Prompt Generator (RPG) ecosystem for documentation authors. It distills the authoritative content stored in `source-of-truth/` and RFC 0001 so writers can reference consistent component names, responsibilities, and data interactions while preparing milestone deliverables.

## System Landscape

The RPG platform comprises five collaborating implementations backed by a shared package format and deterministic runtime contracts.

| Component | Core Responsibilities | Key Interfaces & Assets | Primary Documentation |
| --- | --- | --- | --- |
| **Authoring Tool** | Provide IDE/CLI workflows for defining packages, namespaces, and components; preview context-driven outputs. | Package manifests, namespace asset editors, context simulators. | [RFC 0001 §Architecture Overview](../rfc/0001-composite-random-prompt-generator.md#architecture-overview) |
| **Package Validator** | Enforce schema, semantic, and determinism rules before publication. | Validation pipelines, compliance reporting, dependency graph checks. | [RFC 0001 §Architecture Overview](../rfc/0001-composite-random-prompt-generator.md#architecture-overview) |
| **Rendering Engine** | Execute rulebooks, maintain scoped rendering context, and produce deterministic batches. | Context lifecycle, template interpreter, pool operations. | [`source-of-truth/template-engine.md`](../../source-of-truth/template-engine.md) |
| **Reference Libraries** | Deliver reusable namespaces (e.g., `featured.common`) and data fixtures. | Datatypes, promptsections, separatorsets, morphers. | [`source-of-truth/component-overview.md`](../../source-of-truth/component-overview.md) |
| **Marketplace** | Distribute signed packages, surface compliance badges, and expose provenance APIs. | Registry services, publish/install flows, signature verification. | [`source-of-truth/component-overview.md`](../../source-of-truth/component-overview.md) |

## Core Data Model

Packages serialise namespaced assets that rely on deterministic relationships. Authors should reference these entities consistently across documentation:

- **Package** – Container with manifest metadata, dependency declarations, compliance assertions, and digital signatures.
- **Namespace** – Logical grouping that owns datatypes, promptsections, separatorsets, morphers, rulebooks, pools, and contextinterfaces.
- **Datatype** – Tagged values that support filtered selection and context contributions.
- **PromptSection** – Template with ordered references, optional repetition (`min`/`max`), separatorset bindings, and context operations.
- **SeparatorSet** – Trio of separators for one, two, and three-plus item lists.
- **Rulebook** – Weighted entry promptsections plus batch configuration.
- **Pool** – Optional aggregations that collect rendered fragments for downstream reuse.
- **ContextInterface** – Declarative contract describing context keys, request flags, contributions, and validators.

Refer to [`source-of-truth/component-overview.md`](../../source-of-truth/component-overview.md) for the Mermaid ER diagram backing these relationships.

## Rendering Context & Interactions

The rendering engine maintains a scoped context store so authors can model complex linguistic behaviour without hardcoded logic.

- **Scopes:** `.prompt` by default with hierarchical fallbacks to `.section.<id>` and `.global`. Custom scopes (e.g., `.character.hero`) are allowed.
- **Operations:** `context.get`, `set`, `has`, `request`, and `random` are supported within templates, following the syntax detailed in [`source-of-truth/context-interactions.md`](../../source-of-truth/context-interactions.md).
- **Contributions:** ContextInterfaces define conditions and priorities so tagged datatypes or promptsections can satisfy upstream requests (e.g., articles or gender agreement).
- **Pools:** Stored as context lists; templates append rendered values and draw from them deterministically.

When documenting flows, emphasise render-order evaluation: upstream references may request data, while downstream components fulfil or read it.

## Authoring & Validation Touchpoints

Writers should highlight how authoring and validation collaborate to maintain deterministic outputs:

1. **Authoring Tool** exports signed packages with namespace assets that declare required ContextInterfaces.
2. **Package Validator** consumes the same manifests, executes schema and semantic rules, and emits compliance reports (Tier alignment per RFC 0001 §Compliance Tiers).
3. **Marketplace** verifies validator signatures before publishing packages and surfaces capability metadata to downstream consumers.

## Documentation Cross-References

Use the following anchors when cross-linking milestone deliverables:

- [Architecture Components](./components.md) – Detailed breakdown of each entity and supporting diagrams.
- [Context Interactions](./context-interactions.md) – Narrative flow for context operations derived from the source-of-truth materials.
- [Template Syntax](./template-syntax.md) – Grammar, examples, and best practices for PromptSections.
- [Source-of-Truth Mapping](../project-management/m1-source-of-truth-mapping.md) – Clause-by-clause alignment between RFC 0001 and supporting documents.

## Next Steps for Authors

- Reuse the terminology defined in the updated [Glossary](../glossary.md) to keep cross-document phrasing consistent.
- Note open gaps from the [Documentation Inventory (M0 Approved)](../project-management/m0-documentation-inventory.md) when scoping follow-up drafts.
- Record architecture review feedback in milestone trackers so the overview stays aligned with reference implementations.
