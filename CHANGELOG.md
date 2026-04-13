# Changelog

## [7.1.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v7.0.1...v7.1.0) (2026-04-13)


### Features

* **docs:** overhaul README, adopt docs pipeline, bump tbx-mat-icons peer to ^4.1.0 ([a53950c](https://github.com/teqbench/tbx-mat-severity-theme/commit/a53950c81882701ab7f9414332b0fc162faf225a))
* **docs:** overhaul README, adopt per-package docs pipeline, bump tbx-mat-icons peer to ^4.1.0 ([ddd3feb](https://github.com/teqbench/tbx-mat-severity-theme/commit/ddd3feb4fa6360e0c5eeede6a67ace79a84b98ff))


### Reverts

* restore dependency files to pre-session state ([c145bd0](https://github.com/teqbench/tbx-mat-severity-theme/commit/c145bd0a5d81184e55d5cc0d8ec86b0d669f0950))

## [7.0.1](https://github.com/teqbench/tbx-mat-severity-theme/compare/v7.0.0...v7.0.1) (2026-04-06)


### Bug Fixes

* **deps:** update vite to 7.3.2/8.0.5 to resolve CVEs ([4707315](https://github.com/teqbench/tbx-mat-severity-theme/commit/47073157fd2e3135a99f1a9756112d7254e10c46))
* **deps:** update vite to 7.3.2/8.0.5 to resolve CVEs ([cc104b9](https://github.com/teqbench/tbx-mat-severity-theme/commit/cc104b9220bbc0ae1ead1daa793f0b04def53013))

## [7.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v6.0.0...v7.0.0) (2026-04-05)


### ⚠ BREAKING CHANGES

* **severity:** TbxMatSeverityResolver now requires a default() method. All implementations must register a Default severity mapping.

### Features

* **severity:** add Default severity level to enum, contract, and services ([3d2a6a2](https://github.com/teqbench/tbx-mat-severity-theme/commit/3d2a6a2446c21c6d2747f31e5ff2d1f20a835f30))

## [6.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v5.0.0...v6.0.0) (2026-04-04)


### ⚠ BREAKING CHANGES

* **structure:** The public enum `TbxMatSeverityLevelType` has been renamed to `TbxMatSeverityLevel` and moved from `src/types/severity-level.type.ts` to `src/enums/severity-level.enum.ts`. Consumers must update all imports from `TbxMatSeverityLevelType` to `TbxMatSeverityLevel`.

### Code Refactoring

* **structure:** rename TbxMatSeverityLevelType to TbxMatSeverityLevel ([6e96f3f](https://github.com/teqbench/tbx-mat-severity-theme/commit/6e96f3f69ce2c6562457df8ac885408f48c305a9))

## [5.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v4.0.0...v5.0.0) (2026-04-03)


### ⚠ BREAKING CHANGES

* **license:** License changed from Apache-2.0 to AGPL-3.0-only.

### Features

* **license:** switch license from Apache-2.0 to AGPL-3.0-only ([196086a](https://github.com/teqbench/tbx-mat-severity-theme/commit/196086a00cace1568f4bcb2588fd359aaf70b675))

## [4.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v3.0.0...v4.0.0) (2026-03-29)


### ⚠ BREAKING CHANGES

* TbxMatSeverityIconService and tbxMatResolveSeverityIcon have been removed. Use TbxMatSeverityFontIconService or TbxMatSeveritySvgIconService instead.

### Code Refactoring

* replace TbxMatSeverityIconService with font and SVG base classes ([964fb03](https://github.com/teqbench/tbx-mat-severity-theme/commit/964fb03416382b9ad55ee0e2e46246057dc5bb04))

## [3.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v2.0.0...v3.0.0) (2026-03-28)


### ⚠ BREAKING CHANGES

* All public exports renamed with TbxMat prefix.

### Code Refactoring

* align all exports with TbxMat package prefix convention ([8af3b09](https://github.com/teqbench/tbx-mat-severity-theme/commit/8af3b09a3b030b459b8f2fe294cc4d2f1b35f63c))

## [2.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v1.0.0...v2.0.0) (2026-03-28)


### ⚠ BREAKING CHANGES

* TbxMatSeverityIconService no longer extends TbxMatFontIconService. TbxMatSeverityLevelType renamed to TbxSeverityLevelType. New exports: ITbxSeverityResolver, tbxResolveSeverityIcon.

### Code Refactoring

* decouple from TbxMatFontIconService, add shared resolve utility ([bf80b8a](https://github.com/teqbench/tbx-mat-severity-theme/commit/bf80b8a9e32b04f020186dd5a3eb594dd76a12b0))

## [1.0.0](https://github.com/teqbench/tbx-mat-severity-theme/compare/v0.1.0...v1.0.0) (2026-03-27)


### ⚠ BREAKING CHANGES

* All public exports are renamed with the TbxMat prefix.

### Features

* apply TbxMat prefix to all public exports ([9b8e26b](https://github.com/teqbench/tbx-mat-severity-theme/commit/9b8e26b6798429e5885d5766ffbc54d9894d4ed1))

## 0.1.0 (2026-03-25)


### Features

* **setup:** configure package as @teqbench/tbx-mat-severity-theme ([6f02693](https://github.com/teqbench/tbx-mat-severity-theme/commit/6f02693522168e1bf7b40a5d236c0a473bd37202))
* **setup:** configure package as @teqbench/tbx-mat-severity-theme ([d0cbac4](https://github.com/teqbench/tbx-mat-severity-theme/commit/d0cbac424e7d5c3b4d7acdce0594f8333d2f5c14))


### Bug Fixes

* **docs:** escape pipe in README table and fix self-referential example ([2f6f21f](https://github.com/teqbench/tbx-mat-severity-theme/commit/2f6f21fc4658db05775f55a080be2624608a7d3a))

## Changelog
