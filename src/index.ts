/**
 * Foundation package for severity theming in {@link https://material.angular.io | Angular Material} projects
 *
 * @remarks
 * Provides the shared building blocks used by
 * {@link https://github.com/teqbench/tbx-mat-notifications | @teqbench/tbx-mat-notifications},
 * {@link https://github.com/teqbench/tbx-mat-banners | @teqbench/tbx-mat-banners},
 * {@link https://github.com/teqbench/tbx-mat-dialogs | @teqbench/tbx-mat-dialogs},
 * and any future `@teqbench` severity-leveled UI packages: a six-tier severity
 * enum and resolver contract, abstract font-icon and SVG-icon base classes,
 * default icon sets (both SVG markup and Material Symbols ligatures), shared
 * SCSS color tokens with invert support, and an Angular DI configuration
 * token plus provider helper for runtime theme wiring.
 *
 * Key exports:
 *
 * - {@link TbxMatSeverityResolver} — Contract defining the six severity methods.
 * - {@link TbxMatSeverityLevel} — Enum of the six severity levels.
 * - {@link TbxMatSeverityFontIconService} — Abstract font-icon base with severity resolution.
 * - {@link TbxMatSeveritySvgIconService} — Abstract SVG-icon base with severity resolution.
 * - {@link TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS} — Default inline SVG markup per severity level.
 * - {@link TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES} — Default font ligature names per severity level.
 * - {@link TBX_MAT_SEVERITY_INVERTED_CLASS} — CSS class name that flips severity tokens to inverted variants.
 * - {@link TbxMatSeverityThemeConfig} — Runtime configuration interface for the shared severity theme.
 * - {@link TBX_MAT_SEVERITY_THEME_CONFIG} — Injection token carrying the runtime theme config.
 * - {@link provideTbxMatSeverityTheme} — Environment provider helper that wires the theme config and root class.
 *
 * @packageDocumentation
 */

// Constants
export {
    TBX_MAT_SEVERITY_DEFAULT_FONT_LIGATURES,
    TBX_MAT_SEVERITY_DEFAULT_SVG_ICONS,
    TBX_MAT_SEVERITY_INVERTED_CLASS,
} from './constants/severity-theme.constants';

// Contract
export type { TbxMatSeverityResolver } from './contracts/severity-resolver.contract';

// Enums
export { TbxMatSeverityLevel } from './enums/severity-level.enum';

// Models
export type { TbxMatSeverityThemeConfig } from './models/severity-theme-config.model';

// Providers
export { provideTbxMatSeverityTheme } from './providers/severity-theme.provider';

// Services
export { TbxMatSeverityFontIconService } from './services/severity-font-icon.service';
export { TbxMatSeveritySvgIconService } from './services/severity-svg-icon.service';

// Tokens
export { TBX_MAT_SEVERITY_THEME_CONFIG } from './tokens/severity-theme-config.token';
