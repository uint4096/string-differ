# string-operational-transforms  


## Description  

A library to generate and perform operations on strings for operational-transforms implementations. This library can:  

* Generate operations to convert one string to another string.
* Apply a given set of operations to a string to transform it into another string.  

## Installation  

    npm i --save string-operational-transforms

## Usage  

This library uses a rough implementation of Levenshtein's algorithm to calculate the *edit distance* between two strings. It assumes that a string can be converted into another using 3 types of operations:
* **insertion**
* **retention**
* **deletion**

These types describe the operations that can be performed on string *s1* to convert it to string *s2*.
### Generate steps for conversion  

#### Character operations:  

Every step in the set of generated operations applies to one character in the base string (*s1*).  

```
import { getStepsForTransformation } from 'string-operational-transforms';

const s1 = 'initial string';
const s2 = 'final string';

const steps = getStepsForTransformation("Char", { s1, s2 });

console.log(steps);
```

will output:  

```
[
  { type: 'delete', value: 0 },
  { type: 'delete', value: 1 },
  { type: 'insert', value: 'f' },
  { type: 'retain', value: 2 },
  { type: 'delete', value: 3 },
  { type: 'delete', value: 4 },
  { type: 'insert', value: 'n' },
  { type: 'retain', value: 5 },
  { type: 'retain', value: 6 },
  { type: 'retain', value: 7 },
  { type: 'retain', value: 8 },
  { type: 'retain', value: 9 },
  { type: 'retain', value: 10 },
  { type: 'retain', value: 11 },
  { type: 'retain', value: 12 },
  { type: 'retain', value: 13 }
]
```
Please note that the *value* field in the above output represents the character's index in the base string (*s1*) for *delete* and *retain* operations, while for *insert* operations it specifies the character to be inserted.  

#### Range operations:  

This is a minor optimization over character operations. If the output type is specified as *"Range"*, certain consecutive operations of the same type are grouped together.  

```
import { getStepsForTransformation } from 'string-operational-transforms';

const s1 = 'initial string';
const s2 = 'final string';

const steps = getStepsForTransformation("Range", { s1, s2 });

console.log(steps);
```

will output:  

```
[
  { type: 'delete', startIndex: 0, endIndex: 1 },
  { type: 'insert', value: 'f' },
  { type: 'retain', startIndex: 2, endIndex: 2 },
  { type: 'delete', startIndex: 3, endIndex: 4 },
  { type: 'insert', value: 'n' },
  { type: 'retain', startIndex: 5, endIndex: 13 }
]
```
Please note that for *"Range"* output type, the *delete* and *retain* operations will have a *startIndex* and *endIndex* field which represent the range of indeices in the base string (*s1*). The *insert* operations, however, contain the *value* field which may specify one or more than one characters to be inserted.  

### Apply Operations to a String  

Given a set of operations, and a base string (*s1*), the ```transformString``` function can be used to apply the steps to *s1* to get the resultant string *s2*.

#### Range operations:  

```
import { transformString } from 'string-operational-transforms';

const operations = [
  { type: 'delete', startIndex: 0, endIndex: 1 },
  { type: 'insert', value: 'f' },
  { type: 'retain', startIndex: 2, endIndex: 2 },
  { type: 'delete', startIndex: 3, endIndex: 4 },
  { type: 'insert', value: 'n' },
  { type: 'retain', startIndex: 5, endIndex: 13 }
];

const s1 = 'base string';

const s2 = transformString("Range", s1, operations);
console.log(s2);
```

will output  

```'final string'```

#### Character operations:  

```
import { transformString } from 'string-operational-transforms';

const operations = [
  { type: 'delete', value: 0 },
  { type: 'delete', value: 1 },
  { type: 'insert', value: 'f' },
  { type: 'retain', value: 2 },
  { type: 'delete', value: 3 },
  { type: 'delete', value: 4 },
  { type: 'insert', value: 'n' },
  { type: 'retain', value: 5 },
  { type: 'retain', value: 6 },
  { type: 'retain', value: 7 },
  { type: 'retain', value: 8 },
  { type: 'retain', value: 9 },
  { type: 'retain', value: 10 },
  { type: 'retain', value: 11 },
  { type: 'retain', value: 12 },
  { type: 'retain', value: 13 }
];

const s1 = 'base string';

const s2 = transformString("Char", s1, operations);
console.log(s2);
```

will output  

```'final string'```


## License  

This library is distributed under the MIT License. See LICENSE.txt for more information.