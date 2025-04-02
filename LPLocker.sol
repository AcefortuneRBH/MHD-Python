// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title LPLocker
/// @notice A simple contract to lock LP tokens until a specified unlock time.
contract LPLocker {
    address public owner;
    IERC20 public lpToken;
    uint256 public unlockTime;

    constructor(address _lpToken, uint256 _lockDuration) {
        owner = msg.sender;
        lpToken = IERC20(_lpToken);
        unlockTime = block.timestamp + _lockDuration;
    }

    /// @notice Withdraw LP tokens after the lock period.
    function withdraw() external {
        require(msg.sender == owner, "Not owner");
        require(block.timestamp >= unlockTime, "Tokens are locked");
        uint256 balance = lpToken.balanceOf(address(this));
        lpToken.transfer(owner, balance);
    }
}