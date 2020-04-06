module.exports = {
    verbose: true,
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleDirectories: ["node_modules", "src"],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    automock: false,
    setupFilesAfterEnv: ["<rootDir>/setupJest.js"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    snapshotSerializers: ["enzyme-to-json/serializer"],
    globals: {
        window: true,
        NODE_ENV: "test",
        "ts-jest": {
            tsConfig: "./tsconfig.jest.json"
        }
    }
};