import { DOCUMENT } from '@angular/common';
import {
    inject,
    makeEnvironmentProviders,
    provideEnvironmentInitializer,
    type EnvironmentProviders,
} from '@angular/core';
import { TBX_MAT_SEVERITY_INVERTED_CLASS } from '../constants/severity-theme.constants';
import type { TbxMatSeverityThemeConfig } from '../models/severity-theme-config.model';
import { TBX_MAT_SEVERITY_THEME_CONFIG } from '../tokens/severity-theme-config.token';

/**
 * Register the shared severity theme configuration for an application
 *
 * @remarks
 * Supplies the given {@link TbxMatSeverityThemeConfig} value for the
 * {@link TBX_MAT_SEVERITY_THEME_CONFIG} injection token and, when
 * `config.applyToRoot` is left at its default of `true`, registers an
 * environment initializer that toggles
 * {@link TBX_MAT_SEVERITY_INVERTED_CLASS} on `document.documentElement`
 * based on `config.invert`.
 *
 * When `applyToRoot` is `false`, the helper provides the config value only;
 * consumers are then responsible for binding the class on whatever element
 * should carry the inverted styling (e.g., a component host).
 *
 * The DOM class toggle uses {@link https://angular.dev/api/common/DOCUMENT | DOCUMENT}
 * injection rather than the global `document` reference, keeping the helper
 * compatible with server-side rendering.
 *
 * @param config - Runtime theme configuration
 * @returns Angular {@link https://angular.dev/api/core/EnvironmentProviders | EnvironmentProviders}
 *     carrying the token value and, when applicable, the root-class initializer
 *
 * @usage
 * Call once in an application's bootstrap providers. Skip this helper and
 * rely on the token's default factory (`{ invert: false }`) when the
 * application never enables inversion.
 *
 * @example
 * ```typescript
 * import { bootstrapApplication } from '@angular/platform-browser';
 * import { provideTbxMatSeverityTheme } from '@teqbench/tbx-mat-severity-theme';
 * import { AppComponent } from './app/app.component';
 *
 * bootstrapApplication(AppComponent, {
 *     providers: [provideTbxMatSeverityTheme({ invert: true })],
 * });
 * ```
 *
 * @example Scoped inversion (no root class):
 * ```typescript
 * bootstrapApplication(AppComponent, {
 *     providers: [
 *         provideTbxMatSeverityTheme({ invert: true, applyToRoot: false }),
 *     ],
 * });
 * ```
 *
 * @category Providers
 * @displayName Provide Severity Theme
 * @order 1
 * @since 1.0.0
 * @related TbxMatSeverityThemeConfig
 * @related TBX_MAT_SEVERITY_THEME_CONFIG
 * @related TBX_MAT_SEVERITY_INVERTED_CLASS
 *
 * @public
 */
export function provideTbxMatSeverityTheme(
    config: TbxMatSeverityThemeConfig
): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: TBX_MAT_SEVERITY_THEME_CONFIG, useValue: config },
        provideEnvironmentInitializer(() => {
            const cfg = inject(TBX_MAT_SEVERITY_THEME_CONFIG);
            if (cfg.applyToRoot ?? true) {
                const doc = inject(DOCUMENT);
                doc.documentElement.classList.toggle(TBX_MAT_SEVERITY_INVERTED_CLASS, cfg.invert);
            }
        }),
    ]);
}
