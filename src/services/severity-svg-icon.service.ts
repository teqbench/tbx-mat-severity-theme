import { TbxMatSvgIconService } from '@teqbench/tbx-mat-icons';
import { TbxMatSeverityLevel } from '../enums/severity-level.enum';
import type { TbxMatSeverityResolver } from '../contracts/severity-resolver.contract';

/**
 * Abstract SVG-icon base for severity-level icon resolution
 *
 * @remarks
 * Extends {@link https://github.com/teqbench/tbx-mat-icons | TbxMatSvgIconService} to
 * inherit inline SVG registration (via
 * {@link https://material.angular.io/components/icon/api | MatIconRegistry} and
 * {@link https://angular.dev/api/platform-browser/DomSanitizer | DomSanitizer}) and
 * implements {@link TbxMatSeverityResolver} by delegating each severity method to the
 * inherited `resolve()`. Concrete subclasses register their SVG markup
 * (e.g., `this.register(TbxMatSeverityLevel.Success, '<svg>...</svg>')`) and the
 * six severity methods automatically resolve via the registry.
 *
 * Because this class is abstract, it is not injectable directly. Provide a concrete
 * subclass in the {@link https://angular.dev | Angular} DI tree instead.
 *
 * Each severity method delegates to `resolve()` with a non-null assertion. If a
 * concrete subclass does not register a mapping for a given level in `initialize()`,
 * `resolve()` returns `undefined` and the assertion silently yields `undefined`
 * typed as `string`.
 *
 * @usage
 * Extend this class in a downstream package to create a concrete SVG-icon service
 * for a specific icon set. Override `initialize()` to register SVG markup for each
 * {@link TbxMatSeverityLevel}.
 *
 * @example Concrete SVG icon service (in a downstream package):
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import {
 *     TbxMatSeverityLevel,
 *     TbxMatSeveritySvgIconService,
 * } from '@teqbench/tbx-mat-severity-theme';
 *
 * // MyNotificationSvgIconService is a hypothetical consumer-defined subclass
 * @Injectable()
 * export class MyNotificationSvgIconService
 *     extends TbxMatSeveritySvgIconService
 * {
 *     protected override initialize(): void {
 *         super.initialize();
 *         this.register(TbxMatSeverityLevel.Default, '<svg>...</svg>');
 *         this.register(TbxMatSeverityLevel.Success, '<svg>...</svg>');
 *         this.register(TbxMatSeverityLevel.Error, '<svg>...</svg>');
 *         this.register(TbxMatSeverityLevel.Warning, '<svg>...</svg>');
 *         this.register(TbxMatSeverityLevel.Information, '<svg>...</svg>');
 *         this.register(TbxMatSeverityLevel.Help, '<svg>...</svg>');
 *     }
 * }
 * ```
 *
 * @example Component consuming the service:
 * ```typescript
 * import { Component, inject, input } from '@angular/core';
 * import { MatIconModule } from '@angular/material/icon';
 * import { TbxMatSeverityLevel } from '@teqbench/tbx-mat-severity-theme';
 * // MyNotificationSvgIconService is a hypothetical consumer-defined subclass
 * import { MyNotificationSvgIconService } from './my-notification-svg-icon.service';
 *
 * // NotificationComponent is a hypothetical consumer-defined component
 * @Component({
 *     selector: 'app-notification',
 *     imports: [MatIconModule],
 *     template: `
 *         <mat-icon [svgIcon]="icons.resolve(severity())!"></mat-icon>
 *     `,
 * })
 * export class NotificationComponent {
 *     readonly icons = inject(MyNotificationSvgIconService);
 *     readonly severity = input.required<TbxMatSeverityLevel>();
 * }
 * ```
 *
 * @category Services
 * @category Contract
 * @displayName Severity SVG Icon Service
 * @order 4
 * @since 1.0.0
 * @related TbxMatSeverityResolver
 * @related TbxMatSeverityFontIconService
 * @related TbxMatSeverityLevel
 *
 * @public
 */
export abstract class TbxMatSeveritySvgIconService
    extends TbxMatSvgIconService<TbxMatSeverityLevel>
    implements TbxMatSeverityResolver
{
    /**
     * Return the icon identifier for the Default severity level
     *
     * @returns The icon identifier string for the Default severity level
     *
     * @order 1
     *
     * @public
     */
    default(): string {
        return this.resolve(TbxMatSeverityLevel.Default)!;
    }

    /**
     * Return the icon identifier for the Success severity level
     *
     * @returns The icon identifier string for the Success severity level
     *
     * @order 2
     *
     * @public
     */
    success(): string {
        return this.resolve(TbxMatSeverityLevel.Success)!;
    }

    /**
     * Return the icon identifier for the Error severity level
     *
     * @returns The icon identifier string for the Error severity level
     *
     * @order 3
     *
     * @public
     */
    error(): string {
        return this.resolve(TbxMatSeverityLevel.Error)!;
    }

    /**
     * Return the icon identifier for the Warning severity level
     *
     * @returns The icon identifier string for the Warning severity level
     *
     * @order 4
     *
     * @public
     */
    warning(): string {
        return this.resolve(TbxMatSeverityLevel.Warning)!;
    }

    /**
     * Return the icon identifier for the Information severity level
     *
     * @returns The icon identifier string for the Information severity level
     *
     * @order 5
     *
     * @public
     */
    information(): string {
        return this.resolve(TbxMatSeverityLevel.Information)!;
    }

    /**
     * Return the icon identifier for the Help severity level
     *
     * @returns The icon identifier string for the Help severity level
     *
     * @order 6
     *
     * @public
     */
    help(): string {
        return this.resolve(TbxMatSeverityLevel.Help)!;
    }
}
