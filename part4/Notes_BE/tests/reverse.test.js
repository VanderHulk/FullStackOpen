// basic unit testing
// test pure function

const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
    const result = reverse('a')
    // assert to state a fact or belief confidently and forcefully
    // declare something as true
    assert.strictEqual(result, 'a')
})

test('reverse of react', () => {
    const result = reverse('react')
    assert.strictEqual(result, 'tcaer')
})

test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')
    assert.strictEqual(result, 'saippuakauppias')
})