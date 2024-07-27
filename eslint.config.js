import Globals from 'globals';
import HapiPlugin from '@hapi/eslint-plugin';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['node_modules/**', 'dist/**', '.tshy/**'],
    },
    {
        files: ['**/*.ts', '**/*.cjs'],
    },
    ...HapiPlugin.configs.module,
    ...tseslint.configs.recommended,
    prettierPluginRecommended,
    {
        languageOptions: {
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
            },
            globals: {
                ...Globals.browser,
                ...Globals.es2021,
            },
        },
        rules: {
            '@hapi/scope-start': 0,
            '@typescript-eslint/no-explicit-any': 0,
            'prettier/prettier': 'error',
        },
    },
);
