# @teqbench/tbx-mat-severity-theme

![Build Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-build-status.json) ![Tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-tests.json) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-coverage.json) ![Version](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-version.json) ![Build Number](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-build-number.json)

> Foundation package for severity theming in [Angular Material ↗](https://material.angular.dev) projects. Ships a six-tier severity enum (`default`, `success`, `error`, `warning`, `information`, `help`) and resolver contract, abstract font-icon and SVG-icon base classes built on [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons), default icon sets (SVG markup and Material Symbols ligatures), shared SCSS color tokens with invert support, and an [Angular ↗](https://angular.dev) DI config token plus provider helper — consumed by [`@teqbench/tbx-mat-notifications` ↗](https://github.com/teqbench/tbx-mat-notifications), [`@teqbench/tbx-mat-banners` ↗](https://github.com/teqbench/tbx-mat-banners), [`@teqbench/tbx-mat-dialogs` ↗](https://github.com/teqbench/tbx-mat-dialogs), and any future severity-leveled UI packages.

<details>
<summary><strong>Table of contents</strong></summary>

- [Overview](#overview)
- [At a glance](#at-a-glance)
- [When to use](#when-to-use)
- [Installation](#installation)
- [Usage](#usage)
    - [Font icon subclass](#font-icon-subclass)
    - [SVG icon subclass](#svg-icon-subclass)
    - [Default icon sets](#default-icon-sets)
    - [Shared SCSS color tokens](#shared-scss-color-tokens)
    - [Runtime theme configuration](#runtime-theme-configuration)
- [Concepts](#concepts)
- [API Reference](#api-reference)
- [Accessibility](#accessibility)
- [Compatibility](#compatibility)
- [Related packages](#related-packages)
- [Versioning & releases](#versioning--releases)
- [Contributing](#contributing)
- [Security](#security)
- [Feedback](#feedback)
- [License](#license)

</details>

## Overview

`@teqbench/tbx-mat-severity-theme` centralizes the shared vocabulary, visuals, and runtime wiring that every `@teqbench` severity-leveled [Angular Material ↗](https://material.angular.dev) package ([`@teqbench/tbx-mat-notifications` ↗](https://github.com/teqbench/tbx-mat-notifications), [`@teqbench/tbx-mat-banners` ↗](https://github.com/teqbench/tbx-mat-banners), [`@teqbench/tbx-mat-dialogs` ↗](https://github.com/teqbench/tbx-mat-dialogs), etc.) uses to classify and present messages. Rather than each package re-declaring its own severity enum, color palette, default icons, and invert flag, this foundation package owns them once and the consumer packages depend on it.

It provides four layers:

- **Severity contract and enum** — `TbxMatSeverityLevel` (six tiers) and `TbxMatSeverityResolver` (the six-method contract any severity-aware icon service implements).
- **Abstract icon service bases** — `TbxMatSeverityFontIconService` and `TbxMatSeveritySvgIconService` extend the abstract strategies from [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) and implement the resolver contract. Downstream packages subclass one and override `initialize()` to register icon mappings.
- **Default icon sets** — `TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS` (inline SVG markup per level) and `TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES` (Material Symbols ligature names per level). Consumers pick them up via `initialize()` rather than re-declaring the same icon data in each package.
- **Shared theme layer** — an SCSS partial defining neutral `--tbx-mat-severity-<level>-<background|text>` tokens and a `.tbx-mat-severity-inverted` class that swaps them, plus a `TBX_MAT_SEVERITY_THEME_CONFIG` DI token and `provideTbxMatSeverityTheme()` helper that wires the invert flag into the application at bootstrap.

### Why six severity tiers, not five

The contract includes a `default` method alongside the four classic severities (`success`, `error`, `warning`, `information`) plus `help`. `default` represents "no severity classification" — a message shown with neutral styling when the application doesn't want to assert that it's conveying success, error, etc. Downstream packages surface this as a `default()` method on their service (e.g. `TbxMatBannerService.default(message)`) so the caller doesn't have to pick a severity they don't mean.

### Typed-enum/method agreement

The `TbxMatSeverityLevel` enum's string values exactly match the method names on `TbxMatSeverityResolver`:

- `TbxMatSeverityLevel.Default` → `'default'` → `resolver.default()`
- `TbxMatSeverityLevel.Success` → `'success'` → `resolver.success()`
- …and so on.

This intentional redundancy lets consumers pick whichever idiom fits their call site: `service.resolve(TbxMatSeverityLevel.Warning)` when they already have an enum value, or `service.warning()` when they know the severity at write time. Both paths produce the same icon identifier because the enum value doubles as the dispatch key in the base class's `resolve()`.

## At a glance

- **Six-tier severity contract** — `TbxMatSeverityResolver` fixes exactly six methods (`default`, `success`, `error`, `warning`, `information`, `help`) so every implementer handles the same tiers consistently.
- **Two abstract strategy bases** — `TbxMatSeverityFontIconService` and `TbxMatSeveritySvgIconService` implement the contract for font and SVG rendering respectively.
- **Default icon sets shipped** — `TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS` (CC0 inline SVG markup) and `TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES` (Material Symbols ligature names) give consumers turnkey defaults.
- **Shared SCSS color tokens** — neutral `--tbx-mat-severity-<level>-<background|text>` custom properties defined once, with a prefix-remap mixin for package-local aliases.
- **Pure-CSS invert support** — a `.tbx-mat-severity-inverted` class flips background and text per level across the entire token set.
- **DI config + provider helper** — `TBX_MAT_SEVERITY_THEME_CONFIG` and `provideTbxMatSeverityTheme({ invert, applyToRoot })` wire the runtime invert behavior into the application at bootstrap; default-responsive and SSR-safe via injected `DOCUMENT`.
- **Typed-enum/method agreement** — `TbxMatSeverityLevel` enum values match method names exactly; call `resolve(level)` or the named method and get the same result.
- **Strategy-agnostic substitution** — any implementation of `TbxMatSeverityResolver` is drop-in interchangeable with another regardless of rendering strategy.

## When to use

Use `@teqbench/tbx-mat-severity-theme` when:

- Building a component or service in the `@teqbench` family that needs severity-leveled icons or colors — banner, notification, dialog, toast, or any message surface where `success` / `error` / `warning` / etc. distinctions matter.
- Building an application that wants to invert severity colors globally (white backgrounds, colored text) or scoped to part of the UI.
- Building an application that wants to expose its own custom icon choices for the same six severities (e.g. a themed brand variant) — extend one of the abstract bases and register your own icons.

Do not use it for:

- **Non-severity icon domains** — if the icons you need aren't classified by the six tiers, use [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) directly and define your own enum + abstract subclass.
- **Fewer or different tiers** — the contract's six methods are mandatory; subclasses can't partially implement it. If your domain needs a different set, extend `TbxMatFontIconService` / `TbxMatSvgIconService` directly with your own contract.

## Installation

Configure [npm ↗](https://www.npmjs.com/) to use [GitHub Packages ↗](https://github.com/orgs/teqbench/packages) for the `@teqbench` scope:

```bash
echo "@teqbench:registry=https://npm.pkg.github.com" >> .npmrc
```

Install the package:

```bash
npm install @teqbench/tbx-mat-severity-theme
```

## Usage

### Font icon subclass

```typescript
import { Injectable } from '@angular/core';
import {
    TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES,
    TbxMatSeverityLevel,
    TbxMatSeverityFontIconService,
} from '@teqbench/tbx-mat-severity-theme';

// MyNotificationFontIconService is a hypothetical consumer-defined subclass
@Injectable()
export class MyNotificationFontIconService extends TbxMatSeverityFontIconService {
    constructor(fontSet?: string) {
        super(fontSet);
    }

    protected override initialize(): void {
        super.initialize();
        for (const level of Object.values(TbxMatSeverityLevel)) {
            this.register(level, TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES[level]);
        }
    }
}
```

### SVG icon subclass

```typescript
import { Injectable } from '@angular/core';
import {
    TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS,
    TbxMatSeverityLevel,
    TbxMatSeveritySvgIconService,
} from '@teqbench/tbx-mat-severity-theme';

// MyNotificationSvgIconService is a hypothetical consumer-defined subclass
@Injectable()
export class MyNotificationSvgIconService extends TbxMatSeveritySvgIconService {
    protected override initialize(): void {
        super.initialize();
        for (const level of Object.values(TbxMatSeverityLevel)) {
            this.register(level, TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS[level]);
        }
    }
}
```

### Default icon sets

Both default sets are records keyed by `TbxMatSeverityLevel`, so consumers can iterate all six levels or index into the record for a single level:

```typescript
import {
    TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES,
    TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS,
    TbxMatSeverityLevel,
} from '@teqbench/tbx-mat-severity-theme';

// Ligature for the Warning level (Material Symbols)
TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES[TbxMatSeverityLevel.Warning]; // 'warning_amber'

// Inline SVG markup for the Error level
TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS[TbxMatSeverityLevel.Error]; // '<svg>...</svg>'
```

The `Default` level ligature is `info_i` and its SVG reuses the `Information` markup. Consumers may override any subset in their concrete service's `initialize()` without touching the others.

### Shared SCSS color tokens

Import the SCSS partial and reference the neutral `--tbx-mat-severity-<level>-<background|text>` custom properties directly, or call the `tbx-mat-severity-theme()` mixin to emit package-prefixed aliases:

```scss
@use '@teqbench/tbx-mat-severity-theme/styles/tbx-mat-severity-theme' as severity;

html {
    @include severity.tbx-mat-severity-theme('tbx-mat-notification');
    // Emits:
    //   --tbx-mat-notification-default-background: var(--tbx-mat-severity-default-background);
    //   --tbx-mat-notification-default-text:       var(--tbx-mat-severity-default-text);
    //   --tbx-mat-notification-success-background: var(--tbx-mat-severity-success-background);
    //   ... (same pattern for error, warning, information, help)
}
```

The partial sets the six token pairs on `html`. The `default` level aliases [`--mat-sys-inverse-surface`](https://material.angular.dev) / `--mat-sys-inverse-on-surface` so it stays theme-responsive; the five colored levels use fixed brand-conventional colors (green, red, amber, blue, lighter blue) with white text.

Applications can override individual tokens in theme scopes:

```scss
html[data-theme='my-brand'] {
    --tbx-mat-severity-success-background: #1b5e20;
}
```

### Runtime theme configuration

Enable inversion — white background, colored text per level — by calling `provideTbxMatSeverityTheme()` at bootstrap. The helper sets the `TBX_MAT_SEVERITY_THEME_CONFIG` token value and (by default) toggles the `tbx-mat-severity-inverted` class on `<html>` via an environment initializer:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideTbxMatSeverityTheme } from '@teqbench/tbx-mat-severity-theme';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [provideTbxMatSeverityTheme({ invert: true })],
});
```

For scoped inversion (e.g., a single dialog), pass `applyToRoot: false` and bind `TBX_MAT_SEVERITY_INVERTED_CLASS` on the target host:

```typescript
import { Component, input } from '@angular/core';
import { TBX_MAT_SEVERITY_INVERTED_CLASS } from '@teqbench/tbx-mat-severity-theme';

@Component({
    selector: 'app-invertable-panel',
    host: { '[class]': 'inverted() ? invertedClass : null' },
    template: `<!-- ... -->`,
})
export class InvertablePanelComponent {
    readonly invertedClass = TBX_MAT_SEVERITY_INVERTED_CLASS;
    readonly inverted = input(false);
}
```

When the provider is not called, `TBX_MAT_SEVERITY_THEME_CONFIG` resolves via its default factory to `{ invert: false }`, so injection never throws and no side effect is applied.

## Concepts

- **Severity level** — a classification of a user-facing message into one of six tiers (`default`, `success`, `error`, `warning`, `information`, or `help`) that drives icon and color choices.
- **Severity tier** — a single level within the severity classification; there are exactly six and the set is closed by design.
- **Default tier** — the severity value representing no classification, used when the message shouldn't assert `success`, `error`, or any other semantic category. Its theme tokens alias Material's system color tokens so it remains theme-responsive.
- **Severity resolver contract** — the `TbxMatSeverityResolver` interface pinning down exactly the six severity methods that every severity-aware icon service must implement.
- **Enum/method agreement** — the intentional redundancy where `TbxMatSeverityLevel` enum values match the corresponding method names on `TbxMatSeverityResolver` character-for-character.
- **Severity color token** — one of the CSS custom properties (`--tbx-mat-severity-<level>-background`, `--tbx-mat-severity-<level>-text`) that consumer packages reference for severity-driven coloring.
- **Inverted variant** — the visual mode where background and text swap per severity level; scoped by the `tbx-mat-severity-inverted` class on any ancestor.
- **Root-class application** — the provider helper's default behavior of toggling the inverted class on `<html>` at bootstrap; opt out via `applyToRoot: false` for scoped inversion.
- **Strategy-agnostic substitution** — the ability to swap one severity icon service for another (font-based for SVG-based, or custom for default) without any call-site change because both honor the same contract.
- **Downstream icon registration** — the pattern where a consuming package subclasses a severity icon service and overrides `initialize()` to register its own icon choices, typically pulling from one of the shipped default sets.

## API Reference

### `TbxMatSeverityResolver` (interface)

Contract defining the six severity icon methods.

<dl>
    <dt><code>default()</code> (<code>string</code>)</dt>
    <dd>Icon identifier for the Default severity level.</dd>
    <dt><code>success()</code> (<code>string</code>)</dt>
    <dd>Icon identifier for the Success severity level.</dd>
    <dt><code>error()</code> (<code>string</code>)</dt>
    <dd>Icon identifier for the Error severity level.</dd>
    <dt><code>warning()</code> (<code>string</code>)</dt>
    <dd>Icon identifier for the Warning severity level.</dd>
    <dt><code>information()</code> (<code>string</code>)</dt>
    <dd>Icon identifier for the Information severity level.</dd>
    <dt><code>help()</code> (<code>string</code>)</dt>
    <dd>Icon identifier for the Help severity level.</dd>
</dl>

### `TbxMatSeverityLevel` (enum)

<dl>
    <dt><code>Default</code></dt>
    <dd><code>'default'</code></dd>
    <dt><code>Success</code></dt>
    <dd><code>'success'</code></dd>
    <dt><code>Error</code></dt>
    <dd><code>'error'</code></dd>
    <dt><code>Warning</code></dt>
    <dd><code>'warning'</code></dd>
    <dt><code>Information</code></dt>
    <dd><code>'information'</code></dd>
    <dt><code>Help</code></dt>
    <dd><code>'help'</code></dd>
</dl>

### `TbxMatSeverityFontIconService` (abstract class)

Extends `TbxMatFontIconService<TbxMatSeverityLevel>` and implements `TbxMatSeverityResolver`.

<dl>
    <dt><code>iconType</code> (<code>TbxMatIconType</code>)</dt>
    <dd>Icon type discriminant — always <code>TbxMatIconType.Font</code> (inherited).</dd>
    <dt><code>fontSet</code> (<code>string</code>)</dt>
    <dd>The font set identifier (inherited from <code>TbxMatFontIconService</code>).</dd>
    <dt><code>default()</code> (<code>string</code>)</dt>
    <dd>Resolves the Default severity icon ligature from the registry.</dd>
    <dt><code>success()</code> (<code>string</code>)</dt>
    <dd>Resolves the Success severity icon ligature from the registry.</dd>
    <dt><code>error()</code> (<code>string</code>)</dt>
    <dd>Resolves the Error severity icon ligature from the registry.</dd>
    <dt><code>warning()</code> (<code>string</code>)</dt>
    <dd>Resolves the Warning severity icon ligature from the registry.</dd>
    <dt><code>information()</code> (<code>string</code>)</dt>
    <dd>Resolves the Information severity icon ligature from the registry.</dd>
    <dt><code>help()</code> (<code>string</code>)</dt>
    <dd>Resolves the Help severity icon ligature from the registry.</dd>
    <dt><code>resolve(name)</code> (<code>string | undefined</code>)</dt>
    <dd>Resolves a <code>TbxMatSeverityLevel</code> to its registered ligature.</dd>
</dl>

### `TbxMatSeveritySvgIconService` (abstract class)

Extends `TbxMatSvgIconService<TbxMatSeverityLevel>` and implements `TbxMatSeverityResolver`.

<dl>
    <dt><code>iconType</code> (<code>TbxMatIconType</code>)</dt>
    <dd>Icon type discriminant — always <code>TbxMatIconType.Svg</code> (inherited).</dd>
    <dt><code>default()</code> (<code>string</code>)</dt>
    <dd>Resolves the Default severity icon name from the registry.</dd>
    <dt><code>success()</code> (<code>string</code>)</dt>
    <dd>Resolves the Success severity icon name from the registry.</dd>
    <dt><code>error()</code> (<code>string</code>)</dt>
    <dd>Resolves the Error severity icon name from the registry.</dd>
    <dt><code>warning()</code> (<code>string</code>)</dt>
    <dd>Resolves the Warning severity icon name from the registry.</dd>
    <dt><code>information()</code> (<code>string</code>)</dt>
    <dd>Resolves the Information severity icon name from the registry.</dd>
    <dt><code>help()</code> (<code>string</code>)</dt>
    <dd>Resolves the Help severity icon name from the registry.</dd>
    <dt><code>resolve(name)</code> (<code>string | undefined</code>)</dt>
    <dd>Resolves a <code>TbxMatSeverityLevel</code> to its registered <code>svgIcon</code> name.</dd>
</dl>

### Default icon sets

<dl>
    <dt><code>TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS</code> (<code>Record&lt;TbxMatSeverityLevel, string&gt;</code>)</dt>
    <dd>Inline SVG markup per level; <code>Default</code> reuses the <code>Information</code> markup.</dd>
    <dt><code>TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES</code> (<code>Record&lt;TbxMatSeverityLevel, string&gt;</code>)</dt>
    <dd>Material Symbols ligature names; <code>Default</code> = <code>info_i</code>.</dd>
</dl>

### Theme configuration

<dl>
    <dt><code>TbxMatSeverityThemeConfig</code> (interface)</dt>
    <dd>Runtime config shape: <code>{ invert: boolean; applyToRoot?: boolean }</code>. Default: <code>applyToRoot: true</code>.</dd>
    <dt><code>TBX_MAT_SEVERITY_THEME_CONFIG</code> (<code>InjectionToken&lt;TbxMatSeverityThemeConfig&gt;</code>)</dt>
    <dd>Root-provided token; default factory returns <code>{ invert: false }</code>.</dd>
    <dt><code>provideTbxMatSeverityTheme</code> (function)</dt>
    <dd>Returns <code>EnvironmentProviders</code>; supplies the config value and toggles the root class.</dd>
    <dt><code>TBX_MAT_SEVERITY_INVERTED_CLASS</code> (<code>string</code>)</dt>
    <dd>CSS class literal (<code>'tbx-mat-severity-inverted'</code>) shared by the SCSS partial and the provider.</dd>
</dl>

### Shared SCSS partial

Path: `@teqbench/tbx-mat-severity-theme/styles/tbx-mat-severity-theme`

<dl>
    <dt><code>--tbx-mat-severity-&lt;level&gt;-background</code> (CSS var)</dt>
    <dd>Background color token per severity level.</dd>
    <dt><code>--tbx-mat-severity-&lt;level&gt;-text</code> (CSS var)</dt>
    <dd>Text color token per severity level.</dd>
    <dt><code>.tbx-mat-severity-inverted</code> (Class)</dt>
    <dd>Swaps the background/text pair per level when applied to any ancestor.</dd>
    <dt><code>tbx-mat-severity-theme($prefix)</code> (Mixin)</dt>
    <dd>Emits <code>--&lt;prefix&gt;-&lt;level&gt;-&lt;background|text&gt;</code> aliases referencing the neutral tokens.</dd>
</dl>

## Accessibility

The package ships no UI surface. Consumers that render `<mat-icon>` with the values produced by these services are responsible for pairing each icon with an accessible label (either via adjacent severity text, `aria-label`, or `aria-hidden="true"` when the icon is decorative). Inversion affects color only; it does not alter semantic markup or contrast responsibilities.

## Compatibility

<!-- Kept as a pipe table until teqbench/.github#22 lands; the centralized CI README version-check regex extracts versions from this exact shape. -->

| Dependency                                                             | Version  |
| ---------------------------------------------------------------------- | -------- |
| [Angular ↗](https://angular.dev)                                       | ^21.0.0  |
| [Angular Material ↗](https://material.angular.dev)                     | ^21.0.0  |
| [Angular Platform Browser ↗](https://angular.dev/api/platform-browser) | ^21.0.0  |
| [@teqbench/tbx-mat-icons ↗](https://github.com/teqbench/tbx-mat-icons) | ^4.2.0   |
| [TypeScript ↗](https://www.typescriptlang.org)                         | ~5.9.0   |
| [Node.js ↗](https://nodejs.org)                                        | >=24.0.0 |

## Related packages

### Depends on

- [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) — foundational abstract icon service contracts this package extends for severity-leveled resolution.

### Used by

- [`@teqbench/tbx-mat-notifications` ↗](https://github.com/teqbench/tbx-mat-notifications) — notification service consuming severity icons, color tokens, and the invert flag through this foundation.
- [`@teqbench/tbx-mat-banners` ↗](https://github.com/teqbench/tbx-mat-banners) — banner component and service consuming severity icons, color tokens, and the invert flag through this foundation.
- [`@teqbench/tbx-mat-dialogs` ↗](https://github.com/teqbench/tbx-mat-dialogs) — dialog components consuming severity icons, color tokens, and the invert flag through this foundation.

## Versioning & releases

This package follows [Semantic Versioning ↗](https://semver.org/). Versions and changelog entries are produced automatically by [Release Please ↗](https://github.com/googleapis/release-please) from [Conventional Commits ↗](https://www.conventionalcommits.org/) on `main`. See [CHANGELOG.md](CHANGELOG.md) for the full release history.

## Contributing

Contributions are welcome. See the [contributing guide ↗](https://github.com/teqbench/.github/blob/main/CONTRIBUTING.md) for local setup, [GitHub Packages ↗](https://github.com/orgs/teqbench/packages) authentication, branch conventions, commit format, and the PR workflow.

## Security

See the [security policy ↗](https://github.com/teqbench/.github/blob/main/SECURITY.md) for the supported-version policy and how to report a vulnerability privately.

## Feedback

- [Report a bug ↗](https://github.com/teqbench/tbx-mat-severity-theme/issues/new?template=bug_report.md)
- [Request a feature ↗](https://github.com/teqbench/tbx-mat-severity-theme/issues/new?template=feature_request.md)

## License

[AGPL-3.0](LICENSE) — Copyright 2026 TeqBench
