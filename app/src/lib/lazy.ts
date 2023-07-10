import { lazy } from 'react';

const DELAY: number = 2000;

export function delayedLazy (callback: any) {
    if (DELAY === 0) return lazy(callback);

    return lazy(() => new Promise((r) => setTimeout(r, DELAY)).then(callback));
}
