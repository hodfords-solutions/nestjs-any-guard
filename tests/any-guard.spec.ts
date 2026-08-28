import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { FirstSuccessGuard, HasHeaderGuard } from '../lib/index.js';

function createContext(headers: Record<string, string>): ExecutionContext {
    return {
        switchToHttp: () => ({ getRequest: () => ({ headers }) })
    } as unknown as ExecutionContext;
}

describe('package entry', () => {
    it('exports something', async () => {
        const mod = await import('../lib/index.js');
        expect(Object.keys(mod).length).toBeGreaterThan(0);
    });
});

describe('HasHeaderGuard', () => {
    it('allows the request when the header equals "true"', () => {
        const guard: CanActivate = new (HasHeaderGuard('x-allowed'))();
        expect(guard.canActivate(createContext({ 'x-allowed': 'true' }))).toBe(true);
    });

    it('denies the request when the header is missing', () => {
        const guard: CanActivate = new (HasHeaderGuard('x-allowed'))();
        expect(guard.canActivate(createContext({}))).toBe(false);
    });
});

describe('FirstSuccessGuard', () => {
    class DenyGuard implements CanActivate {
        canActivate(): boolean {
            return false;
        }
    }

    class AllowGuard implements CanActivate {
        canActivate(): boolean {
            return true;
        }
    }

    it('passes when at least one guard succeeds', async () => {
        const GuardClass = FirstSuccessGuard(DenyGuard, AllowGuard);
        const moduleRef = await Test.createTestingModule({
            providers: [DenyGuard, AllowGuard, GuardClass]
        }).compile();
        await moduleRef.init();

        const guard = moduleRef.get<CanActivate>(GuardClass);
        await expect(guard.canActivate(createContext({}))).resolves.toBe(true);
    });

    it('fails when every guard denies', async () => {
        const GuardClass = FirstSuccessGuard(DenyGuard);
        const moduleRef = await Test.createTestingModule({
            providers: [DenyGuard, GuardClass]
        }).compile();
        await moduleRef.init();

        const guard = moduleRef.get<CanActivate>(GuardClass);
        await expect(guard.canActivate(createContext({}))).resolves.toBe(false);
    });
});
