module.exports = {
    preset: 'ts-jest',
    modulePaths: ['<rootDir>/app'],
    modulePathIgnorePatterns: [
        '<rootDir>/dist/'
    ],
    // moduleNameMapper: {
    //     '\\.css$': '<rootDir>/src/mocks/styleMock.ts',
    // },
    setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
    // snapshotSerializers: ['@emotion/jest/serializer'],
    testEnvironment: 'jsdom',
    // transformIgnorePatterns: ['node_modules/(?!(@mui|@babel)/)'],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        // "^.+\\.(js|jsx)$": 'babel-jest',
    },
};
