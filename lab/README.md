# Two deliveries. One decision.

This small model accompanies [Jon's illustrated profile](../README.md). It illustrates a rule discussed in the public [Trackbill case study](https://jnwync.vercel.app/work/trackbill): a receipt gets one valid Split/No decision, even when actions arrive again or arrive late.

The example is original teaching code written for this repository. It is not extracted from a client codebase. Here, `keep` represents declining the split.

## Try it

With Node.js installed, no packages are needed:

```sh
git clone https://github.com/jnwync/jnwync.git
cd jnwync
node lab/receipt-action.mjs
node --test lab/receipt-action.test.mjs
```

The demonstration prints:

```text
split / tap-1 -> accepted
split / tap-1 -> duplicate
keep / tap-2 -> stale
```

## What the rule preserves

- A pending receipt accepts either `split` or `keep`.
- Replaying the same accepted action returns `duplicate`, preserving the original state.
- Reusing its ID with a different choice returns `conflict`.
- A different action arriving after the decision returns `stale`.
- Invalid input or an action for another receipt has no effect.

The state is immutable. Each call must receive the latest returned receipt.

## Where this sketch stops

This is a sequential state transition, not a distributed lock. Two handlers reading separate pending snapshots could both accept locally. A production implementation must enforce acceptance at the persistence boundary, with a transaction or compare-and-swap, before triggering effects. Authentication and authorization also belong outside this model.

The [tests](receipt-action.test.mjs) check the decision rule, conflicting input, malformed commands, and preservation of state. They do not claim to test a production service.
