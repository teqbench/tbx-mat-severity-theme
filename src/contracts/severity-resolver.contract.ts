/**
 * Contract for resolving severity-level icon identifiers
 *
 * @remarks
 * Defines six severity tiers — default, success, error, warning, information,
 * and help — each returning the icon identifier for that level. The
 * identifier may be a font ligature name (for font icon services) or
 * a registered svgIcon name (for SVG icon services).
 *
 * Implemented by {@link TbxMatSeverityFontIconService},
 * {@link TbxMatSeveritySvgIconService}, and any downstream
 * service that needs severity-level icon resolution (e.g., notification
 * and dialog icon services). No provider is registered automatically —
 * consumers must provide a concrete implementation in the
 * {@link https://angular.dev | Angular} DI tree.
 *
 * @usage
 * Downstream packages implement this interface indirectly by extending
 * {@link TbxMatSeverityFontIconService} or {@link TbxMatSeveritySvgIconService}.
 * Use the interface as a type constraint when accepting any severity icon
 * service regardless of icon strategy.
 *
 * @example
 * ```typescript
 * import type { TbxMatSeverityResolver } from '@teqbench/tbx-mat-severity-theme';
 *
 * function getIcon(resolver: TbxMatSeverityResolver, level: string): string {
 *     return resolver[level as keyof TbxMatSeverityResolver]();
 * }
 * ```
 *
 * @category Contract
 * @displayName Severity Resolver Contract
 * @order 1
 * @since 1.0.0
 * @related TbxMatSeverityFontIconService
 * @related TbxMatSeveritySvgIconService
 * @related TbxMatSeverityLevel
 *
 * @public
 */
export interface TbxMatSeverityResolver {
    /**
     * Return the icon identifier for the Default severity level
     *
     * @returns The icon identifier string for the Default severity level
     *
     * @order 1
     *
     * @public
     */
    default(): string;

    /**
     * Return the icon identifier for the Success severity level
     *
     * @returns The icon identifier string for the Success severity level
     *
     * @order 2
     *
     * @public
     */
    success(): string;

    /**
     * Return the icon identifier for the Error severity level
     *
     * @returns The icon identifier string for the Error severity level
     *
     * @order 3
     *
     * @public
     */
    error(): string;

    /**
     * Return the icon identifier for the Warning severity level
     *
     * @returns The icon identifier string for the Warning severity level
     *
     * @order 4
     *
     * @public
     */
    warning(): string;

    /**
     * Return the icon identifier for the Information severity level
     *
     * @returns The icon identifier string for the Information severity level
     *
     * @order 5
     *
     * @public
     */
    information(): string;

    /**
     * Return the icon identifier for the Help severity level
     *
     * @returns The icon identifier string for the Help severity level
     *
     * @order 6
     *
     * @public
     */
    help(): string;
}
