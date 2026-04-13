import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { TbxMatSeverityLevel } from '../enums/severity-level.enum';
import { TbxMatSeveritySvgIconService } from './severity-svg-icon.service';

const SVG_STUB = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

@Injectable()
class TestSeveritySvgIconService extends TbxMatSeveritySvgIconService {
    protected override initialize(): void {
        super.initialize();
        this.register(TbxMatSeverityLevel.Default, SVG_STUB);
        this.register(TbxMatSeverityLevel.Success, SVG_STUB);
        this.register(TbxMatSeverityLevel.Error, SVG_STUB);
        this.register(TbxMatSeverityLevel.Warning, SVG_STUB);
        this.register(TbxMatSeverityLevel.Information, SVG_STUB);
        this.register(TbxMatSeverityLevel.Help, SVG_STUB);
    }
}

function setup(): TestSeveritySvgIconService {
    TestBed.configureTestingModule({
        imports: [MatIconTestingModule],
        providers: [TestSeveritySvgIconService],
    });
    return TestBed.inject(TestSeveritySvgIconService);
}

describe('TbxMatSeveritySvgIconService', () => {
    it('default() should return the registered icon name', () => {
        const service = setup();
        expect(service.default()).toBe(TbxMatSeverityLevel.Default);
    });

    it('success() should return the registered icon name', () => {
        const service = setup();
        expect(service.success()).toBe(TbxMatSeverityLevel.Success);
    });

    it('error() should return the registered icon name', () => {
        const service = setup();
        expect(service.error()).toBe(TbxMatSeverityLevel.Error);
    });

    it('warning() should return the registered icon name', () => {
        const service = setup();
        expect(service.warning()).toBe(TbxMatSeverityLevel.Warning);
    });

    it('information() should return the registered icon name', () => {
        const service = setup();
        expect(service.information()).toBe(TbxMatSeverityLevel.Information);
    });

    it('help() should return the registered icon name', () => {
        const service = setup();
        expect(service.help()).toBe(TbxMatSeverityLevel.Help);
    });

    it('resolve() should return the icon name for a valid severity level', () => {
        const service = setup();
        expect(service.resolve(TbxMatSeverityLevel.Default)).toBe('default');
        expect(service.resolve(TbxMatSeverityLevel.Success)).toBe('success');
        expect(service.resolve(TbxMatSeverityLevel.Error)).toBe('error');
        expect(service.resolve(TbxMatSeverityLevel.Warning)).toBe('warning');
        expect(service.resolve(TbxMatSeverityLevel.Information)).toBe('information');
        expect(service.resolve(TbxMatSeverityLevel.Help)).toBe('help');
    });

    it('resolve() should return undefined for an unknown key', () => {
        const service = setup();
        expect(service.resolve('unknown' as TbxMatSeverityLevel)).toBeUndefined();
    });
});
