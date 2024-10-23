import { TLDS } from './tlds';

export const tlds = new Set(TLDS.map((tld) => tld.toLowerCase()));
