/**
 * Severity-level icon resolution for {@link https://material.angular.io | Angular Material} projects
 *
 * @remarks
 * Provides abstract font-icon and SVG-icon base classes that implement a six-tier
 * severity contract ({@link TbxMatSeverityResolver}). Both service classes delegate
 * each severity method to the inherited `resolve()` from `@teqbench/tbx-mat-icons`.
 * Downstream packages extend the appropriate class and override `initialize()` to
 * register icon mappings.
 *
 * Key exports:
 *
 * - {@link TbxMatSeverityResolver} — Contract defining the six severity methods.
 * - {@link TbxMatSeverityLevel} — Enum of the six severity levels.
 * - {@link TbxMatSeverityFontIconService} — Abstract font-icon base with severity resolution.
 * - {@link TbxMatSeveritySvgIconService} — Abstract SVG-icon base with severity resolution.
 *
 * @packageDocumentation
 */

// Contract
export type { TbxMatSeverityResolver } from './contracts/severity-resolver.contract';

// Enums
export { TbxMatSeverityLevel } from './enums/severity-level.enum';

// Services
export { TbxMatSeverityFontIconService } from './services/severity-font-icon.service';
export { TbxMatSeveritySvgIconService } from './services/severity-svg-icon.service';
