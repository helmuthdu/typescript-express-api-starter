module.exports = function (w) {

    return {
        files: [
            'src/**/*.ts'
        ],

        tests: [
            'test/**/*Spec.ts'
        ],

        env: {
            type: 'node'
        },

        compilers: {
            '**/*.ts': w.compilers.typeScript({ module: 'commonjs' })
        },

        setup (wallaby) {
            const jestConfig = require('./package').jest || require('./jest.config');
            delete jestConfig.transform['^.+\\.tsx?$'];
            wallaby.testFramework.configure(jestConfig);
        },

        testFramework: 'jest',

        debug: true
    };
};