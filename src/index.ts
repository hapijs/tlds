import { TLDS } from './tlds.js';

export const tlds: Set<string> = new Set(TLDS.map((tld) => tld.toLowerCase()));
