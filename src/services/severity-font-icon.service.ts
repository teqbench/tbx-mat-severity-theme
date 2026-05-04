import { TbxMatFontIconService } from '@teqbench/tbx-mat-icons';
import { TbxMatSeverityLevel } from '../enums/severity-level.enum';
import type { TbxMatSeverityResolver } from '../contracts/severity-resolver.contract';

/**
 * Abstract font-icon base for severity-level icon resolution
 *
 * @remarks
 * Extends {@link https://github.com/teqbench/tbx-mat-icons | TbxMatFontIconService} to
 * inherit font set resolution (the `fontSet` property and font ligature registry) and
 * implements {@link TbxMatSeverityResolver} by delegating each severity method to the
 * inherited `resolve()`. Concrete subclasses register their ligature mappings
 * (e.g., `this.register(TbxMatSeverityLevel.Success, 'check_circle')`) and the six
 * severity methods automatically resolve via the registry.
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
 * Extend this class in a downstream package to create a concrete font-icon service
 * for a specific icon set. Override `initialize()` to register ligature mappings for
 * each {@link TbxMatSeverityLevel}.
 *
 * @example Concrete font icon service (in a downstream package):
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import {
 *     TbxMatSeverityLevel,
 *     TbxMatSeverityFontIconService,
 * } from '@teqbench/tbx-mat-severity-theme';
 *
 * // MyNotificationFontIconService is a hypothetical consumer-defined subclass
 * @Injectable()
 * export class MyNotificationFontIconService
 *     extends TbxMatSeverityFontIconService
 * {
 *     constructor(fontSet?: string) {
 *         super(fontSet);
 *     }
 *
 *     protected override initialize(): void {
 *         super.initialize();
 *         this.register(TbxMatSeverityLevel.Default, 'chat_info');
 *         this.register(TbxMatSeverityLevel.Success, 'check_circle');
 *         this.register(TbxMatSeverityLevel.Error, 'error');
 *         this.register(TbxMatSeverityLevel.Warning, 'warning_amber');
 *         this.register(TbxMatSeverityLevel.Information, 'info');
 *         this.register(TbxMatSeverityLevel.Help, 'help');
 *     }
 * }
 * ```
 *
 * @example Component consuming the service:
 * ```typescript
 * import { Component, inject, input } from '@angular/core';
 * import { MatIconModule } from '@angular/material/icon';
 * import { TbxMatSeverityLevel } from '@teqbench/tbx-mat-severity-theme';
 * // MyNotificationFontIconService is a hypothetical consumer-defined subclass
 * import { MyNotificationFontIconService } from './my-notification-font-icon.service';
 *
 * // NotificationComponent is a hypothetical consumer-defined component
 * @Component({
 *     selector: 'app-notification',
 *     imports: [MatIconModule],
 *     template: `
 *         <mat-icon [fontSet]="icons.fontSet">
 *             {{ icons.resolve(severity()) }}
 *         </mat-icon>
 *     `,
 * })
 * export class NotificationComponent {
 *     readonly icons = inject(MyNotificationFontIconService);
 *     readonly severity = input.required<TbxMatSeverityLevel>();
 * }
 * ```
 *
 * @category Services
 * @category Contract
 * @displayName Severity Font Icon Service
 * @order 3
 * @since 7.2.0
 * @related TbxMatSeverityResolver
 * @related TbxMatSeveritySvgIconService
 * @related TbxMatSeverityLevel
 *
 * @public
 */
export abstract class TbxMatSeverityFontIconService
    extends TbxMatFontIconService<TbxMatSeverityLevel>
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
