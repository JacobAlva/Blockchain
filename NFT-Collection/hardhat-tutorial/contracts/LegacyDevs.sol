//SPDX-License_identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";

contract LegacyDevs is ERC721Enumerable, Ownable {
    /**
    * @dev_baseTokenURI for computing {tokenURI}. If set, the resulting URI for each token will be the concatenation of the 'baseURI' and the 'tokenID'
     */
     string _baseTokenURI;

     //_price is the price of one Legacy Dev NFT
     uint256 public _price = 0.01 ether;

     //_paused is used to pause the contract in case of an emergency
     bool public _paused;

     //max number of LegacyDevs NFTs
     uint256 public maxTokenIds = 20;

     //total number of tokendIds minted
     uint256 public tokenIds;

     //Whitelist contract instance
     IWhitelist whitelist;

     //boolean to keep track of wheter presale started or not
     bool public presaleStarted;

     //timestamp for when presale ends
     uint256 public presealeEnded;

     modifier onlyWhenNotPaused {
        require(!_paused, "Contract currenly paused");
     }

    /**
        // @dev ERC721 constructor takes in a 'name' and a 'symbol' to the token collection.
        * name in this case is "Lagacy Devs" and symbol is "LED".
        * Constructor for Legacy Debs takes in the base URI to set _baseTokenURI for collection.
        * It also intialized an instance of whitelist interface.
     */

     constructor (string memory baseURI, address whitelistContract) ERC721("Legacy Devs", "LED") {
        _baseTokenURI = baseURI;
        whitelist = IWhitelist(whitelistContract);
     }

     // @dev startPresale starts a presale for the whitelisted addresses
     function startPresale() public onlyOwner {
        presaleStarted = true;
        //set presaleEnded time as current timestamp +5 ins
        //Solidity has cool syntax timestamps (seconds, minutes, hours, days, years)
        presealeEnded = block.timestamp + 5 minutes;
     }

     // @dev presaleMint allows a user to mint one NFT per transaction during the presale.
     function presaleMint() public payable onlyWhenNotPaused {
        require(presaleStarted && block.timestamp < presaleEnded, "Presale is not running");
        require(whitelist.whitelistedAddresses(msg.sender), "You are not whitelisted");
        require(tokenIds < maxTokenIds, "Exceeded maximum Legacy Devs supply");
        require(msg.value >= _price, "Ether sent is not sufficient");
        tokendIds += 1;
        
        // _safeMinst is a safer version of the _mint function as it ensures that if the address being minted to is a contract, then it knows how to deal with ERC721 tokens. Otherwise, works the same way as _mint
         _safeMint(msg.sender, tokenIds);
     }
     
     // @dev mint allows a user to mint 1 NFT per transaction after the presale has ended.
     function mint() public payable onlyWhenNotPaused {
        require(presaleStarted && block.timestamp >= presaleEnded, "Presale is yet to end");
        require(tokenIds < maxTokenIds, "Exceeded maximum Legacy Dev supply");
        require(msg.value >= _price, "Ether sent is insufficient");
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
     }

     // @dev _baseURI overrides the Openzeppelin's ERC721 implementation which by default returned an empty string for the baseURI
     function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
     }

     // @dev can be used to pause or unpause the contract
     function setPaused(bool val) public onlyOwner {
        _paused = val;
     }

     // @dev withdrawsends all the ether in the contract to the owner of the contract
     function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
     }

     // Function to receive Ether.msg.data must be empty
     receive() external payable {}

     // Fallback function is called when msg.data is not empty
     fallback() external payable {}
}