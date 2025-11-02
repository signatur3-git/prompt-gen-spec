---
title: RFC 0001 — Composite Random Prompt Generator
---

# RFC 0001 — Composite Random Prompt Generator

- **Status:** Draft
- **Authors:** TBD
- **Reviewers:** TBD
- **Created:** 2024-XX-XX
- **Target Version:** v1.0.0-rc1

## Abstract

This RFC establishes the baseline specification for the Composite Random Prompt Generator (CRPG) ecosystem. It describes the system architecture, domain model, package manifest, compliance tiers, and roadmap for a reference implementation capable of producing deterministic prompt outputs across diverse language ontologies.

## Motivation

Prompt engineering workflows often mix ad-hoc templates with non-deterministic runtime behavior. CRPG introduces a deterministic, package-driven approach where authors define ontologies, templates, morphers, and rulebooks that can be validated, shared, and rendered reproducibly.

## Design Principles

1. **Deterministic Rendering:** Rendering the same package with the same seed must produce identical output across compliant implementations.
2. **Author Control:** Authors define ontologies, template logic, separator sets, and morphers; the system only provides seeded randomness, UUID generation, and timestamps.
3. **Composable Packages:** Namespaces within packages can reference assets across package boundaries, enabling a modular ecosystem.
4. **Tiered Compliance:** A tiered compliance model encourages incremental adoption while guiding the development of a complete reference implementation.
5. **Schema Parity:** Core schemas must be expressible in YAML (preferred for authored assets) and JSON (for interoperability) without loss of fidelity.

## System Overview

```mermaid
diagram TD
    Package[Package]
    Namespace[Namespace]
    Rulebook[Rulebook]
    PromptSection[Prompt Section]
    Ontology[Ontology]
    Morpher[Morpher]
    SeparatorSet[Separator Set]

    Package --> Namespace
    Package --> Rulebook
    Namespace --> PromptSection
    Namespace --> Ontology
    Namespace --> Morpher
    Namespace --> SeparatorSet
    PromptSection --> PromptSection
    Rulebook --> PromptSection
```

## Domain Model

### Packages

- Contain one or more namespaces.
- Provide metadata (name, version, authors, compliance tier assertions).
- Declare dependencies on other packages with semantic version constraints.
- Include manifests for datatypes, ontologies, prompt sections, morphers, separator sets, and rulebooks.

### Namespaces

- Provide a logical path for addressing assets (e.g., `core.characters.hero`).
- Allow referencing assets in other namespaces via fully qualified identifiers.
- Support multiple namespaces per package with isolated defaults.

### Datatypes

- Define primitive types (string, integer, date) and complex compositions (records, arrays, enumerations).
- Support validation rules (ranges, patterns) and deterministic serialization hints.

### Prompt Sections

- Contain templates written in a deterministic templating language.
- May reference other prompt sections (`include` or `slot` semantics).
- Express conditional logic and iteration controlled by deterministic evaluation of inputs and seeded randomness.

### Ontologies

- Provide language- and domain-specific vocabularies.
- Support localization and morphological data (gender, plurality, tense).
- Offer deterministic lookup functions keyed by identifiers and optional filters.

### Separator Sets

- Define textual separators for joining lists with grammatically appropriate conjunctions.
- Support locale-specific patterns such as Oxford commas or language-specific conjunction rules.

### Morphers

- Transform text deterministically (pluralization, conjugation, casing, transliteration).
- Allow chaining of transformations and reference ontological metadata for decisions.

### Rulebooks

- Enumerate entry-point prompt sections to render.
- Define selection policies (deterministic sequences, seed-derived choices).
- Manage state across nested prompt section executions.

## Package Manifest

Packages include a manifest file (primary: `package.yaml`, secondary: `package.json`) describing:

- Metadata: name, version, authors, license, description.
- Compliance: self-declared tier, validator signature.
- Dependencies: list of package identifiers with semantic version ranges.
- Assets: enumerations of namespaces, datatypes, ontologies, prompt sections, morphers, separator sets, rulebooks.
- Determinism: seed handling policy, UUID derivation strategy, timestamp usage declarations.
- Contracts: required and provided ontology/morpher contracts for marketplace validation.

### Serialization Requirements

- YAML is the canonical authoring format and must serialize deterministically (sorted keys, explicit anchors when used).
- JSON representations are derived mechanically from the YAML source to aid tooling and CI integrations.
- Both formats share a single schema definition (e.g., JSON Schema) to guarantee parity.

### Tooling Expectations

- Tier 1 compliant implementations expose a CLI that can lint manifests, convert between YAML and JSON, and surface schema errors.
- Higher tiers may add GUI workflows, but the CLI must remain the source of truth for CI/CD automation.

## Compliance Tiers

| Tier                                      | Scope                                         | Requirements                                                                                                                       |
| ----------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Tier 1 — Standalone Renderer**          | Implementations without marketplace features. | Deterministic rendering, manifest compliance, validator integration, seed control API.                                             |
| **Tier 2 — Authoring & Validation Suite** | End-to-end authoring + validation workflows.  | All Tier 1 requirements plus authoring exports, ontology editing, deterministic packaging.                                         |
| **Tier 3 — Reference Implementation**     | Full ecosystem including marketplace.         | All Tier 1 and 2 requirements plus package registry, distribution APIs, compliance badge publication, security & integrity checks. |

Compliance reports must detail which requirements are met, provide validator signatures, and highlight deviations.

## Rendering Determinism

Rendering sessions follow these rules:

1. Seed is derived from user input or package defaults and logged for reproducibility.
2. All calls to random number generation, UUID creation, or timestamp retrieval must be seeded or derived deterministically from the root seed.
3. Template execution state (loop counters, condition results) must be deterministic given inputs and seed.
4. Outputs include metadata referencing the package version, rulebook entry, and seed used.

## Roadmap to v1.0.0-rc1

1. **Finalize Manifest Schema:** Define JSON Schema for package manifests and namespace contents.
2. **Authoring Tool Prototype:** Build CLI/GUI for composing packages, ontologies, and prompt sections.
3. **Validator Implementation:** Provide open-source validator capable of verifying compliance tiers.
4. **Rendering Engine PoC:** Implement deterministic renderer supporting seed management, morphers, and separator sets.
5. **Marketplace Blueprint:** Describe service interfaces for publishing and retrieving packages with integrity guarantees.

## Open Issues

- Clarify how ontologies support multilingual fallbacks and dialect variants.
- Determine test fixture format for verifying deterministic rendering across implementations.
- Explore integration points for analytics or usage tracking without compromising determinism.
- Define governance model for approving new asset types or schema changes.

## References

- Deterministic random generation techniques
- Localization frameworks for morphological analysis
- Package registry best practices (e.g., npm, crates.io)
