/**
 * Runtime configuration for the shared severity theme
 *
 * @remarks
 * Consumed via the {@link TBX_MAT_SEVERITY_THEME_CONFIG} injection token and
 * typically supplied through the `provideTbxMatSeverityTheme()` helper. Drives
 * whether the severity color tokens render in their default orientation
 * (colored background, white text) or their inverted orientation (white
 * background, colored text), and whether the inverted class is applied
 * automatically to the document root.
 *
 * @usage
 * Pass an instance to `provideTbxMatSeverityTheme()` in an application's
 * bootstrap providers. To scope inversion to a subtree instead of the entire
 * document, set `applyToRoot` to `false` and bind
 * {@link TBX_MAT_SEVERITY_INVERTED_CLASS} on the component host that should
 * carry the inverted styling.
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
 * @category Models
 * @displayName Severity Theme Config
 * @order 1
 * @since 7.2.0
 * @related TBX_MAT_SEVERITY_THEME_CONFIG
 * @related provideTbxMatSeverityTheme
 * @related TBX_MAT_SEVERITY_INVERTED_CLASS
 *
 * @public
 */
export interface TbxMatSeverityThemeConfig {
    /**
     * Whether severity tokens render inverted (white background, colored text)
     *
     * @order 1
     *
     * @public
     */
    readonly invert: boolean;

    /**
     * Whether to apply the inverted class to the document root automatically
     *
     * @remarks
     * Defaults to `true`. When `true` and `invert` is `true`, the provider
     * toggles {@link TBX_MAT_SEVERITY_INVERTED_CLASS} on `<html>` during
     * environment initialization. Set to `false` to opt out of the global
     * side effect and bind the class manually on specific hosts.
     *
     * @order 2
     *
     * @public
     */
    readonly applyToRoot?: boolean;
}
