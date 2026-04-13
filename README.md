# @teqbench/tbx-mat-severity-theme

![Build Status](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-build-status.json) ![Tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-tests.json) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-coverage.json) ![Version](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-version.json) ![Build Number](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/teqbench-shields-bot/a69600f4ed4ebed89ffb35d808e05eb4/raw/tbx-mat-severity-theme-main-build-number.json)

> Severity-leveled icon resolution for [Angular Material ↗](https://material.angular.dev) — two abstract strategy subclasses (`TbxMatSeverityFontIconService` and `TbxMatSeveritySvgIconService`) built on [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons), implementing a shared six-tier `TbxMatSeverityResolver` contract (default, success, error, warning, information, help) that downstream packages extend to register their icon mappings.

<details>
<summary><strong>Table of contents</strong></summary>

- [Overview](#overview)
- [At a glance](#at-a-glance)
- [When to use](#when-to-use)
- [Installation](#installation)
- [Usage](#usage)
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

`@teqbench/tbx-mat-severity-theme` specializes the abstract icon pattern from [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) for a specific domain: the six severity tiers (`default`, `success`, `error`, `warning`, `information`, `help`) that the TeqBench component family uses to classify every user-facing message. The package doesn't ship icon data — it ships the two abstract service contracts and a strict typed-enum/method agreement that downstream packages extend to register their chosen icon mappings.

The `TbxMatSeverityResolver` contract pins down exactly those six methods — one per severity tier — so any service implementing it can be substituted for another regardless of rendering strategy. Two abstract bases implement the contract: `TbxMatSeverityFontIconService` (extends [`TbxMatFontIconService` ↗](https://github.com/teqbench/tbx-mat-icons)) and `TbxMatSeveritySvgIconService` (extends `TbxMatSvgIconService`). Downstream packages like [`@teqbench/tbx-mat-banners` ↗](https://github.com/teqbench/tbx-mat-banners) and [`@teqbench/tbx-mat-notifications` ↗](https://github.com/teqbench/tbx-mat-notifications) consume either concrete subclass via DI and call `resolve(severityLevel)` to look up the icon identifier for the current severity.

### Why six severity tiers, not five

The contract includes a `default` method alongside the four classic severities (`success`, `error`, `warning`, `information`) plus `help`. `default` represents "no severity classification" — a message shown with neutral styling when the application doesn't want to assert that it's conveying success, error, etc. Downstream packages surface this as a `default()` method on their service (e.g. `TbxMatBannerService.default(message)`) so the caller doesn't have to pick a severity they don't mean. The contract keeps `default` as a first-class peer so every implementer handles it consistently.

### Typed-enum/method agreement

The `TbxMatSeverityLevel` enum's string values exactly match the method names on `TbxMatSeverityResolver`:

- `TbxMatSeverityLevel.Default` → `'default'` → `resolver.default()`
- `TbxMatSeverityLevel.Success` → `'success'` → `resolver.success()`
- …and so on.

This intentional redundancy lets consumers pick whichever idiom fits their call site: `service.resolve(TbxMatSeverityLevel.Warning)` when they already have an enum value, or `service.warning()` when they know the severity at write time. Both paths produce the same icon identifier, because the enum value doubles as the dispatch key in the base class's `resolve()`.

### Downstream usage pattern

Downstream packages consume this package in a predictable shape:

1. Pick the appropriate abstract base based on rendering strategy (font or SVG).
2. Subclass it and override `initialize()` to register an icon for each severity via `register(TbxMatSeverityLevel.Success, 'check_circle')` etc.
3. Register the concrete subclass in the [Angular ↗](https://angular.dev) DI tree.
4. Inject the service and call `resolve(level)` — or one of the severity-specific methods (`success()`, `error()`, etc.) — to get the icon identifier.

The resulting service is drop-in interchangeable with any other implementation of `TbxMatSeverityResolver`. A banner component that consumes a `TbxMatSeverityResolver` doesn't know or care whether the concrete service renders SVG or font, or which specific icons each severity maps to.

## At a glance

- **Six-tier severity contract** — `TbxMatSeverityResolver` fixes exactly six methods (`default`, `success`, `error`, `warning`, `information`, `help`) so every implementer handles the same tiers consistently.
- **Two abstract strategy bases** — `TbxMatSeverityFontIconService` and `TbxMatSeveritySvgIconService` implement the contract for font and SVG rendering respectively.
- **Typed-enum/method agreement** — `TbxMatSeverityLevel` enum values match the method names exactly; call `resolve(level)` or the named method and get the same result.
- **Strategy-agnostic substitution** — any implementation of `TbxMatSeverityResolver` is drop-in interchangeable with another regardless of rendering strategy.
- **Default tier as first-class peer** — the `default` severity represents no classification and is handled with the same consistency as the four classic severities plus `help`.
- **Built on [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons)** — inherits registration, resolution, and fontSet cascade mechanics from the foundational icon service contracts.
- **Icon-data-agnostic** — ships abstract classes and a contract, not icons; downstream packages choose and register their own icon mappings.

## When to use

Use `@teqbench/tbx-mat-severity-theme` when:

- Building a component or service in the TeqBench family that needs severity-leveled icons — banner, notification, dialog, toast, or any message surface where `success` / `error` / `warning` / etc. distinctions matter.
- Building an application that wants to expose its own custom icon choices for the same six severities (e.g. a themed brand variant).

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
import { TbxMatSeverityLevel, TbxMatSeverityFontIconService } from '@teqbench/tbx-mat-severity-theme';

// MyNotificationFontIconService is a hypothetical consumer-defined subclass
@Injectable()
export class MyNotificationFontIconService extends TbxMatSeverityFontIconService {
    constructor(fontSet?: string) {
        super(fontSet);
    }

    protected override initialize(): void {
        super.initialize();
        this.register(TbxMatSeverityLevel.Default, 'chat_info');
        this.register(TbxMatSeverityLevel.Success, 'check_circle');
        this.register(TbxMatSeverityLevel.Error, 'error');
        this.register(TbxMatSeverityLevel.Warning, 'warning_amber');
        this.register(TbxMatSeverityLevel.Information, 'info');
        this.register(TbxMatSeverityLevel.Help, 'help');
    }
}
```

Component consuming the service:

```typescript
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TbxMatSeverityLevel } from '@teqbench/tbx-mat-severity-theme';
// MyNotificationFontIconService is a hypothetical consumer-defined subclass
import { MyNotificationFontIconService } from './my-notification-font-icon.service';

// NotificationComponent is a hypothetical consumer-defined component
@Component({
    selector: 'app-notification',
    imports: [MatIconModule],
    template: `
        <mat-icon [fontSet]="icons.fontSet">
            {{ icons.resolve(severity()) }}
        </mat-icon>
    `,
})
export class NotificationComponent {
    readonly icons = inject(MyNotificationFontIconService);
    readonly severity = input.required<TbxMatSeverityLevel>();
}
```

### SVG icon subclass

```typescript
import { Injectable } from '@angular/core';
import { TbxMatSeverityLevel, TbxMatSeveritySvgIconService } from '@teqbench/tbx-mat-severity-theme';

// MyNotificationSvgIconService is a hypothetical consumer-defined subclass
@Injectable()
export class MyNotificationSvgIconService extends TbxMatSeveritySvgIconService {
    // No constructor needed — TbxMatSvgIconService handles inject() and
    // calls initialize() internally. Only override initialize() to register icons.
    protected override initialize(): void {
        super.initialize();
        this.register(TbxMatSeverityLevel.Default, '<svg>...</svg>');
        this.register(TbxMatSeverityLevel.Success, '<svg>...</svg>');
        this.register(TbxMatSeverityLevel.Error, '<svg>...</svg>');
        this.register(TbxMatSeverityLevel.Warning, '<svg>...</svg>');
        this.register(TbxMatSeverityLevel.Information, '<svg>...</svg>');
        this.register(TbxMatSeverityLevel.Help, '<svg>...</svg>');
    }
}
```

Component consuming the service:

```typescript
import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TbxMatSeverityLevel } from '@teqbench/tbx-mat-severity-theme';
// MyNotificationSvgIconService is a hypothetical consumer-defined subclass
import { MyNotificationSvgIconService } from './my-notification-svg-icon.service';

// NotificationComponent is a hypothetical consumer-defined component
@Component({
    selector: 'app-notification',
    imports: [MatIconModule],
    template: ` <mat-icon [svgIcon]="icons.resolve(severity())!"></mat-icon> `,
})
export class NotificationComponent {
    readonly icons = inject(MyNotificationSvgIconService);
    readonly severity = input.required<TbxMatSeverityLevel>();
}
```

## Concepts

- **Severity level** — a classification of a user-facing message into one of six tiers (`default`, `success`, `error`, `warning`, `information`, or `help`) that drives icon and color choices.
- **Severity tier** — a single level within the severity classification; there are exactly six and the set is closed by design.
- **Default tier** — the severity value representing no classification, used when the message shouldn't assert `success`, `error`, or any other semantic category.
- **Severity resolver contract** — the `TbxMatSeverityResolver` interface pinning down exactly the six severity methods that every severity-aware icon service must implement.
- **Enum/method agreement** — the intentional redundancy where `TbxMatSeverityLevel` enum values match the corresponding method names on `TbxMatSeverityResolver` character-for-character.
- **Strategy-agnostic substitution** — the ability to swap one severity icon service for another (font-based for SVG-based, or custom for default) without any call-site change because both honor the same contract.
- **Downstream icon registration** — the pattern where a consuming package subclasses a severity icon service and overrides `initialize()` to register its own icon choices.

## API Reference

### `TbxMatSeverityResolver` (interface)

Contract defining the six severity icon methods.

| Method          | Returns  | Description                                        |
| --------------- | -------- | -------------------------------------------------- |
| `default()`     | `string` | Icon identifier for the Default severity level     |
| `success()`     | `string` | Icon identifier for the Success severity level     |
| `error()`       | `string` | Icon identifier for the Error severity level       |
| `warning()`     | `string` | Icon identifier for the Warning severity level     |
| `information()` | `string` | Icon identifier for the Information severity level |
| `help()`        | `string` | Icon identifier for the Help severity level        |

### `TbxMatSeverityLevel` (enum)

| Member        | Value           |
| ------------- | --------------- |
| `Default`     | `'default'`     |
| `Success`     | `'success'`     |
| `Error`       | `'error'`       |
| `Warning`     | `'warning'`     |
| `Information` | `'information'` |
| `Help`        | `'help'`        |

### `TbxMatSeverityFontIconService` (abstract class)

Extends `TbxMatFontIconService<TbxMatSeverityLevel>` and implements `TbxMatSeverityResolver`.

| Member / Method | Returns               | Description                                                       |
| --------------- | --------------------- | ----------------------------------------------------------------- |
| `iconType`      | `TbxMatIconType`      | Icon type discriminant — always `TbxMatIconType.Font` (inherited) |
| `fontSet`       | `string`              | The font set identifier (inherited from `TbxMatFontIconService`)  |
| `default()`     | `string`              | Resolves the Default severity icon ligature from the registry     |
| `success()`     | `string`              | Resolves the Success severity icon ligature from the registry     |
| `error()`       | `string`              | Resolves the Error severity icon ligature from the registry       |
| `warning()`     | `string`              | Resolves the Warning severity icon ligature from the registry     |
| `information()` | `string`              | Resolves the Information severity icon ligature from the registry |
| `help()`        | `string`              | Resolves the Help severity icon ligature from the registry        |
| `resolve(name)` | `string \| undefined` | Resolves a `TbxMatSeverityLevel` to its registered ligature       |

### `TbxMatSeveritySvgIconService` (abstract class)

Extends `TbxMatSvgIconService<TbxMatSeverityLevel>` and implements `TbxMatSeverityResolver`.

| Member / Method | Returns               | Description                                                       |
| --------------- | --------------------- | ----------------------------------------------------------------- |
| `iconType`      | `TbxMatIconType`      | Icon type discriminant — always `TbxMatIconType.Svg` (inherited)  |
| `default()`     | `string`              | Resolves the Default severity icon name from the registry         |
| `success()`     | `string`              | Resolves the Success severity icon name from the registry         |
| `error()`       | `string`              | Resolves the Error severity icon name from the registry           |
| `warning()`     | `string`              | Resolves the Warning severity icon name from the registry         |
| `information()` | `string`              | Resolves the Information severity icon name from the registry     |
| `help()`        | `string`              | Resolves the Help severity icon name from the registry            |
| `resolve(name)` | `string \| undefined` | Resolves a `TbxMatSeverityLevel` to its registered `svgIcon` name |

## Accessibility

Not applicable — abstract service contracts, no UI surface. Consumers that render `<mat-icon>` with the values produced by these services are responsible for pairing each icon with an accessible label (either via adjacent severity text, `aria-label`, or `aria-hidden="true"` when the icon is decorative).

## Compatibility

| Dependency                                                             | Version  |
| ---------------------------------------------------------------------- | -------- |
| [Angular ↗](https://angular.dev)                                       | ^21.0.0  |
| [Angular Material ↗](https://material.angular.dev)                     | ^21.0.0  |
| [Angular Platform Browser ↗](https://angular.dev/api/platform-browser) | ^21.0.0  |
| [@teqbench/tbx-mat-icons ↗](https://github.com/teqbench/tbx-mat-icons) | ^4.0.0   |
| [TypeScript ↗](https://www.typescriptlang.org)                         | ~5.9.0   |
| [Node.js ↗](https://nodejs.org)                                        | >=24.0.0 |

## Related packages

### Depends on

- [`@teqbench/tbx-mat-icons` ↗](https://github.com/teqbench/tbx-mat-icons) — foundational abstract icon service contracts this package extends for severity-leveled resolution.

### Used by

- [`@teqbench/tbx-mat-banners` ↗](https://github.com/teqbench/tbx-mat-banners) — banner component and service consuming severity icons through this package's abstract services.
- [`@teqbench/tbx-mat-notifications` ↗](https://github.com/teqbench/tbx-mat-notifications) — notification service consuming severity icons through this package's abstract services.

## Versioning & releases

This package follows [Semantic Versioning ↗](https://semver.org/). Versions and changelog entries are produced automatically by [Release Please ↗](https://github.com/googleapis/release-please) from [Conventional Commits ↗](https://www.conventionalcommits.org/) on `main`. See [CHANGELOG.md](CHANGELOG.md) for the full release history.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, [GitHub Packages ↗](https://github.com/orgs/teqbench/packages) authentication, branch conventions, commit format, and the PR workflow.

## Security

See [SECURITY.md](SECURITY.md) for the supported-version policy and how to report a vulnerability privately.

## Feedback

- [Report a bug ↗](https://github.com/teqbench/tbx-mat-severity-theme/issues/new?template=bug_report.md)
- [Request a feature ↗](https://github.com/teqbench/tbx-mat-severity-theme/issues/new?template=feature_request.md)

## License

[AGPL-3.0](LICENSE) — Copyright 2026 TeqBench
