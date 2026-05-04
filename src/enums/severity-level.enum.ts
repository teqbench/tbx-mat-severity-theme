/**
 * Severity levels used by {@link TbxMatSeverityFontIconService} and
 * {@link TbxMatSeveritySvgIconService} to resolve icon identifiers
 *
 * @remarks
 * Each member doubles as the method name on {@link TbxMatSeverityResolver}, so the
 * string values must match the corresponding method names exactly.
 *
 * @usage
 * Pass a member to `resolve()` on either service class to look up the registered
 * icon identifier. Also used as keys in `register()` calls within `initialize()`.
 *
 * @example
 * ```typescript
 * import { TbxMatSeverityLevel } from '@teqbench/tbx-mat-severity-theme';
 *
 * const level = TbxMatSeverityLevel.Warning;
 * const icon = service.resolve(level);
 * ```
 *
 * @category Enums
 * @displayName Severity Level
 * @order 2
 * @since 7.2.0
 * @related TbxMatSeverityResolver
 * @related TbxMatSeverityFontIconService
 * @related TbxMatSeveritySvgIconService
 *
 * @public
 */
export enum TbxMatSeverityLevel {
    /**
     * Default severity level; typically used for standard or unclassified cases
     *
     * @order 1
     *
     * @public
     */
    Default = 'default',

    /**
     * Positive outcome or completion
     *
     * @order 2
     *
     * @public
     */
    Success = 'success',

    /**
     * Failure or critical problem
     *
     * @order 3
     *
     * @public
     */
    Error = 'error',

    /**
     * Caution or potential issue
     *
     * @order 4
     *
     * @public
     */
    Warning = 'warning',

    /**
     * Neutral or supplementary detail
     *
     * @order 5
     *
     * @public
     */
    Information = 'information',

    /**
     * Guidance or contextual assistance
     *
     * @order 6
     *
     * @public
     */
    Help = 'help',
}
