const {defaults} = require('jest-config');

const config = {
    ...defaults,
    "collectCoverage": true,
    "collectCoverageFrom": ['./src/**'],
    "coverageThreshold": {
        "global": {
            "lines": 80
        }
    },
    "coverageReporters": ["html"],
    "coverageDirectory": ["./coverage"],
    "setupFilesAfterEnv": ['./src/setupTests.ts']
};

module.exports = config
