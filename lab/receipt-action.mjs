import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// An original teaching model for this profile, not client implementation code.
// Calls must receive the most recent state. Persistence-level atomicity belongs
// in a database transaction or compare-and-swap, outside this sequential model.
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;

/** Create the immutable starting state of a receipt with no decision yet. */
export function createReceipt(receiptId) {
  if (!nonempty(receiptId)) throw new TypeError('A receipt needs a nonempty string ID.');
  return Object.freeze({ receiptId, decision: null, acceptedActionId: null });
}

/**
 * @param {ReturnType<typeof createReceipt>} receipt The latest valid state.
 * @param {unknown} input An action: { receiptId, actionId, choice: 'split'|'keep' }.
 * @returns {{receipt: object, outcome: string}} Rejections retain state identity.
 */
export function applyReceiptAction(receipt, input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)
    || !nonempty(input.receiptId) || !nonempty(input.actionId)
    || !['split', 'keep'].includes(input.choice)) {
    return { receipt, outcome: 'invalid' };
  }
  if (input.receiptId !== receipt.receiptId) {
    return { receipt, outcome: 'wrong-receipt' };
  }
  if (receipt.decision !== null) {
    const sameId = input.actionId === receipt.acceptedActionId;
    const outcome = sameId
      ? (input.choice === receipt.decision ? 'duplicate' : 'conflict')
      : 'stale';
    return { receipt, outcome };
  }
  return {
    receipt: Object.freeze({ ...receipt, decision: input.choice, acceptedActionId: input.actionId }),
    outcome: 'accepted',
  };
}

// Running this file prints the same trace shown in the profile field note.
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  let receipt = createReceipt('demo-receipt');
  for (const [choice, actionId] of [['split', 'tap-1'], ['split', 'tap-1'], ['keep', 'tap-2']]) {
    const result = applyReceiptAction(receipt, { receiptId: receipt.receiptId, actionId, choice });
    receipt = result.receipt;
    console.log(`${choice} / ${actionId} -> ${result.outcome}`);
  }
}
