import { TLDS } from './tlds.ts';

export const tlds = new Set(TLDS.map((tld) => tld.toLowerCase()));
