# psol
Solidity Smart Contract Lexical Preprocessor

### Features
* Remote Contract Inclusion
* Macro Substitution 
* Conditional Compilation

### Installation 
 
 `npm install psol --save `
 
### Usage 

```
var psol = require('psol');

var sources = {
  'Token.sol':{
   
  }
}

var context = {

}

var config = {

}

var output = psol(sources, context, config)

console.log(output)
```

Output:

```

{
  sources: sources, 
  context: context
}

```

