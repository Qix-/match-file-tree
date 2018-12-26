# match-file-tree [![CircleCI](https://circleci.com/gh/Qix-/match-file-tree.svg?style=svg)](https://circleci.com/gh/Qix-/match-file-tree)

A simple alternative to `globby` when a regex will suffice.

```javascript
const matchFileTree = require('match-file-tree');


matchFileTree(/\.js$/).then(results => console.log(result));
```

## Usage

```javascript
const matchFileTree = require('match-file-tree');

const regex = /\.jsx?$/;
const rootDirectory = process.cwd(); // The default

const promise = matchFileTree(regex, rootDirectory);

promise.then(files => console.log(files));
```

# License

Copyright &copy; 2018 by Josh Junon. Released under the [MIT License](LICENSE).
