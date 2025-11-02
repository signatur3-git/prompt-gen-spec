# Understanding Template Syntax in the Random Prompt Generator

## Introduction

The Random Prompt Generator is a powerful, modular tool for creating dynamic and randomized text prompts, commonly used in creative writing, AI interactions, or procedural content generation. At its core lies the **promptsection**, which defines reusable templates that drive the rendering process. These templates are where the magic happens: they combine static text with dynamic references to datatypes, other promptsections, context interactions, and more.

This article dives deep into the template syntax, explaining how to construct templates that are flexible, context-aware, and capable of producing varied outputs. We'll cover the basics, advanced features like repetition and separators, context integration, and best practices. By the end, you'll understand how package authors can craft sophisticated prompts with minimal hardcoded logic.

Whether you're a package author building namespaces like `featured.common` or a user mixing components from various packages, mastering template syntax is key to unlocking the system's potential.

## The Basics of Template Structure

A template is a string defined within a promptsection (a namespaced component in a package). It consists of:

- **Static Text**: Plain strings that appear verbatim in the output, e.g., "The quick brown fox".
- **Dynamic References**: Enclosed in curly braces `{}`. These are placeholders that the render engine replaces with rendered content during prompt generation.

The engine processes templates from left to right, resolving references sequentially. This order is crucial for context interactions, as it allows upstream elements to influence downstream ones.

### Simple References

The most basic dynamic element is a reference to a datatype or another promptsection.

- **Datatype Reference**: `{namespace:datatype_name}`
    - Example: `{featured.common:animal}`
    - Behavior: Selects a random value from the datatype's datalist. If the value has tags (e.g., `article: a`, `gender: neutral`), they can be used in context contributions.
    - Optional Filters: Append query-like parameters for selection, e.g., `{featured.common:animal?tag=mood:cheerful}` to filter by tags.

- **Promptsection Reference**: `{namespace:promptsection_name}`
    - Example: `{story.elements:character_description}`
    - Behavior: Renders the referenced promptsection's template recursively. This allows nesting for complex structures.

References resolve via the package's dependencies if the namespace is external.

## Repetition and Separators

To generate lists or repeated elements, references can include **min/max** specifications for how many times to render the item.

- **Syntax**: `{ref?min=X,max=Y}`
    - `min` and `max` are integers (min <= max).
    - If omitted, defaults to min=1, max=1 (single instance).
    - Example: `{featured.common:adjective?min=1,max=3}`
    - Behavior: Renders the reference a random number of times between min and max, inclusive.

Repeated items are concatenated using a **separatorset**, which handles grammatical list formatting (e.g., Oxford comma style).

- **Separatorset Reference**: Append `sep=namespace:separatorset_name` to the reference.
    - Example: `{featured.common:animal?min=2,max=5&sep=featured.common:comma_and}`
    - A separatorset defines three separators:
        - Primary (for most joins, e.g., ", ").
        - Secondary (for the last pair if exactly two items, e.g., " and ").
        - Tertiary (for the last item in lists of 3+, e.g., ", and ").
    - If no sep specified, a default (e.g., simple space) is used.
    - Behavior: For 1 item: no separator. For 2: secondary. For 3+: primary between all but last, then tertiary.

This ensures natural language output, like "red, blue, and green" instead of rigid concatenation.

## Context Interactions

Templates aren't just passive; they can actively engage with the **rendering context**—a shared, scoped store for dynamic data. This enables behaviors like article selection or gender agreement without hardcoding.

Context operations use function-like syntax within `{}`:

- **Get a Value**: `{context.get(namespace:key.<scope>)}`
    - Example: `{context.get(featured.common:article_choice.<prompt>)}`
    - Returns the value or a default (e.g., empty string) if unset.
    - Scope defaults to `.prompt` if omitted.

- **Set a Value**: `{context.set(namespace:key.<scope>, value)}`
    - Example: `{context.set(featured.common:mood.<section.id>, cheerful)}`
    - `value` can be a literal, another reference, or expression.
    - Note: Setting happens immediately, affecting downstream rendering.

