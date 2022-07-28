//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/** Uses the interface of the whitelist contract created in the previous lesson
 * to verify whitelisted addresses by calling the "whitelistedAddresses" function
 * which takes in an address and returns a boolean.
 
 * This function can be called here because it is public 
 * We are using an interface because we don't want to use all the functions in the whitelist contract.
 * We only want to check if a given adddress is in the whitelist.*/
interface IWhitelist {
    function whitelistedAddresses(address) external view returns (bool);
}