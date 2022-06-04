// SPDX-License-Identifier: MIT

//what version of Solidity do I want to use
//^0.8.0 any version from 0.8.x

pragma solidity ^0.8.0;

//Import ERC20 Contract from OpenZeppelin
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

//contract X {...}
contract JalvaToken is ERC20 {

    /**
        fixed length varibles (no more no less; predictable length and size and easy to store):
            unint256
            int256
            bool
            char

        variable length variables (can be any length, unpredictable, can be restricted though)
        strings
        arrays

        Since these datatypes are of variable length, the contract cannot predict in advance how much space is needed to store them.
        Thus, the contract cannot store these datatypes in the CPU cache as it is also insecure. 
        Because of these, arrays, strings, etc. need to be marked as "memory (analogy for RAM)" variables, this tells the contract to 
        store these values in the RAM instead of cache.    
    */

    /**
        ARRAY INDEXING

        To access specific items at certain indexes in an array, you need to give an index (sounds obvious right? Yeah!). 
    */
    /**
        uint[] public numbers;
        uint public lengthOfNumbers;

        numbers.push(x);
        lengthOfNumbers++;

        //To read these values, first read the length, then loop
        length = 5
        for (i = 0 to 5) {numbers[i]} // this is a pseudo code. You cannot return arrays from a function.
    */
    

    // We also want to call the constructor present inside ERC20
    /**
        constructor() ERC20("Jalva Token", "JTK") { //this is hard coded
        //This is our constructor
    }*/
    // To make the constructor dynamic and allow the deployer provide the name and symbol
    
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
       
        //This is our constructor

        //Get some tokens for ourselves //this action is taken by the person deploying the contract
        
        _mint(msg.sender, 1000 * (10 ** 18)); //this is solidity's syntax for exponentiation 
        
        // to get x amount of tokens, we need x multiplied 10^18
        /**
        solidity does not support floating point numbers like 2.1, 1.23, 0,458 etc.
        

        //Computers cannot represent infinte decimal numbers e.g (1/3) = a; a*3 = 0.9999...
        //This becomes a problem when dealing with money.
        //Solution: Always use integers and not floating point to store values. Thus, money is stored
            in its smallest value e.g. 1.3 dollar as 133 cents instead.

        Now for Ethereum, the smallest unit is the "wei" which is 10^18th of an ether. Thus, 1 ether is represented
            as 1*(10**18) weis.
        */

        /** if you want anybody to mint whatever amount of tokens they want and there is an unlimited supply of tokens..

        function mint() public {
            _mint(msg.sender, 1000 * (10 ** 18));
        } */
    }    
}