//"SPDX-License-Identifier: UNLICENSED"
pragma solidity 0.8.4;

import "./DataDappContract.sol";

contract TestDataDappContract is DataDappContract {
    event Test1(uint256 _index);
    event Test2(bool _bool);
    event Test3(bool _bool);

    function test_getRandomKeyIndex(uint256 mod) external {
        emit Test1(getRandomKeyIndex(mod));
    }

    function test_hashKeysAndCompare(
        string memory _packetId,
        address _requesterAddress,
        string[] memory _keysFromSeller
    ) external {
        bytes32 _index =
            keccak256(abi.encodePacked(_packetId, _requesterAddress));
        emit Test2(hashKeysAndCompare(_index, _keysFromSeller));
    }

    function test_itemSold(string memory _id) external {
        emit Test2(itemSold(_id));
    }

    function test_sendMoney(
        address from,
        address payable _to,
        uint256 price
    ) external {
        sendMoney(from, _to, price);
    }

    function test_returnMoney(address payable _to, uint256 price) external {
        returnMoney(_to, price);
    }
}
