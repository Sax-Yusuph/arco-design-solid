<a href="https://github.com/sax yusuph/arco-design-solid/tree/main/packages/hello#readme">
<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=arco-design-solid&background=tiles&project=Hello" alt="arco-design-solid Hello">
</p>

# Hello

Example hello world package in the arco-design-solid repository.

## Installation

```bash
npm install @arco-design-solid/hello
# or
yarn add @arco-design-solid/hello
# or
pnpm add @arco-design-solid/hello
```

## How to use it

```ts
import { createHello } from '@arco-design-solid/hello'

const [hello, setHello] = createHello()

hello() // => "Hello World!"

setHello('Solid')

hello() // => "Hello Solid!"
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).
