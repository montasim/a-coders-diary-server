/**
 * Jest Configuration File
 * @fileoverview This configuration file sets up Jest for testing JavaScript and TypeScript projects.
 * It includes settings for transforming files with Babel and configuring the test environment.
 */

export default {
    /**
     * Transform settings for Jest.
     * @type {Object}
     * @property {string} '\\.[jt]sx?$' - Regex pattern for matching JavaScript and TypeScript files.
     * @property {string} 'babel-jest' - Transformer module to use for transforming the matched files.
     */
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },

    /**
     * Specifies the test environment that will be used for testing.
     * @type {string}
     */
    testEnvironment: 'node',
};
