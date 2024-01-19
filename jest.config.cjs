module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.cjs'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.(svg)$': '<rootDir>/src/constants/index.tsx'
    }
};