- **Request a Contribution**: `{context.request(namespace:key.<scope>)}`
    - Example: `{context.request(featured.common:article_requested.<scope>)}`
    - Sets a flag (usually to true) to signal that downstream components should contribute (based on ContextInterfaces).

- **Check Existence**: `{context.has(namespace:key.<scope>)}`
    - Returns true/false; useful in conditionals (see below).

- **Random Selection**: `{context.random(namespace:key.<scope>, options)}`
    - Example: `{context.random(featured.common:pool.characters, count=2)}`
    - `options` can be a list, range, or pool reference.

These operations tie into **ContextInterfaces**, which define rules for how components react to requests. For instance, a template might request an article, and a subsequent noun reference (tagged as an "article_provider") will set it based on its tags.

### Scopes in Context

Scopes prevent conflicts in nested or repeated sections:

- `.global`: Batch-wide.
- `.prompt`: Prompt-wide (default).
- `.section.<id>`: Per-section instance.
- Custom: e.g., `.character.protagonist`.

Reads fallback up the hierarchy if unset.

## Advanced Expressions and Conditionals

For more logic, templates support simple expressions and if-else constructs.

- **Expressions**: Within `{}`, use basic ops like `+`, `-`, or string concat.
    - Example: `{featured.common:count + 1}` (assuming count is numeric).

- **Conditionals**: `{if condition ? true_value : false_value}`
    - Condition: An expression like `context.has(key)`.
    - Example: `{if context.has(featured.common:gender_choice) ? context.get(featured.common:gender_choice) : neutral}`
    - Nested conditionals are allowed but keep them simple for readability.

- **Pools**: Collect items for later random draws.
    - Add: `{context.set(pool_namespace:pool_name.<scope>, append({ref}))}`
    - Draw: `{context.random(pool_namespace:pool_name.<scope>, min=1,max=3&sep=sep_ref)}`

Pools are lists in the context, enabling aggregation from multiple sources.

## Integration with Other Components

Templates don't exist in isolation:

- **Rulebooks**: Select entry promptsections (weighted) to start rendering.
- **Datatypes**: Provide raw, tagged data. Tags fuel contributions (e.g., a noun with `article: an`).
- **ContextInterfaces**: Define keys and rules declaratively. Templates reference keys; the engine applies rules during rendering.

For example, in `featured.common`, an interface might define article logic, allowing authors to extend it for languages with gendered articles.

## Best Practices and Examples

### Best Practices
- **Keep It Modular**: Break complex templates into sub-promptsections for reuse.
- **Minimize Hardcoding**: Use context and tags for decisions like articles or moods.
- **Test Rendering**: Simulate with small min/max to verify output.
- **Handle Edge Cases**: Use defaults in conditionals for unset context.
- **Performance**: Avoid deep nesting or large min/max in hot paths.

### Example: Simple Descriptive Phrase
Template: "A {featured.common:adjective} {featured.common:noun}."

- Output: "A fluffy cat." (Random selections).

### Example: List with Articles
Template: "{context.request(featured.common:article_requested.<prompt>)} {featured.common:adjective?min=1,max=2&sep=featured.common:comma} {featured.common:noun}."

- Behavior: Requests article; noun contributes based on interface.
- Output: "An exciting, mysterious adventure."

### Example: Context-Driven Story Snippet
Template: "The {context.get(featured.common:protagonist_gender)} hero {if context.has(featured.common:mood) ? is {context.get(featured.common:mood)} : } embarks on a journey with {featured.common:companion?min=1,max=3&sep=featured.common:and_list}."

- Assumes upstream set gender/mood.
- Output: "The female hero is cheerful embarks on a journey with a dragon, a wizard, and a knight."

## Complete BNF Grammar for Template Syntax

