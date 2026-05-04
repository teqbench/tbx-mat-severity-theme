---
tagline: Foundation package for severity theming in [Angular Material ↗](https://material.angular.dev) projects. Ships a six-tier severity enum (`default`, `success`, `error`, `warning`, `information`, `help`) and resolver contract, abstract font-icon and SVG-icon base classes built on [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons), default icon sets (SVG markup and [Material Symbols ↗](https://fonts.google.com/icons) ligatures), shared SCSS color tokens with invert support, and an [Angular ↗](https://angular.dev) DI config token plus provider helper — consumed by `@teqbench/tbx-mat-notifications`, `@teqbench/tbx-mat-banners`, `@teqbench/tbx-mat-dialogs`, and any future severity-leveled UI packages.
---

## Overview

`@teqbench/tbx-mat-severity-theme` centralizes the shared vocabulary, visuals, and runtime wiring that every `@teqbench` severity-leveled [Angular Material ↗](https://material.angular.dev) package uses to classify and present messages. Rather than each package re-declaring its own severity enum, color palette, default icons, and invert flag, this foundation package owns them once and the consumer packages depend on it.

It provides four layers:

- **Severity contract and enum** — `TbxMatSeverityLevel` (six tiers) and `TbxMatSeverityResolver` (the six-method contract any severity-aware icon service implements).
- **Abstract icon service bases** — `TbxMatSeverityFontIconService` and `TbxMatSeveritySvgIconService` extend the abstract strategies from [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) and implement the resolver contract. Downstream packages subclass one and override `initialize()` to register icon mappings.
- **Default icon sets** — `TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS` (inline SVG markup per level) and `TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES` ([Material Symbols ↗](https://fonts.google.com/icons) ligature names per level). Consumers pick them up via `initialize()` rather than re-declaring the same icon data in each package.
- **Shared theme layer** — an SCSS partial defining neutral `--tbx-mat-severity-<level>-<background|text>` tokens and a `.tbx-mat-severity-inverted` class that swaps them, plus a `TBX_MAT_SEVERITY_THEME_CONFIG` DI token and `provideTbxMatSeverityTheme()` helper that wires the invert flag into the application at bootstrap.

### Why six severity tiers, not five

The contract includes a `default` method alongside the four classic severities (`success`, `error`, `warning`, `information`) plus `help`. `default` represents "no severity classification" — a message shown with neutral styling when the application doesn't want to assert that it's conveying success, error, etc. Downstream packages surface this as a `default()` method on their service (e.g. `TbxMatBannerService.default(message)`) so the caller doesn't have to pick a severity they don't mean.

### Typed-enum/method agreement

The `TbxMatSeverityLevel` enum's string values exactly match the method names on `TbxMatSeverityResolver`:

- `TbxMatSeverityLevel.Default` → `'default'` → `resolver.default()`
- `TbxMatSeverityLevel.Success` → `'success'` → `resolver.success()`
- ...and so on.

This intentional redundancy lets consumers pick whichever idiom fits their call site: `service.resolve(TbxMatSeverityLevel.Warning)` when they already have an enum value, or `service.warning()` when they know the severity at write time.

## When to use

Use `@teqbench/tbx-mat-severity-theme` when:

- Building a component or service in the `@teqbench` family that needs severity-leveled icons or colors — banner, notification, dialog, toast, or any message surface where success/error/warning/etc. distinctions matter.
- Building an application that wants to invert severity colors globally (white backgrounds, colored text) or scoped to part of the UI.
- Building an application that wants to expose its own custom icon choices for the same six severities (e.g. a themed brand variant).

Do not use it for:

- **Non-severity icon domains** — if the icons you need aren't classified by the six tiers, use [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) directly and define your own enum + abstract subclass.
- **Fewer or different tiers** — the contract's six methods are mandatory; subclasses can't partially implement it. If your domain needs a different set, extend `TbxMatFontIconService` / `TbxMatSvgIconService` directly with your own contract.
