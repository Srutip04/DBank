// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './RWD.sol';
import './Tether.sol';


contract DecentralBank{
    string public name = "DecentralBank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked; 

    constructor(RWD _rwd, Tether _tether){
        rwd = _rwd;
        tether = _tether;

    }
    
    //Staking Function
    function depositTokens(uint _amount) public{
      //Transfer tether tokens to this contract address for staking
      tether.transferFrom(msg.sender,address(this), _amount);

      //update staking balance
      stakingBalance[msg.sender] += _amount;

      if(!hasStaked){
        stakers.push(msg.sender);
      }
    }



}