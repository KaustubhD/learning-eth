# Solidity course

### Functions

#### Setter and getter
1. Writing = Transaction
2. Reading = Call

##### Call
  * Against a local node.
  * Doesn't require broadcasting
  * Virtually free. Doesn't cost gas
#### View functions
Reading from the state and from other view functions
#### Pure functions
Not reading or modifying the state

#### Visibility
* **Public**
  Can be called internally or externally
* **Private**
  Only from inside the contract. Not even derived contracts
* **External**
  Can be called from other contracts
  Can be called externally
* **Internal**
  Can be called from inside self or derived contracts

### Inheritance

1. Using *is* keyword
2. A is X,Y,Z
  Z is the most derived contract
3. super to access base contract
4. Inherited contracts are deployed as a single contract

### File import

1. import "filename.sol"
2. import * as obj from "filename.sol"
3. import { contract1 as ct1, contract2 } from "filename.sol"

### Events

1. EVM has logging functionality
2. Events are stored in sidechains
3. event(uint arg1, address indexed arg2)
  *indexed* keyword can be used to index some parameters (upto 3)
  This way, the parameters can be searched in the side chain
4. Used as a cheap data storage
5. Can be triggered when the transaction is mined


### Interact with functions via hash

* Getter
  * Without parameters
    First 4 bytes of the the keccak256 hash of the function name
    E.g. For function myUint() => `bytes4(keccak256(myUint()))`
  
  * With parameters
    First 4 bytes of the keccak256 hash of the function name with parameters
    E.g. For function myUint(uint, address) => `bytes4(keccak256(myUint(uint,address)))`
  
* Setter
  Not explained in the course since its a nice to know but won't be used.
  [https://solidity.readthedocs.io/en/latest/abi-spec.html](https://solidity.readthedocs.io/en/latest/abi-spec.html)

### Gas

Operations with their gas costs
Mentioned [https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0](https://docs.google.com/spreadsheets/d/1n6mRqkBz3iWcOlRem_mO09GtSKEKrAsfO7Frgx18pNU/edit#gid=0)

