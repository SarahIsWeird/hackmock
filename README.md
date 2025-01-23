# {hackmock}

A WIP collection of mock object for hackmud. The goal is for existing scripts not having to be changed
to be used with this, at least within reason:

- While `#db` will be supported, it won't have the full range of MongoDB features.
  Maybe someone knows a good in-memory MongoDB :)
- Player scripts can obviously not be called, unless you import the source.

## Examples (not final and not yet functional!)

```js
import { test, suite } from 'uvu';
import * as assert from 'uvu/assert';
import { $fs, $hs, resetMocks } from 'hackmock';

// Reset all mocks to their default state.
test.before.each(() => resetMocks());

test('scripts.lib', () => {
    // Same naming convention as hackmud-script-manager, using $ instead of #
    const lib = $fs.scripts.lib();

    assert.is(lib.clamp(101, 0, 100), 100);
});

// This function might be part of an acct_nt solver. It can be unit-tested
// without changing it.

const getOutboundTransactions = () => {
    // Could also just be { count: 'all', from: 'sarahisweird' }.
    const txs = $hs.accts.transactions({ count: 'all' });
    return txs.filter(({ sender }) => sender === 'sarahisweird');
};

const acct_nt = suite('acct_nt');
acct_nt.before.each(() => resetMocks());

acct_nt('Transactions can be filtered', () => {
    // resetMocks can also accept default values.
    resetMocks({ transactions: [
        { time: new Date(), amount: 1, sender: 'sarahisweird', recipient: 'trust', script: null },
        { time: new Date(), amount: 2, sender: 'trust', recipient: 'sarahisweird', script: null },
    ]});

    // Mapped for brevity.
    assert.equal(getOutboundTransactions().map(tx => tx.amount), [ 1 ]);
});
```
