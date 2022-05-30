// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract MoodDiary {
    string mood;

    //function to write mood to smart contract
    function setMood(string memory _mood) public {
        mood = _mood;
    }

    //function to read mood from smart contract
    function getMood() public view returns(string memory) {
        return mood;
    }

}