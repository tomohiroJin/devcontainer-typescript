import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const expectedNode = readFileSync(new URL('../.nvmrc', import.meta.url), 'utf8').trim();
const { packageManager } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);
assert.equal(process.version, `v${expectedNode}`, 'Node.js must match .nvmrc');
assert.ok(process.env.npm_execpath, 'Run this check using npm run check:runtime');
const actualNpm = execFileSync(process.execPath, [process.env.npm_execpath, '--version'], {
  encoding: 'utf8',
}).trim();
assert.equal(`npm@${actualNpm}`, packageManager, 'npm must match packageManager');

if (process.argv.includes('--headers')) {
  const headers = readFileSync('/usr/local/include/node/node_version.h', 'utf8');
  const headerVersion = ['MAJOR', 'MINOR', 'PATCH']
    .map((part) => {
      const match = headers.match(new RegExp(`^#define NODE_${part}_VERSION\\s+(\\d+)`, 'm'));
      assert.ok(match, `Missing NODE_${part}_VERSION in Node.js headers`);
      return match[1];
    })
    .join('.');
  assert.equal(headerVersion, expectedNode, 'Node.js headers must match .nvmrc');
}

console.log(`Runtime matches project configuration: ${process.version}, npm ${actualNpm}`);