```ebnf
<template>          ::= <segment>*

<segment>           ::= <text> | <expression>

<text>              ::= any character sequence not containing '{' or '}' 
                        (or escaped with '\{', '\}')

<expression>        ::= '{' <expr_body> '}'

<expr_body>         ::= <reference>
                      | <context_op>
                      | <conditional>
                      | <random_expr>
                      | <literal>

<!-- References -->
<reference>         ::= <ref_target> <ref_params>?

<ref_target>        ::= <ns_path> ':' <identifier>

<ns_path>           ::= <identifier> ('.' <identifier>)*

<ref_params>        ::= '?' <param_list>
<param_list>        ::= <param> ('&' <param>)*
<param>             ::= 'min=' <integer>
                      | 'max=' <integer>
                      | 'sep=' <ref_target>
                      | 'tag=' <tag_filter>
                      | <custom_param>   <!-- extensible -->

<tag_filter>        ::= <identifier> ':' <value>

<!-- Context Operations -->
<context_op>        ::= 'context.' <ctx_method> '(' <ctx_args> ')'
<ctx_method>        ::= 'get' | 'set' | 'has' | 'request' | 'random'
<ctx_args>          ::= <ctx_arg> (',' <ctx_arg>)*
<ctx_arg>           ::= <string_literal>
                      | <ref_target>
                      | <expression>
                      | <scope_ref>

<scope_ref>         ::= '.' <scope_name>
<scope_name>        ::= 'global' | 'prompt' | 'section.' <id> | <custom_scope>
<custom_scope>      ::= <identifier> ('.' <identifier>)*

<!-- Conditional -->
<conditional>       ::= 'if' <ws> <condition> <ws> '?' <ws> <expr_body> <ws> ':' <ws> <expr_body>
<condition>         ::= <context_op> | <comparison> | <boolean_literal>

<!-- Random (standalone or context) -->
<random_expr>       ::= 'context.random' '(' <ctx_arg> (',' <random_options>)? ')'
<random_options>    ::= 'count=' <range> | 'min=' <integer> ',' 'max=' <integer>

<!-- Literals -->
<literal>           ::= <string_literal> | <integer> | <float> | <boolean_literal>
<string_literal>    ::= '"' ([^"] | '\"')* '"' | "'" ([^'] | "\'")* "'"
<integer>           ::= [0-9]+
<float>             ::= [0-9]+ '.' [0-9]+
<boolean_literal>   ::= 'true' | 'false'

<!-- Identifiers & Whitespace -->
<identifier>        ::= [a-zA-Z_][a-zA-Z0-9_]*
<ws>                ::= [ \t\n\r]*
```

---

## Syntax Diagram Readiness: Assessment

| Aspect                     | Status        | Notes |
|---------------------------|---------------|-------|
| **Lexical rules**          | Complete   | Text, `{`, `}`, escaping, identifiers, literals |
| **Expression delimiters**  | Complete   | `{ … }` |
| **Reference syntax**       | Complete   | `ns:path:name?min=1&max=3&sep=ns:sep` |
| **Context functions**      | Complete   | `context.get()`, `set()`, `has()`, `request()`, `random()` |
| **Scopes**                 | Complete   | `.prompt`, `.section.id`, custom |
| **Repetition & separators**| Complete   | `min`, `max`, `sep=` |
| **Conditionals**           | Complete   | `if cond ? true : false` |
| **Pools & random draw**    | Complete   | via `context.random(pool, ...)` |
| **Extensibility**          | Complete   | Custom params, scopes, tags |
| **Escaping**               | Complete   | `\{`, `\}` in text |

---

## Example: Valid Template

```text
The {context.request(featured.common:article_requested.<prompt>)} 
{featured.common:adjective?min=1,max=2&sep=featured.common:comma} 
{featured.common:noun} 
{if context.has(featured.common:mood.<prompt>) ? is {context.get(featured.common:mood.<prompt>)} : }.
```

This parses **unambiguously** under the grammar.

---

## Tools to Generate the Diagram

1. **Copy the BNF above** into:
    - https://bottlecaps.de/rr/ui
    - https://tabatkins.github.io/railroad-diagrams/
2. Select `<template>` as the start rule.
3. Generate — you’ll get a full **interactive syntax diagram**.

---

## Optional Enhancements (Not Required for Diagram)

These are **semantic**, not **syntactic**, and do *not* affect diagram completeness:

- Validation of `min <= max`
- Semantic meaning of `context.request()` (sets flag vs returns value)
- Runtime scope ID generation (`section.<id>`)
- Interface-based contribution rules (handled outside parser)

These belong in the **semantic analyzer**, not the parser.
