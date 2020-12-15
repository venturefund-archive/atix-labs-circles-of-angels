module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['<rootDir>/test/**/*.js'],
  testPathIgnorePatterns: ['/node_modules/', '/test/mocks/'],
  moduleDirectories: ['node_modules', __dirname],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>//test/mocks/files.js',
    '\\.(css|sass|scss)$': '<rootDir>/test/mocks/styles.js'
  }
};
