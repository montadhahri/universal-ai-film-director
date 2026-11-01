'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const pack = require('../agent-acceptance/cinematography-cases.json');

test('CIN-01–CIN-06 are distinct external-agent scenarios with private criteria', () => {
  assert.equal(pack.skill, 'film-cinematography');
  assert.equal(pack.execution, 'external-agent-only');
  assert.deepEqual(pack.cases.map(c => c.id), ['CIN-01','CIN-02','CIN-03','CIN-04','CIN-05','CIN-06']);
  assert.equal(new Set(pack.cases.map(c => c.prompt)).size, 6);
  for (const c of pack.cases) {
    assert.ok(c.prompt.length > 180, c.id);
    assert.ok(c.expected.length >= 4, c.id);
    assert.equal(new Set(c.expected).size, c.expected.length);
    assert.match(c.prompt, /PROPOSED/);
  }
});
test('Cinematography pack does not modify the canonical V2-03 acceptance suite', () => {
  const base = require('../agent-acceptance/cases.json');
  assert.equal(base.cases.length, 14);
  assert.ok(!base.cases.some(c => pack.cases.some(v => v.id === c.id)));
});
test('CIN-02 source and edit time are intentionally different', () => {
  const c = pack.cases.find(c => c.id === 'CIN-02');
  assert.match(c.prompt, /7s/);
  assert.match(c.prompt, /6s/);
  assert.match(c.prompt, /6–7s/);
  assert.ok(c.expected.some(e => e.includes('12s')));
});
