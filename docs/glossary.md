---
title: Glossary
---

# Glossary

| Term | Definition |
| --- | --- |
| **Authoring Tool** | IDE or CLI for creating packages, namespaces, and component assets with deterministic exports. |
| **ContextInterface** | Namespaced declaration of context keys, request flags, contributions, and validators that coordinate component behaviour during rendering. |
| **Datatype** | Namespaced dataset whose values may carry tags used for filtering or context contributions. |
| **Deterministic Rendering** | Guarantee that identical seeds, inputs, and packages yield identical outputs across compliant engines. |
| **Library Package** | Canonical namespace bundle (e.g., `featured.common`) distributed for reuse across implementations. |
| **Marketplace** | Registry service that stores packages, dependency metadata, compliance badges, and provenance signatures. |
| **Morpher** | Deterministic transformation rules (pluralisation, conjugation, casing) applied during rendering using context and tags. |
| **Namespace** | Logical grouping of assets inside a package, addressed via `namespace:component`. |
| **Package** | Distribution unit containing manifests, namespaces, component definitions, dependencies, and compliance assertions. |
| **Package Validator** | Tooling that enforces schemas, semantics, determinism, and compliance tiers before publication. |
| **PromptSection** | Template-driven component combining static text with expressions, references, and context operations. |
| **Rendering Engine** | Service or library that executes rulebooks, resolves templates, manages context, and produces deterministic prompts. |
| **Rulebook** | Namespaced configuration listing weighted entry promptsections, batch settings, and required interfaces. |
| **SeparatorSet** | Namespaced definition of primary, secondary, and tertiary separators for grammatical list formatting. |
