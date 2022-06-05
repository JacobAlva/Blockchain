// SPDX-License-Identifier: MIT

//telling Ethereum which Solidityversion to use when runnign this code
pragma solidity ^0.8.4;

// Import the standard implementation of ERC721
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Contract NFTee _IS_ an 'ERC721' contract
contract NFTee is ERC721 {
    constructor() ERC721("Jalva's NFT", "JNFT") {   //constructor gets called when you deploy a contract for the first time
        // mint 5 nfts to myself
        _mint(msg.sender, 1);
        _mint(msg.sender, 2);
        _mint(msg.sender, 3);
        _mint(msg.sender, 4);
        _mint(msg.sender, 5);
    }
}
