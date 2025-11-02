---
title: Context Interactions
---

# Context Interactions

The rendering context is the backbone of the Random Prompt Generator (RPG). It allows loosely coupled components—datatypes, promptsections, morphers, and pools—to coordinate without hardcoded logic. This document formalises the context lifecycle, ContextInterface format, and contribution patterns introduced in RFC v1.0.0.rc1.

## Rendering Context Overview

- **Namespaced Keys:** All entries are prefixed with a namespace (`featured.common:article_choice`). Namespaces prevent collisions across packages.
- **Scopes:** Keys may include scope suffixes to control visibility.
  - `.global` – shared across a batch (e.g., rulebook-wide state).
  - `.prompt` – default scope for a single prompt render.
  - `.section.<id>` – auto-generated per promptsection invocation.
  - Custom scopes (e.g., `.character.protagonist`) are permitted. Reads fall back up the hierarchy until a value is found.
- **Data Types:** Values are primitives, lists, or maps. Template helpers support appending to lists and merging maps deterministically.
- **Accessors:**
  - `context.get(key)` – returns a value or null.
  - `context.set(key, value)` – writes a value immediately.
  - `context.has(key)` – boolean existence check.
  - `context.request(key)` – flags that a value is required downstream.
  - `context.random(key, options)` – deterministic random draw, optionally storing results at `key`.
- **Lifecycle:** Context initialises empty per prompt, mutates during rendering, and is discarded after the prompt is produced unless the rulebook specifies persistence.

## ContextInterfaces

ContextInterfaces declare how packages expect to read and contribute context values. They are serialised inside namespaces alongside other assets.

### Structure

```yaml
namespace: featured.common
keys:
  article_requested:
    type: boolean
    default: false
    description: Flag indicating an article is needed for the current scope.
  article_choice:
    type: string
    description: Selected article (e.g., "a", "an", "the").
    request_key: article_requested
contributions:
  - condition: context.get('featured.common:article_requested.<scope>') == true && !context.has('featured.common:article_choice.<scope>')
    action: context.set('featured.common:article_choice.<scope>', random_choice(component.tags['article']))
    applies_to: datatype[tag=article_provider]
    priority: 10
validators:
  article_choice: value in ['a', 'an', 'the']
```

- **Namespace:** Owner of the interface.
- **Keys:** Map of key definitions with type, optional default, description, and optional `request_key` relationship.
- **Contributions:** Ordered list of rules. Each rule evaluates a `condition` and, when true, executes an `action`. An optional `priority` overrides render order.
- **Validators:** Optional expressions run after a key is set. Violations raise deterministic errors during validation or rendering.

### Resolution Flow

1. A template issues `context.request('featured.common:article_requested.<scope>')`.
2. Later in the same scope, a datatype tagged `article_provider` renders.
3. The rendering engine evaluates contributions from relevant ContextInterfaces. The first rule whose condition passes sets `article_choice`.
4. Downstream templates call `context.get('featured.common:article_choice.<scope>')` to insert the article.
5. Additional contributions skip once the key is populated, preserving deterministic behaviour.

### Extensibility

- Interfaces can be extended by dependencies using additive merges (new keys, contributions, or validators).
- Packages must declare required interfaces in their manifests so validators can ensure providers are available.
- Pools are treated as context keys with list semantics (e.g., `featured.common:pool.characters.<scope>`), enabling shared patterns for aggregation and random draws.

## Interaction Patterns

### Article & Gender Agreement

- Promptsections request `article_requested` or `gender_requested`.
- Datatypes tagged with article or gender data contribute values based on tags (e.g., vowel onset or grammatical gender).
- Morphers consult the resulting context keys to adjust downstream text.

### Pool Collection & Random Draws

- Templates append rendered fragments to pool keys via `context.set(pool_key, append(value))`.
- Later references call `context.random(pool_key, min=1,max=3&sep=namespace:sep)` to draw unique or repeated entries.
- Validators ensure pool definitions declare whether duplicates are allowed and what happens when insufficient items exist.

### Scoped State in Nested Sections

- Each promptsection invocation receives a deterministic `.section.<id>` scope.
- Keys set within that scope are isolated from siblings but fall back to `.prompt` when read.
- Custom scopes (e.g., `.character.sidekick`) enable targeted coordination across disparate sections.

## Error Handling

- Missing required values trigger validator warnings or render-time errors, depending on severity declared in the ContextInterface.
- Invalid contributions (violating validators) halt rendering with deterministic messages, including seed, scope, and offending key.
- Implementations should surface context snapshots in debug mode to aid reproducibility.

## Best Practices

- Prefer declarative contributions over imperative code to keep logic portable across implementations.
- Document scope usage in package manifests so consumers understand lifecycle expectations.
- Use priorities sparingly; favour render order for predictability.
- Provide defaults when context absence is acceptable, and ensure validators match locale and linguistic assumptions.
