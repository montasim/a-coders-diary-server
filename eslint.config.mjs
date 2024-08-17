/**
 * ESLint Configuration File
 * @fileoverview This configuration file sets up linting rules and environments for a JavaScript project focusing on ES6 standards.
 * It includes settings for ECMAScript 2020 features, enforces coding styles, and configures plugins for additional linting capabilities.
 */

export default {
    // Specifies the types of files ESLint will lint
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],

    // Language options define the ECMAScript features and global variables
    languageOptions: {
        ecmaVersion: 2020, // Allows parsing of modern ECMAScript features
        sourceType: 'module', // Treats files as ECMAScript modules
        globals: {
            jest: 'readonly', // Indicates global variables provided by Jest that should not be overwritten
        },
    },

    // Linter options for managing the linting process
    linterOptions: {
        reportUnusedDisableDirectives: true, // Reports unused eslint-disable comments
    },

    // Plugins extend ESLint with new settings, environments, rules, and so on
    plugins: {
        jest: {}, // Adds Jest testing support
        security: {}, // Adds additional rules for security
        prettier: {}, // Integrates Prettier for code formatting
    },

    // Rules define how ESLint applies linting to the code
    rules: {
        'no-console': ['warn', { allow: ['error', 'table'] }], // Warns about console usage except for console.error and console.table
        'func-names': 'off', // Turns off the requirement to name functions
        'no-underscore-dangle': 'off', // Allows dangling underscores in identifiers
        'consistent-return': 'off', // Does not require function return values to be consistent
        'jest/expect-expect': 'off', // Turns off a rule that expects a Jest test to have an assertion
        'security/detect-object-injection': 'off', // Disables a security rule about object injection that may not be applicable
        quotes: [
            'error', // Enforces the use of single quotes
            'single',
            { avoidEscape: true, allowTemplateLiterals: true },
        ],
        semi: ['error', 'always'], // Requires semicolons at the end of statements
        'prefer-arrow-callback': ['error', { allowNamedFunctions: false }], // Enforces the use of arrow functions for callbacks
        'prefer-const': 'error', // Requires use of const for variables that are never reassigned
        'arrow-spacing': ['error', { before: true, after: true }], // Enforces space around the arrow of arrow functions
        'no-var': 'error', // Requires let or const, not var
        'object-shorthand': ['error', 'always'], // Requires object literal shorthand syntax
        'prefer-template': 'error', // Prefers template literals over string concatenation
        eqeqeq: ['error', 'always'], // Enforces the use of strict equality (===)
        'template-curly-spacing': 'error', // Enforces spacing around embedded expressions of template strings
        'prefer-rest-params': 'error', // Suggests using rest parameters instead of arguments
        'no-new-symbol': 'error', // Disallows new operators with the Symbol object
        'symbol-description': 'error', // Requires a description when creating symbols
        'prefer-spread': 'error', // Prefer the use of the spread operator (...) to call variadic functions
        'no-duplicate-imports': 'error', // Disallows duplicate imports
    },

    // Paths to ignore during linting
    ignores: [
        '.idea/**', // Ignores all files in the .idea folder
        '.yarn/**', // Ignores all files in the .yarn folder
        'node_modules/**', // Ignores all files in node_modules
        'build/**', // Ignores all files in the build output directory
        'logs/**', // Ignores log files
        'yarn.lock', // Ignores the yarn lock file
        'src/modules/api/documentation/**', // Ignores documentation files
    ],
};
