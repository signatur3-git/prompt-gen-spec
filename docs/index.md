---
title: Random Prompt Generator Specification
---

# Random Prompt Generator (RPG) Specification

The Random Prompt Generator (RPG) initiative defines a deterministic, package-driven ecosystem for building, validating, rendering, and distributing composite prompts. This documentation curates the v1.0.0.rc1 Request for Comments (RFC) and supporting guidance so implementation teams can develop interoperable tooling.

## How to Use This Site

- **Start with the RFC** to understand scope, guiding principles, and compliance expectations for the reference implementations.
- **Review the architecture guides** for component responsibilities, the shared data model, template syntax, and context interaction patterns.
- **Consult the sanity checks** to validate behaviour during development.
- **Lean on the glossary** when new terminology appears.

## Key Documents

- [RFC 0001: Random Prompt Generator v1.0.0.rc1](./rfc/0001-composite-random-prompt-generator.md)
- [Architecture Overview](./architecture/overview.md)
- [Architecture & Data Model](./architecture/components.md)
- [Context Interactions](./architecture/context-interactions.md)
- [Template Syntax](./architecture/template-syntax.md)
- [Sanity Check Scenarios](./sanity-checks/index.md)
- [Operations Guide](./operations/index.md)
- [Glossary](./glossary.md)
- [Project Management Assets](./project-management/milestones.md)
  - [Documentation Inventory (M0 Approved)](./project-management/m0-documentation-inventory.md)
  - [Documentation Project Plan](./project-management/documentation-project-plan.md)
- [Documentation Style Guide](./project-management/documentation-style-guide.md)
- [Source-of-Truth Mapping](./project-management/m1-source-of-truth-mapping.md)
  - [Authoring Tool Blueprint (M2 Complete)](./project-management/m2-authoring-tool-blueprint.md)
- [Compliance Documentation Index](./compliance/index.md)

## Reference Implementation Targets

The v1.0.0.rc1 roadmap covers five collaborating workstreams. Each library or service should align with the RFC and linked sub-documents:

1. **Authoring Tool** – declarative package creation, namespace management, and context simulation.
2. **Package Validator** – static analysis, schema enforcement, and compliance reporting.
3. **Rendering Engine** – deterministic template execution, context lifecycle, and performance.
4. **Rendering Libraries** – shared modules (datatypes, morphers, separator sets) packaged for reuse.
5. **Marketplace** – registry APIs, package discovery, and governance.

## Status

- **Current milestone:** M3 – Compliance framework drafting with validator pilot preparation underway.
- **Next steps:** Execute the Baseline checklist pilot, capture Advanced worksheet feedback, and update the traceability matrix CSV.
- **Roadmap & RFP planning:** See the [delivery roadmap](./project-management/milestones.md) and [RFP outline](./project-management/rfp-outline.md) for milestone tracking and vendor guidance.

## Feedback and Contributions

Issues and pull requests are welcome. Please cite relevant sections of the RFC when proposing changes so reviewers can evaluate impacts across the ecosystem.
