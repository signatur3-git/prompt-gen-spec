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
| §Compliance Tiers | Tier definitions and validator expectations. | [RFC 0001 — Compliance Tiers](../rfc/0001-composite-random-prompt-generator.md#compliance-tiers); [M3 Compliance Framework Draft](./m3-compliance-framework-draft.md); [Compliance Documentation Index](../compliance/index.md); [M2 Authoring Tool Blueprint](./m2-authoring-tool-blueprint.md#8-compliance-touchpoints) | Link Evidence ID AT-E05 to sanity check records and keep CV-BAS-01/CV-ADV-01/CV-PREM-01 templates synchronized with glossary terminology. |
| §Reference Implementations | Workstream deliverables, observability expectations. | [Milestones Roadmap](./milestones.md); [Documentation Project Plan](./documentation-project-plan.md) | Update plan owners when reference implementation scope changes. |
| §Security & Integrity | Signing requirements, provenance. | Future compliance & marketplace guides; `source-of-truth/component-overview.md` | Capture new security controls in M3/M4 drafts. |
| §Observability & Debugging | Logging, diagnostics, reproducibility. | [Architecture Overview](../architecture/overview.md); sanity check documentation; [AT-E05 Compliance Checkpoint Log](../compliance/at-e05-compliance-checkpoint-log.md) | Ensure AT-E05 log fields cover deterministic seed capture and reference regression artefacts. |

## Change Control Notes

- **Source-of-truth files remain unedited.** When requirements evolve, document diffs in milestone trackers and confirm with governance before proposing updates.
- **Cross-document updates require paired PRs.** If an RFC clause changes, update the corresponding documentation listed here in the same change set or include clear follow-up tasks.
- **Glossary synchronization:** All terminology referenced above must use the definitions in [Glossary](../glossary.md). Submit glossary updates alongside any new RFC terms.

## Sanity Check Evidence Linkage *(M2–M3 Update)*

- Evidence ID **AT-E05** in the [Authoring Tool blueprint](./m2-authoring-tool-blueprint.md#2-evidence-capture-checklist) now anchors the compliance checkpoint log template that will house sanity check outputs for Authoring Tool reviews.
- Sanity check scenarios recorded in [`docs/sanity-checks/index.md`](../sanity-checks/index.md) should reference the AT-E05 template once compliance finalizes the evidence forms during M3; the draft template lives in the [M3 Compliance Framework Draft](./m3-compliance-framework-draft.md#validation-evidence-templates).
- Validator and compliance workstreams agreed (2024-05-18 stand-up) that the blueprint's evidence log will be the authoritative bridge between Authoring Tool actions and compliance evidence submissions. Follow-up notes from the 2024-05-19 validator sync are captured in the same draft under *Open Questions*.

## Open Alignment Tasks

1. Validate compliance template cross-references after the validator dry run updates CV-BAS-01 and CV-ADV-01. *(Due 2024-05-24.)*
2. Document publication workflow dependencies in the roadmap ahead of M6. *(Schedule for M6 planning.)*
3. Capture monitoring export schema once marketplace workstream delivers hook specifications (prerequisite for CV-PREM-01 finalization).
