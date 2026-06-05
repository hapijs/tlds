import { describe, expect, it } from 'vitest';

import { tlds } from '../lib/index.ts';

describe('email', () => {
    it('available as direct require', () => {
        expect(tlds.has('com')).toBe(true);
    });
});
