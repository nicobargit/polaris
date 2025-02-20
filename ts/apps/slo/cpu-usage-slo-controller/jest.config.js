module.exports = {
    preset: '../../../jest.preset.js',
    globals: {
        'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
    },
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../coverage/apps/slo/cpu-usage-slo-controller',
    displayName: 'slo-cpu-usage-slo-controller',
    testEnvironment: 'node',
};
