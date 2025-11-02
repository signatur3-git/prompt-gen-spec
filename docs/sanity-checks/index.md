# Sanity Check Scenarios

These sanity checks exercise edge cases and integration pathways for the Composite Random Prompt Generator (CRPG) specification. They help validate whether the emerging models for packages, ontologies, rulebooks, and renderers can support practical authoring concerns before hardening the RFC text.

Each scenario outlines:

- **Context** – Why the scenario matters for end users.
- **Artifacts** – Suggested package assets (e.g., ontologies, prompt sections, data tables) and preferred serialization format.
- **Expected Behaviors** – Deterministic outcomes and compliance hooks the platform must satisfy.
- **Open Questions** – Follow-up design work or specification gaps revealed by the scenario.

## SC-001: Article Agreement with Optional Modifiers

**Context**

Authors must avoid hard-coding language heuristics like "article selectors" while retaining natural sounding prompts regardless of optional adjectives or adverbs. The rendering engine should defer to ontology-defined rules that examine scoped context such as lexical categories and phonetics.

**Artifacts**

- Ontology: `ontologies/en/articles.yaml` defining determiners with rules that consult:
  - Lexeme metadata for vowel/consonant onset.
  - Optional modifier tags (e.g., `adjective.starts_with_vowel=true`).
  - Scoped context store entries for synthesized phrases.
- Prompt Section: `prompt_sections/creature-intro.yaml` referencing the ontology contract `contracts.language.articles` and emitting templates like:
  - `{{ article(determine=subject.phrase) }} {{ subject.phrase }}`
  - Optional modifiers `{{ maybe(adverb) }}` or `{{ maybe(adjective) }}` contribute tags back into the context store.
- Sample Data: `data/creatures.yaml` with nouns and optional descriptors tagged with phonetic hints.
- Serialization: YAML canonical form; provide a JSON mirror for tooling compatibility tests.

```yaml
# prompt_sections/creature-intro.yaml
id: prompt_sections.creature_intro
requires:
  - contracts.language.articles
slots:
  subject: data.creatures
template: |
  {{ article(determine=context.subject.phrase) }}{{ maybe(' ') }}{{ context.subject.phrase }}
  {{ maybe(context.subject.adverb) }}{{ maybe(' ') }}{{ maybe(context.subject.adjective) }}
context:
  emit:
    - key: subject.phrase
      value: "{{ context.subject.phrase }}"
    - key: subject.modifiers
      value:
        starts_with_vowel: "{{ context.subject.starts_with_vowel }}"
```

```json
{
  "id": "prompt_sections.creature_intro",
  "requires": ["contracts.language.articles"],
  "slots": {
    "subject": "data.creatures"
  },
  "template": "{{ article(determine=context.subject.phrase) }}{{ maybe(' ') }}{{ context.subject.phrase }} {{ maybe(context.subject.adverb) }} {{ maybe(context.subject.adjective) }}",
  "context": {
    "emit": [
      {
        "key": "subject.phrase",
        "value": "{{ context.subject.phrase }}"
      },
      {
        "key": "subject.modifiers",
        "value": {
          "starts_with_vowel": "{{ context.subject.starts_with_vowel }}"
        }
      }
    ]
  }
}
```

**Expected Behaviors**

- Renderer chooses `a` vs `an` based solely on ontology rules triggered by context tags.
- Optional modifiers update scoped context before the article is resolved.
- CLI validator flags missing ontology contracts when prompt sections reference them without declaring dependencies.

**Open Questions**

- How should ontologies declare their exported contracts for marketplace discovery?
- Can the context store expose both read/write hooks in a single deterministic lifecycle stage?

## SC-002: Marketplace Contract Wiring

**Context**

Marketplace consumers must see which ontologies and morphers satisfy contracts that prompt sections require. Package manifests should document dependencies declaratively so validation can be automated.

**Artifacts**

