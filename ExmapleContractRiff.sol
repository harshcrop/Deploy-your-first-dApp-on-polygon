/ SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ExampleContractRiff{
    string public name;
    string public param;
    uint256 public bal;

    
    constructor(string memory _name,string memory _param){
        name=_name;
        param=_param;
        bal=0;
    }

    function getPublic(string memory input) public view returns (string memory,string memory){
        return (input,name);
    }
    
    function changeName(string memory _name) public returns (string memory){
        name=_name;
        return name;
    }

    function receiveNative() external payable returns (uint256){
        bal+=msg.value;
        return msg.value;
    }


}