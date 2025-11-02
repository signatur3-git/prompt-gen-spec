---
title: M1 Source-of-Truth Mapping
---

# M1 Source-of-Truth Mapping

This mapping aligns RFC 0001 clauses with supporting documentation so future milestones can reference a consistent baseline. It treats files in `source-of-truth/` as immutable definitions and identifies where derivative documents must stay synchronized.

## Alignment Table

| RFC 0001 Section | Key Topics | Supporting Documentation | Notes |
| --- | --- | --- | --- |
| §Architecture Overview | Component responsibilities, implementation scope. | [Architecture Overview](../architecture/overview.md); [`source-of-truth/component-overview.md`](../../source-of-truth/component-overview.md) | Use the overview for narrative summaries; cite the source-of-truth for authoritative diagrams. |
| §Data Model | Packages, namespaces, components. | [Architecture Components](../architecture/components.md); [`source-of-truth/component-overview.md`](../../source-of-truth/component-overview.md) | Ensure entity definitions mirror the ER diagram and manifest requirements. |
| §Template Language | PromptSection grammar, repetition, separators. | [Template Syntax](../architecture/template-syntax.md); [`source-of-truth/template-engine.md`](../../source-of-truth/template-engine.md) | Keep grammar snippets synchronized; flag deviations for architecture review. |
| §Rendering Context | Context lifecycle, operations, deterministic evaluation. | [Context Interactions](../architecture/context-interactions.md); [`source-of-truth/context-interactions.md`](../../source-of-truth/context-interactions.md) | Highlight scope fallbacks and contribution priorities consistently. |
| §Compliance Tiers | Tier definitions and validator expectations. | [RFC 0001 — Compliance Tiers](../rfc/0001-composite-random-prompt-generator.md#compliance-tiers); forthcoming M3 compliance guide | Document gaps or extensions in milestone trackers. |
| §Reference Implementations | Workstream deliverables, observability expectations. | [Milestones Roadmap](./milestones.md); [Documentation Project Plan](./documentation-project-plan.md) | Update plan owners when reference implementation scope changes. |
| §Security & Integrity | Signing requirements, provenance. | Future compliance & marketplace guides; `source-of-truth/component-overview.md` | Capture new security controls in M3/M4 drafts. |
| §Observability & Debugging | Logging, diagnostics, reproducibility. | [Architecture Overview](../architecture/overview.md); sanity check documentation | Link validation evidence templates once drafted in M3. |

## Change Control Notes

- **Source-of-truth files remain unedited.** When requirements evolve, document diffs in milestone trackers and confirm with governance before proposing updates.
- **Cross-document updates require paired PRs.** If an RFC clause changes, update the corresponding documentation listed here in the same change set or include clear follow-up tasks.
- **Glossary synchronization:** All terminology referenced above must use the definitions in [Glossary](../glossary.md). Submit glossary updates alongside any new RFC terms.

## Open Alignment Tasks

1. Add compliance guide cross-references once the M3 drafting cycle produces initial templates.
2. Capture sanity check linkage to compliance evidence templates during M2 planning.
3. Document publication workflow dependencies in the roadmap ahead of M6.
