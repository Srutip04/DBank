// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether{
    string  public name = "Mock Tether Token";
    string  public symbol = "mUSDT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    event Transfer(
      address indexed _from,
      address indexed _to,
      uint _value
    );

    event Approve(
      address indexed _owner,
      address indexed _spender,
      uint _value
    );

    mapping(address => uint) public balanceOf;

    constructor(){
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _from,address _to, uint _value) public returns(bool success){
        //require that the value is greater or equal for transfer
        require(balanceOf[msg.sender] >= _value);
        //transfer the amt & subtract the balance
        balanceOf[msg.sender] -= _value;
        //add the balance
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}