- Package Manifest: `package.yaml` (YAML primary, JSON secondary) enumerating namespaces, dependencies, and exported contracts.
- Ontology: `ontologies/en/core.yaml` advertising contracts `contracts.language.articles` and `contracts.language.number`.
- Rulebook: `rulebooks/adventure.yaml` listing entry prompt sections and contract requirements.

**Expected Behaviors**

- Package validator ensures each required contract has a satisfying provider before publication.
- Marketplace UI (or API) renders a dependency graph showing which packages/ontologies fulfill contracts.
- CLI workflows can lint manifests and simulate marketplace checks without a GUI.

**Open Questions**

- Should contract IDs follow a URI scheme (`crpg://language/articles`) to avoid collisions?
- How can we express optional vs required contracts in manifests?

## SC-003: Uniqueness Guarantees in Selections

**Context**

Prompts often require unique draws from a finite set (e.g., "list three distinct animals"). Determinism must be preserved while respecting uniqueness constraints across nested prompt sections.

**Artifacts**

- Data Table: `data/animals.yaml` with exactly three animals and uniqueness tags.
- Prompt Section: `prompt_sections/animal-trio.yaml` using a deterministic pseudo-random sequence seeded per render, with a `unique=true` flag in selection metadata.
- Separator Set: `separator_sets/oxford-comma.yaml` modeling comma, separator-two-elements, and separator-last cases for natural language lists.

**Expected Behaviors**

- Renderer tracks previously emitted values within the current scoped context and prevents duplicates when `unique=true`.
- If the available pool is smaller than the requested unique count, validator raises a compile-time error instead of failing at render time.
- Namespace rules allow referencing separator sets defined in dependencies while preserving deterministic ordering.

**Open Questions**

- Do uniqueness scopes reset per prompt section invocation or per render root?
- How do we expose deterministic failure messages so CI can catch underspecified datasets?

## SC-004: Multilingual Ontology Hand-off

**Context**

Packages may combine namespaces across languages. Prompt authors should mix ontologies (e.g., base nouns in English with morphology rules from French) when localizing content.

**Artifacts**

- Namespaces: `namespaces/en.yaml` and `namespaces/fr.yaml` referencing shared ontologies.
- Ontologies: `ontologies/fr/articles.yaml`, `ontologies/en/nouns.yaml` with contract compatibility metadata.
- Prompt Section: `prompt_sections/bilingual-intro.yaml` switching ontologies mid-render via scoped context updates.

**Expected Behaviors**

- Renderer handles ontology transitions deterministically with explicit context commits.
- Validator confirms multilingual prompts declare compatible ontologies before publication.
- Marketplace surfaces cross-language contract compatibility metadata for discoverability.

**Open Questions**

- Should ontology contracts declare locale fallbacks?
- What mechanisms expose translation completeness metrics to the marketplace?

## SC-005: Temporal Seeds and System Randomness

**Context**

Only minimal random sources (number, UUID, datetime) are provided by the system. Authors need deterministic seed derivation so that rerenders with the same seed produce identical prompts.

**Artifacts**

- Rulebook: `rulebooks/daily-quest.yaml` deriving seeds from `date` plus user ID.
- CLI Scenario: `cli/examples/daily-quest.sh` demonstrating deterministic CLI invocation with explicit seed.

**Expected Behaviors**

- Renderer exposes CLI flags to supply seed, date override, and UUID sequence for deterministic replay.
- Package validator ensures rulebooks document their seed derivation expectations.
- Marketplace describes which packages rely on system randomness vs author-provided determinism.

**Open Questions**

- How are seeds recorded for audit trails in production marketplaces?
- Can render logs embed the minimal random values for debugging while preserving privacy?

## Additional Candidate Scenarios

- **SC-006: Contextual Pronoun Resolution** – Test pronoun agreement and gender tagging using ontology rules.
- **SC-007: Conditional Morphers for Pluralization** – Ensure morphers can conjugate verbs and adjust determiners when counts vary.
- **SC-008: Nested Prompt Sections with Shared Context** – Validate deterministic context merging when prompt sections recursively invoke each other.

These scenarios provide a baseline backlog for validating the specification as we iterate on the RFC and supporting documentation.
