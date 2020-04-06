module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules", "src"],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    automock: false,
    setupFilesAfterEnv: ["<rootDir>/setupJest.ts"]
};