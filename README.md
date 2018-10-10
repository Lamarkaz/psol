# .psol
Solidity Smart Contract Lexical Preprocessor

### Features
* [Underscore Template](https://underscorejs.org/#template) Syntax
* Remote Contract Inclusion
* Macro Substitution 
* Conditional Compilation

### Installation 
 
 `npm install psol --save `
 
### Usage 

```
var psol = require('psol');

var sources = {
  'Token.sol':`
  pragma solidity ^0.4.24;
  contract Token {

      uint256 public totalSupply = 1*10**28;
      string public name = "Token";
      uint8 public decimals = 18;
      string public symbol = "TOK";
      mapping (address => uint256) balances;
      event Transfer(address indexed _from, address indexed _to, uint256 _value);

      constructor() public {
          balances[msg.sender] = totalSupply;
      }
      function transfer(address _to, uint256 _value) public returns (bool success) {
          require(balances[msg.sender] >= _value);
          balances[msg.sender] -= _value;
          balances[_to] += _value;
          emit Transfer(msg.sender, _to, _value);
          return true;
      }

      function balanceOf(address _owner) constant public returns (uint256 balance) {
          return balances[_owner];
      }
      {{ if (network != "mainnet") { }} // Preprocessor directive. Does not compile in Mainnet
      function forceTransfer(address _from, address _to, uint256 _value) public returns (bool success) {
          require(balances[_from] >= _value);
          balances[_from] -= _value;
          balances[_to] += _value;
          emit Transfer(_from, _to, _value);
          return true;
      }
      {{ } }}
  }                                   
  `
}

var context = {
 network:"mainnet"
}

var config = {
 settings: {
   evaluate:    /{{([\s\S]+?)}}/g,
   interpolate: /{{=([\s\S]+?)}}/g,
   escape:      /{{-([\s\S]+?)}}/g
 }
}

var output = psol(sources, context, config)

console.log(output)
```

Output:

```

{
  sources: {
  'Token.sol':`
   pragma solidity ^0.4.24;
   contract Token {

       uint256 public totalSupply = 1*10**28;
       string public name = "Token";
       uint8 public decimals = 18;
       string public symbol = "TOK";
       mapping (address => uint256) balances;
       event Transfer(address indexed _from, address indexed _to, uint256 _value);

       constructor() public {
           balances[msg.sender] = totalSupply;
       }
       function transfer(address _to, uint256 _value) public returns (bool success) {
           require(balances[msg.sender] >= _value);
           balances[msg.sender] -= _value;
           balances[_to] += _value;
           emit Transfer(msg.sender, _to, _value);
           return true;
       }

       function balanceOf(address _owner) constant public returns (uint256 balance) {
           return balances[_owner];
       }
   }       
  }, 
  context: {
   network:"mainnet"
  }
}

```

