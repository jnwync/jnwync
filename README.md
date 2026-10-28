<a href="https://jnwync.vercel.app/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/redline-hero-dark.svg">
    <img src="./assets/redline-hero-light.svg" alt="jnwync. — Jon Wayne Cabusbusan. Made to click." width="1200">
  </picture>
</a>

**Jon Wayne Cabusbusan · Full-stack web + mobile engineer · Iloilo, Philippines**

I make things people click, tap, edit, and occasionally press twice. That last part gets interesting.

React, Next.js, TypeScript, Node.js, and React Native are my usual tools. I use AI to explore and iterate; the decisions, review, and verification stay with me.

[Explore my work](https://jnwync.vercel.app/#projects) · [Run a small experiment](./lab/README.md) · [Resume](https://jnwync.vercel.app/cv.pdf) · [Email](mailto:jonwayne.cabusbusan@gmail.com)

<br>

<a href="https://jnwync.vercel.app/work/trackbill">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/trackbill-dark.svg">
    <img src="./assets/trackbill-light.svg" alt="Trackbill. Concept illustration: the same receipt action delivered twice produces one accepted decision." width="1000">
  </picture>
</a>

### Same receipt. Same action. Again.

For **[Trackbill](https://jnwync.vercel.app/work/trackbill)**, I worked on making one valid Split/No decision stick—even when an action arrived late or arrived again. Contract product engineering for **Inertia**, across Next.js, Express/Prisma, and Expo/React Native. [Visit the product ↗](https://trackbill.ai)

<details>
  <summary>Go on. Press it twice.</summary>

  The work used atomic state commits, duplicate/stale rejection, localized feedback, and regression coverage across Meta and Evolution webhook paths.

  Here's a small, original teaching model of the rule. Same input, second delivery; the first decision stays put.

  | Delivery | Result |
  | :-- | :-- |
  | `split / tap-1` | **accepted** |
  | `split / tap-1` | duplicate |
  | `keep / tap-2` | stale |

  `keep` means declining the split. This is a sequential model; distributed acceptance needs a transaction or compare-and-set at the persistence boundary.

  [Run it](./lab/README.md) · [Read the source](./lab/receipt-action.mjs) · [Challenge the tests](./lab/receipt-action.test.mjs)
</details>

<br>

<a href="https://jnwync.vercel.app/work/reisky">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/reisky-dark.svg">
    <img src="./assets/reisky-light.svg" alt="Reisky Martial Arts. Actual website screenshot, framed beside a typed-content boundary." width="1000">
  </picture>
</a>

### The editor changes things. Good.

I designed and built **[Reisky Martial Arts](https://jnwync.vercel.app/work/reisky)** a digital home in Next.js and TypeScript. Behind the page: a typed bridge from Sanity content to application models, so content can change without teaching every component how the CMS works. **Freelance design + development.** [Visit the website ↗](https://reisky.vercel.app)

<details>
  <summary>Does the page have to speak GROQ?</summary>

  The content layer does. The page gets application types.

  TypeGen feeds unit-tested mappers that translate Sanity content into domain types. A feature flag selects Sanity or static data behind the same contract. It's an explicit switch, rather than automatic outage recovery.
</details>

<br>

<a href="https://jnwync.vercel.app/work/okra">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/okra-dark.svg">
    <img src="./assets/okra-light.svg" alt="OKRa. Concept diagram: access depends on both role and workspace scope." width="1000">
  </picture>
</a>

### A shared board. Some very unshared permissions.

For **[OKRa](https://jnwync.vercel.app/work/okra)**, I worked on workspace-scoped access and realtime updates, with shared TypeScript/Zod contracts connecting the React and API layers. **Project-based full-stack work at Mashup Technology Ventures**, using PostgreSQL and Drizzle.

<details>
  <summary>“Everyone can see it” needs a few more conditions.</summary>

  Role- and workspace-scoped permissions protect the workflows. Auth.js sessions and route protection handle identity; server-sent events with PostgreSQL LISTEN/NOTIFY carry board updates.

  The useful part is where those pieces meet: the right person, in the right workspace, receiving the right update.
</details>

<br>

<a href="mailto:jonwayne.cabusbusan@gmail.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/redline-close-dark.svg">
    <img src="./assets/redline-close-light.svg" alt="Your move. Email Jon Wayne about an interesting problem." width="1000">
  </picture>
</a>

Got a good “what happens if…”? I'd like to hear it.

[jonwayne.cabusbusan@gmail.com](mailto:jonwayne.cabusbusan@gmail.com) · [LinkedIn](https://www.linkedin.com/in/jnwync/) · [More work](https://jnwync.vercel.app/)
