---
tagline: Severity-leveled icon resolution for [Angular Material ↗](https://material.angular.dev) — two abstract strategy subclasses (`TbxMatSeverityFontIconService` and `TbxMatSeveritySvgIconService`) built on [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons), implementing a shared six-tier `TbxMatSeverityResolver` contract (default, success, error, warning, information, help) that downstream packages extend to register their icon mappings.
---

## Overview

`@teqbench/tbx-mat-severity-theme` specializes the abstract icon pattern from [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) for a specific domain: the six severity tiers (`default`, `success`, `error`, `warning`, `information`, `help`) that the TeqBench component family uses to classify every user-facing message. The package doesn't ship icon data — it ships the two abstract service contracts and a strict typed-enum/method agreement that downstream packages extend to register their chosen icon mappings.

The `TbxMatSeverityResolver` contract pins down exactly those six methods — one per severity tier — so any service implementing it can be substituted for another regardless of rendering strategy. Two abstract bases implement the contract: `TbxMatSeverityFontIconService` (extends [`TbxMatFontIconService` ↗](https://github.com/teqbench/tbx-mat-icons)) and `TbxMatSeveritySvgIconService` (extends `TbxMatSvgIconService`). Downstream packages like [`@teqbench/tbx-mat-banners` ↗](https://github.com/teqbench/tbx-mat-banners) and [`@teqbench/tbx-mat-notifications` ↗](https://github.com/teqbench/tbx-mat-notifications) consume either concrete subclass via DI and call `resolve(severityLevel)` to look up the icon identifier for the current severity.

### Why six severity tiers, not five

The contract includes a `default` method alongside the four classic severities (`success`, `error`, `warning`, `information`) plus `help`. `default` represents "no severity classification" — a message shown with neutral styling when the application doesn't want to assert that it's conveying success, error, etc. Downstream packages surface this as a `default()` method on their service (e.g. `TbxMatBannerService.default(message)`) so the caller doesn't have to pick a severity they don't mean. The contract keeps `default` as a first-class peer so every implementer handles it consistently.

### Typed-enum/method agreement

The `TbxMatSeverityLevel` enum's string values exactly match the method names on `TbxMatSeverityResolver`:

- `TbxMatSeverityLevel.Default` → `'default'` → `resolver.default()`
- `TbxMatSeverityLevel.Success` → `'success'` → `resolver.success()`
- ...and so on.

This intentional redundancy lets consumers pick whichever idiom fits their call site: `service.resolve(TbxMatSeverityLevel.Warning)` when they already have an enum value, or `service.warning()` when they know the severity at write time. Both paths produce the same icon identifier, because the enum value doubles as the dispatch key in the base class's `resolve()`.

### Downstream usage pattern

Downstream packages consume this package in a predictable shape:

1. Pick the appropriate abstract base based on rendering strategy (font or SVG).
2. Subclass it and override `initialize()` to register an icon for each severity via `register(TbxMatSeverityLevel.Success, 'check_circle')` etc.
3. Register the concrete subclass in the Angular DI tree.
4. Inject the service and call `resolve(level)` — or one of the severity-specific methods (`success()`, `error()`, etc.) — to get the icon identifier.

The resulting service is drop-in interchangeable with any other implementation of `TbxMatSeverityResolver`. A banner component that consumes a `TbxMatSeverityResolver` doesn't know or care whether the concrete service renders SVG or font, or which specific icons each severity maps to.

## When to use

Use `@teqbench/tbx-mat-severity-theme` when:

- Building a component or service in the TeqBench family that needs severity-leveled icons — banner, notification, dialog, toast, or any message surface where success/error/warning/etc. distinctions matter.
- Building an application that wants to expose its own custom icon choices for the same six severities (e.g. a themed brand variant).

Do not use it for:

- **Non-severity icon domains** — if the icons you need aren't classified by the six tiers, use [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) directly and define your own enum + abstract subclass.
- **Fewer or different tiers** — the contract's six methods are mandatory; subclasses can't partially implement it. If your domain needs a different set, extend `TbxMatFontIconService` / `TbxMatSvgIconService` directly with your own contract.
