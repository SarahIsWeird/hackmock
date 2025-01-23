import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { $fs } from '../src/main';

const lib = $fs.scripts.lib();

test('add_time', () => {
    const assertDatesEqual = (date1: Date, date2: Date) =>
        assert.is(date1.toISOString(), date2.toISOString());

    const someDate = new Date('2025-01-23T20:00:00.000Z');

    assertDatesEqual(lib.add_time(someDate, 0), someDate);
    assertDatesEqual(lib.add_time(someDate, 1000), new Date('2025-01-23T20:00:01.000Z'));
    assertDatesEqual(lib.add_time(someDate, -1000), new Date('2025-01-23T19:59:59.000Z'));
});

test('caller_is_owner', () => {
    const makeContext = (caller: string, this_script: string) => ({
        caller,
        calling_script: null,
        this_script,
        rows: 69,
        cols: 420,
    });

    assert.ok(lib.caller_is_owner(makeContext('sarahisweird', 'sarahisweird.test')));
    assert.ok(lib.caller_is_owner(makeContext('foo', 'foo.foo')));

    assert.not(lib.caller_is_owner(makeContext('sahara', 'sarahisweird.test')));
    assert.not(lib.caller_is_owner(makeContext('bar', 'foo.bar')));
});

// How to test can_continue_execution?

test('cap_str_len', () => {
    assert.is(lib.cap_str_len('abc', 3), 'abc');
    assert.is(lib.cap_str_len('abcdefg', 5), 'abcde');
    assert.is(lib.cap_str_len('hi', 10), 'hi');
    assert.is(lib.cap_str_len('abc', 0), '');
    assert.is(lib.cap_str_len('', 1), '');
});

test('clamp', () => {
    assert.is(lib.clamp(1, 0, 2), 1);
    assert.is(lib.clamp(3, 0, 2), 2);
    assert.is(lib.clamp(-1, 0, 2), 0);
});

test.run();
