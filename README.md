# Test maker

Intended to be used by blog team for their test making needs. According to the agreed upon guidelines.

## Setup

Run `npm run build`

## Usage

Can be used with `node ./dist/index.js path-to-test-file`

## Behaviour

1. This script should always generate a test file if a .ts file is provided.
1. It tries to guess if it's an integration test or a unit test and uses appropriate template
1. If something goes wrong while gathering data for scaffolding, it tries to fall back to a simpler structure not requiring parsing
