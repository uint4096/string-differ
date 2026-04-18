# string-differ

## Description

A zero-dependency library to compare and transform strings. This library can:

- Generate operations to convert one string to another string.
- Apply a given set of operations to a string to transform it into another string.

## Installation

    npm i string-differ

## Usage

This library uses a linear space implementation of Myers diff algorithm to calculate the _shortest edit script_ between two strings. It assumes that a string can be converted to another using 3 types of operations:

- **insertion**
- **retention**
- **deletion**

These types describe the operations that can be performed on string `s1` to convert it to string `s2`. Consecutive operations of the same type are grouped together.

### Generate Steps for Conversion

```ts
import { getStepsForTransformation } from 'string-differ';

const s1 = 'initial string';
const s2 = 'final string';

const steps = getStepsForTransformation({ s1, s2 });

console.log(steps);
```

will output:

```
[
  { type: 'delete', value: 'ini' },
  { type: 'insert', value: 'fin' },
  { type: 'delete', value: 't' },
  { type: 'delete', value: 'i' },
  { type: 'retain', value: 'al string' }
]
```

For all operations, the `value` field contains the relevant substring. For `delete` and `retain`, it's the substring from `s1`. For `insert`, it's the substring to be inserted from `s2`.

### Apply Operations to a String

Given a set of operations, the `transformString` function can be used to apply the steps to get the resultant string `s2`.

```ts
import { transformString } from 'string-differ';

const operations = [
  { type: 'delete', value: 'ini' },
  { type: 'insert', value: 'fin' },
  { type: 'delete', value: 't' },
  { type: 'delete', value: 'i' },
  { type: 'retain', value: 'al string' }
];

const s2 = transformString(operations);
console.log(s2);
```

will output:

`'final string'`

## License

This library is distributed under the LGPL-3.0 License. See [LICENSE](LICENSE) for more information.
