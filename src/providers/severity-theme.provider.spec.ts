import { TestBed } from '@angular/core/testing';
import { TBX_MAT_SEVERITY_INVERTED_CLASS } from '../constants/severity-theme.constants';
import { TBX_MAT_SEVERITY_THEME_CONFIG } from '../tokens/severity-theme-config.token';
import { provideTbxMatSeverityTheme } from './severity-theme.provider';

function rootClassList(): DOMTokenList {
    return document.documentElement.classList;
}

describe('TBX_MAT_SEVERITY_THEME_CONFIG', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
        rootClassList().remove(TBX_MAT_SEVERITY_INVERTED_CLASS);
    });

    it('resolves to { invert: false } when no provider is registered', () => {
        TestBed.configureTestingModule({});
        expect(TestBed.inject(TBX_MAT_SEVERITY_THEME_CONFIG)).toEqual({ invert: false });
    });
});

describe('provideTbxMatSeverityTheme', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
        rootClassList().remove(TBX_MAT_SEVERITY_INVERTED_CLASS);
    });

    it('supplies the given config for the injection token', () => {
        TestBed.configureTestingModule({
            providers: [provideTbxMatSeverityTheme({ invert: true, applyToRoot: false })],
        });
        expect(TestBed.inject(TBX_MAT_SEVERITY_THEME_CONFIG)).toEqual({
            invert: true,
            applyToRoot: false,
        });
    });

    it('adds the inverted class to <html> when invert is true', () => {
        TestBed.configureTestingModule({
            providers: [provideTbxMatSeverityTheme({ invert: true })],
        });
        TestBed.inject(TBX_MAT_SEVERITY_THEME_CONFIG);
        expect(rootClassList().contains(TBX_MAT_SEVERITY_INVERTED_CLASS)).toBe(true);
    });

    it('removes the inverted class from <html> when invert is false', () => {
        rootClassList().add(TBX_MAT_SEVERITY_INVERTED_CLASS);
        TestBed.configureTestingModule({
            providers: [provideTbxMatSeverityTheme({ invert: false })],
        });
        TestBed.inject(TBX_MAT_SEVERITY_THEME_CONFIG);
        expect(rootClassList().contains(TBX_MAT_SEVERITY_INVERTED_CLASS)).toBe(false);
    });

    it('does not touch <html> when applyToRoot is false', () => {
        rootClassList().add(TBX_MAT_SEVERITY_INVERTED_CLASS);
        TestBed.configureTestingModule({
            providers: [provideTbxMatSeverityTheme({ invert: false, applyToRoot: false })],
        });
        TestBed.inject(TBX_MAT_SEVERITY_THEME_CONFIG);
        expect(rootClassList().contains(TBX_MAT_SEVERITY_INVERTED_CLASS)).toBe(true);
    });
});
