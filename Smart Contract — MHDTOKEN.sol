// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title MHDTOKEN
/// @notice Fixed-supply ERC20 token with zero admin controls
/// @dev No mint, burn, or pausing. All functions follow the pure ERC20 standard.
contract MHDTOKEN is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 9_000_000_000_000 * 10 ** 18;

    constructor() ERC20("MHDTOKEN", "MHD") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}