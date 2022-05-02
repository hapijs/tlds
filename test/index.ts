import { expect } from '@hapi/code';
import * as Lab from '@hapi/lab';

import { tlds } from '../src';

const { describe, it } = (exports.lab = Lab.script());

describe('email', () => {
    it('available as direct require', () => {
        expect(tlds.has('com')).to.be.true();
    });
});
