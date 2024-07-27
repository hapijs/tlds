import { TLDS } from './tlds.js';

export const tlds = new Set(TLDS.map((tld) => tld.toLowerCase()));
