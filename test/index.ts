import { describe, expect, it } from 'vitest';

import { tlds } from '../src/index.js';

describe('email', () => {
    it('available as direct require', () => {
        expect(tlds.has('com')).toBe(true);
    });
});
