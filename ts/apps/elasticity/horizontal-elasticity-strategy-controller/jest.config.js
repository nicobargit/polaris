module.exports = {
    displayName: 'elasticity-horizontal-elasticity-strategy-controller',
    preset: '../../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../../coverage/apps/elasticity/horizontal-elasticity-strategy-controller',
    testEnvironment: 'node',
};
