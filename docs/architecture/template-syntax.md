---
title: Template Syntax
---

# Template Syntax

Promptsections define the reusable templates that drive RPG rendering. This guide captures the v1.0.0.rc1 grammar, expressions, and best practices required for deterministic implementations.

## Fundamentals

A template mixes static text with dynamic expressions enclosed in `{}`. The rendering engine evaluates expressions from left to right so earlier segments can influence downstream context.

### References

- **Datatype:** `{namespace:datatype}`
  - Optional filters or parameters use query syntax: `{namespace:datatype?tag=mood:cheerful}`.
- **PromptSection:** `{namespace:promptsection}`
  - Renders the referenced template recursively.

Both forms accept `min`/`max` repetition parameters and `sep` for list formatting:

```text
{featured.common:adjective?min=1,max=3&sep=featured.common:comma_and}
```

## Repetition & Separators

- `min` and `max` define inclusive bounds for how many times to render the reference.
- When repeated, the engine uses the specified separatorset (primary, secondary, tertiary) to join items grammatically.
- Defaults fall back to a space if no separatorset is provided.

## Context Operations

Templates use `context.*` helpers to coordinate with the rendering context:

- `context.request(key)` – marks a key as needed (e.g., request an article).
- `context.get(key)` – retrieves a value with fallback up the scope hierarchy.
- `context.set(key, value)` – writes a value immediately.
- `context.has(key)` – checks presence.
- `context.random(key, options)` – deterministic draw, optionally storing the result.

Keys include optional scopes (`namespace:key.<scope>`). When omitted, `.prompt` is assumed.

## Conditionals & Expressions

- **Conditional:** `{if condition ? true_expr : false_expr}`
  - Conditions can call `context.has`, compare literals, or inspect tags.
- **Arithmetic/String Expressions:** Simple operations (addition, concatenation) are supported for convenience but must remain deterministic.

## Pools

Pools collect rendered fragments for later reuse.

```text
{context.set(featured.common:pool.characters.<prompt>, append({story.cast:character}))}
...
{context.random(featured.common:pool.characters.<prompt>, min=2,max=3&sep=featured.common:comma_and)}
```

Validators enforce pool constraints (e.g., uniqueness) and raise deterministic errors when requirements cannot be satisfied.

## Complete Grammar (EBNF)

```ebnf
<template>          ::= <segment>*
<segment>           ::= <text> | <expression>
<text>              ::= any character sequence without unescaped '{' or '}'
<expression>        ::= '{' <expr_body> '}'
<expr_body>         ::= <reference> | <context_op> | <conditional> | <literal>

<reference>         ::= <ref_target> <ref_params>?
<ref_target>        ::= <ns_path> ':' <identifier>
<ns_path>           ::= <identifier> ('.' <identifier>)*
<ref_params>        ::= '?' <param_list>
<param_list>        ::= <param> ('&' <param>)*
<param>             ::= 'min=' <integer>
                      | 'max=' <integer>
                      | 'sep=' <ref_target>
                      | 'tag=' <tag_filter>
                      | <custom_param>
<tag_filter>        ::= <identifier> ':' <value>

<context_op>        ::= 'context.' <ctx_method> '(' <ctx_args>? ')'
<ctx_method>        ::= 'get' | 'set' | 'has' | 'request' | 'random'
<ctx_args>          ::= <ctx_arg> (',' <ctx_arg>)*
<ctx_arg>           ::= <string_literal> | <ref_target> | <expression> | <scope_ref>
<scope_ref>         ::= '.' <scope_name>
<scope_name>        ::= 'global' | 'prompt' | 'section.' <identifier> | <custom_scope>

<conditional>       ::= 'if' <ws> <condition> <ws> '?' <ws> <expr_body> <ws> ':' <ws> <expr_body>
<condition>         ::= <context_op> | <comparison> | <boolean_literal>
<comparison>        ::= <expression> <comp_op> <expression>
<comp_op>           ::= '==' | '!=' | '<' | '>' | '<=' | '>='

<literal>           ::= <string_literal> | <integer> | <float> | <boolean_literal>
<string_literal>    ::= '"' ([^"] | '\"')* '"' | "'" ([^'] | "\'")* "'"
<integer>           ::= [0-9]+
<float>             ::= [0-9]+ '.' [0-9]+
<boolean_literal>   ::= 'true' | 'false'

<identifier>        ::= [a-zA-Z_][a-zA-Z0-9_]*
<custom_param>      ::= <identifier> '=' <value>
<value>             ::= <identifier> | <string_literal> | <integer>
<ws>                ::= [ \t\n\r]*
```

The grammar focuses on syntax. Semantic rules—such as `min <= max` or validating pool capacities—belong to validators and runtime checks.

## Best Practices

- Break complex templates into smaller promptsections for reuse and testing.
- Document required ContextInterfaces in the package manifest.
- Provide deterministic seeds and sample outputs for sanity checks.
- Avoid deep recursion or unbounded repetitions that harm performance.
- Escape literal braces with `\{` and `\}`.

## Example Template

```text
The {context.request(featured.common:article_requested.<prompt>)}
{featured.common:adjective?min=1,max=2&sep=featured.common:comma}
{featured.common:noun}
{if context.has(featured.common:mood.<prompt>) ? is {context.get(featured.common:mood.<prompt>)} : }.
```

This example highlights request/contribution flow, repetition with separators, and conditional context usage.
