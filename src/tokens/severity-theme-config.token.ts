import { InjectionToken } from '@angular/core';
import type { TbxMatSeverityThemeConfig } from '../models/severity-theme-config.model';

/**
 * Injection token carrying the runtime {@link TbxMatSeverityThemeConfig}
 *
 * @remarks
 * Resolves to the configuration supplied through `provideTbxMatSeverityTheme()`.
 * The token has a tree-shakeable root-level factory that returns
 * `{ invert: false }` when no value is provided, so injection never throws —
 * consumers who do not opt in get the non-inverted default.
 *
 * @usage
 * Inject directly when application code needs to read the current theme
 * configuration (e.g., to conditionally render UI affordances). For the
 * common case of enabling inversion, prefer the `provideTbxMatSeverityTheme()`
 * helper rather than providing this token manually.
 *
 * @example
 * ```typescript
 * import { Component, inject } from '@angular/core';
 * import { TBX_MAT_SEVERITY_THEME_CONFIG } from '@teqbench/tbx-mat-severity-theme';
 *
 * @Component({ selector: 'app-theme-status', template: `{{ config.invert ? 'Inverted' : 'Default' }}` })
 * export class ThemeStatusComponent {
 *     readonly config = inject(TBX_MAT_SEVERITY_THEME_CONFIG);
 * }
 * ```
 *
 * @category Tokens
 * @displayName Severity Theme Config Token
 * @order 1
 * @since 1.0.0
 * @related TbxMatSeverityThemeConfig
 * @related provideTbxMatSeverityTheme
 *
 * @public
 */
export const TBX_MAT_SEVERITY_THEME_CONFIG = new InjectionToken<TbxMatSeverityThemeConfig>(
    'TBX_MAT_SEVERITY_THEME_CONFIG',
    {
        providedIn: 'root',
        factory: () => ({ invert: false }),
    }
);
