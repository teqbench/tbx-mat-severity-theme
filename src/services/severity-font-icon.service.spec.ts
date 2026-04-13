import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
    TBX_MAT_FONT_ICON_DEFAULT_FONT_SET,
    TBX_MAT_ICON_FONT_SET_MATERIAL_SYMBOLS_OUTLINED,
} from '@teqbench/tbx-mat-icons';
import { TbxMatSeverityLevel } from '../enums/severity-level.enum';
import { TbxMatSeverityFontIconService } from './severity-font-icon.service';

@Injectable()
class TestSeverityFontIconService extends TbxMatSeverityFontIconService {
    constructor() {
        super();
    }

    protected override initialize(): void {
        super.initialize();
        this.register(TbxMatSeverityLevel.Default, 'chat_info');
        this.register(TbxMatSeverityLevel.Success, 'check_circle');
        this.register(TbxMatSeverityLevel.Error, 'cancel');
        this.register(TbxMatSeverityLevel.Warning, 'warning');
        this.register(TbxMatSeverityLevel.Information, 'info');
        this.register(TbxMatSeverityLevel.Help, 'help');
    }
}

function setup(): TestSeverityFontIconService {
    TestBed.configureTestingModule({
        providers: [
            TestSeverityFontIconService,
            {
                provide: TBX_MAT_FONT_ICON_DEFAULT_FONT_SET,
                useValue: TBX_MAT_ICON_FONT_SET_MATERIAL_SYMBOLS_OUTLINED,
            },
        ],
    });
    return TestBed.inject(TestSeverityFontIconService);
}

describe('TbxMatSeverityFontIconService', () => {
    it('should expose the fontSet from the injection token', () => {
        const service = setup();
        expect(service.fontSet).toBe(TBX_MAT_ICON_FONT_SET_MATERIAL_SYMBOLS_OUTLINED);
    });

    it('default() should return the registered icon identifier', () => {
        const service = setup();
        expect(service.default()).toBe('chat_info');
    });

    it('success() should return the registered icon identifier', () => {
        const service = setup();
        expect(service.success()).toBe('check_circle');
    });

    it('error() should return the registered icon identifier', () => {
        const service = setup();
        expect(service.error()).toBe('cancel');
    });

    it('warning() should return the registered icon identifier', () => {
        const service = setup();
        expect(service.warning()).toBe('warning');
    });

    it('information() should return the registered icon identifier', () => {
        const service = setup();
        expect(service.information()).toBe('info');
    });

    it('help() should return the registered icon identifier', () => {
        const service = setup();
        expect(service.help()).toBe('help');
    });

    it('resolve() should return the registered ligature for a valid severity level', () => {
        const service = setup();
        expect(service.resolve(TbxMatSeverityLevel.Default)).toBe('chat_info');
        expect(service.resolve(TbxMatSeverityLevel.Success)).toBe('check_circle');
        expect(service.resolve(TbxMatSeverityLevel.Error)).toBe('cancel');
        expect(service.resolve(TbxMatSeverityLevel.Warning)).toBe('warning');
        expect(service.resolve(TbxMatSeverityLevel.Information)).toBe('info');
        expect(service.resolve(TbxMatSeverityLevel.Help)).toBe('help');
    });

    it('resolve() should return undefined for an unknown key', () => {
        const service = setup();
        expect(service.resolve('unknown' as TbxMatSeverityLevel)).toBeUndefined();
    });
});
