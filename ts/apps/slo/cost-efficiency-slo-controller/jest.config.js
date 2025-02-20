module.exports = {
    displayName: 'slo-cost-efficiency-slo-controller',
    preset: '../../../jest.preset.js',
    globals: {
        'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
    },
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../coverage/apps/slo/cost-efficiency-slo-controller',
    testEnvironment: 'node',
};
