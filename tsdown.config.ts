import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['./lib/index.ts'],
    outDir: './dist',
    // clean:false — tsdown's default `clean: true` resolved its target to the
    // project root and wiped the working tree. dist is managed explicitly instead.
    clean: false,
    // exports:false — do not let tsdown rewrite package.json on build.
    exports: false,
    // hash:false — emit stable dist/index.js + dist/index.d.ts (no content hash)
    // so package.json `types`/`exports` point at fixed filenames.
    hash: false,
    format: 'esm',
    target: 'node22',
});
