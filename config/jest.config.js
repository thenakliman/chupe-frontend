module.exports = {
  "rootDir": "../",
  "verbose": true,
  "collectCoverage": true,
  "testRegex": "spec.js$",
  "collectCoverageFrom": ["*src/**/*.{js/jsx}"],
  "setupFiles": ["<rootDir>/config/setup.js"],
  "moduleNameMapper": {
        "\\.(css|scss|jpg|png)$": "identity-obj-proxy"
      }
}