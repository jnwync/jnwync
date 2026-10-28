import assert from 'node:assert/strict';
import test from 'node:test';
import { applyReceiptAction, createReceipt } from './receipt-action.mjs';

const command = (overrides = {}) => ({
  receiptId: 'receipt-1', actionId: 'tap-1', choice: 'split', ...overrides,
});

test('either valid decision can be accepted exactly once', () => {
  for (const choice of ['split', 'keep']) {
    const original = createReceipt('receipt-1');
    const result = applyReceiptAction(original, command({ choice }));
    assert.equal(result.outcome, 'accepted');
    assert.equal(result.receipt.decision, choice);
    assert.equal(original.decision, null);
    assert.ok(Object.isFrozen(result.receipt));
  }
});

test('replayed delivery preserves the original decision and state identity', () => {
  const first = applyReceiptAction(createReceipt('receipt-1'), command());
  const replay = applyReceiptAction(first.receipt, command());
  assert.equal(replay.outcome, 'duplicate');
  assert.strictEqual(replay.receipt, first.receipt);
});

test('a late second decision cannot overwrite the first one', () => {
  const first = applyReceiptAction(createReceipt('receipt-1'), command());
  const late = applyReceiptAction(first.receipt, command({ actionId: 'tap-2', choice: 'keep' }));
  assert.equal(late.outcome, 'stale');
  assert.strictEqual(late.receipt, first.receipt);
  assert.equal(late.receipt.decision, 'split');
});

test('reusing an action ID with a different payload is a conflict, not a replay', () => {
  const first = applyReceiptAction(createReceipt('receipt-1'), command());
  const conflict = applyReceiptAction(first.receipt, command({ choice: 'keep' }));
  assert.equal(conflict.outcome, 'conflict');
  assert.strictEqual(conflict.receipt, first.receipt);
});

test('an action for another receipt cannot change this receipt', () => {
  const original = createReceipt('receipt-1');
  const wrong = applyReceiptAction(original, command({ receiptId: 'receipt-2' }));
  assert.equal(wrong.outcome, 'wrong-receipt');
  assert.strictEqual(wrong.receipt, original);
});

test('malformed commands have no effect on either pending or decided receipts', () => {
  const pending = createReceipt('receipt-1');
  const decided = applyReceiptAction(pending, command()).receipt;
  const invalid = [null, [], {}, command({ choice: 'refund' }), command({ actionId: '' }), command({ actionId: 7 }), command({ receiptId: ' ' })];
  for (const receipt of [pending, decided]) {
    for (const input of invalid) {
      const result = applyReceiptAction(receipt, input);
      assert.equal(result.outcome, 'invalid');
      assert.strictEqual(result.receipt, receipt);
    }
  }
});

test('receipt identifiers must be nonempty strings', () => {
  for (const id of [undefined, null, '', ' ', 7]) {
    assert.throws(() => createReceipt(id), TypeError);
  }
});
