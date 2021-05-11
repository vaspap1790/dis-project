//"SPDX-License-Identifier: UNLICENSED"
pragma solidity 0.8.4;

import "./Registry.sol";

contract DataDappContract is Registry {
    //***********************************Structs********************************//
    struct UploadPacket {
        address ownerAddress;
        bytes32[] ipfsHashes;
        bool sold;
    }

    struct Purchase {
        bytes32 packetId;
        address requesterAddress;
        string[] keys;
    }

    struct Review {
        string reviewer;
        uint8 rating;
        bytes32 comments;
    }

    //**********************************Mappings*******************************//
    mapping(bytes32 => UploadPacket) public uploads;
    mapping(bytes32 => bytes32[]) public sampleRequests;
    mapping(bytes32 => Purchase) public purchases;
    mapping(bytes32 => uint256) public deposits;
    mapping(bytes32 => Review[]) public reviews;

    uint256 nonce;

    //***********************************Events********************************//
    event UploadResult(UploadPacket upload);
    event SampleRequestResult(address requester, uint256 index);
    event DepositEvent(address requester);
    event SendMoneyEvent(address requester);
    event ReturnMoneyEvent(address requester);
    event ReviewResult(Review review);

    //********************************Modifiers********************************//
    modifier itemNotSold(string memory _id) {
        require(
            uploads[keccak256(abi.encodePacked(_id))].sold != true,
            "Item has been sold"
        );
        _;
    }

    //*********************************Functions*******************************//
    receive() external payable {
        bytes32 index = keccak256(abi.encodePacked(msg.sender));
        deposits[index] += msg.value;
        emit DepositEvent(msg.sender);
    }

    //***********************************Upload********************************//
    function addUpload(
        string memory _userId,
        string memory _packetId,
        string[] memory _ipfsHashes
    ) public registered(_userId) {
        bytes32 index = keccak256(abi.encodePacked(_packetId));
        uploads[index].ownerAddress = msg.sender;

        for (uint8 i = 0; i < _ipfsHashes.length; i++) {
            uploads[index].ipfsHashes.push(
                keccak256(abi.encodePacked(_ipfsHashes[i]))
            );
        }

        emit UploadResult(uploads[index]);
    }

    //***********************************Sample********************************//
    function addSampleRequest(
        string memory _requesterId,
        string memory _packetId,
        bytes32[] memory _keys
    ) public registered(_requesterId) {
        bytes32 index = keccak256(abi.encodePacked(_packetId, msg.sender));
        require(
            sampleRequests[index].length == 0,
            "Already requested sample of this item"
        );
        for (uint8 i = 0; i < _keys.length; i++) {
            sampleRequests[index].push(_keys[i]);
        }
        emit SampleRequestResult(
            msg.sender,
            getRandomKeyIndex(sampleRequests[index].length)
        );
    }

    function getRandomKeyIndex(uint256 mod) internal returns (uint256) {
        uint256 rand =
            uint256(
                keccak256(
                    abi.encodePacked(
                        nonce,
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % mod;
        nonce++;
        return rand;
    }

    //**********************************Purchase*******************************//
    function addPurchase(
        string memory _ownerId,
        string memory _packetId,
        address _requesterAddress,
        string[] memory _keys,
        uint256 price,
        bool _approve
    ) public registered(_ownerId) itemNotSold(_packetId) {
        bytes32 index =
            keccak256(abi.encodePacked(_packetId, _requesterAddress));

        if (_approve && hashKeysAndCompare(index, _keys)) {
            purchases[index].packetId = keccak256(abi.encodePacked(_packetId));
            purchases[index].requesterAddress = _requesterAddress;

            for (uint8 i = 0; i < _keys.length; i++) {
                purchases[index].keys.push(_keys[i]);
            }

            uploads[keccak256(abi.encodePacked(_packetId))].sold = true;
            sendMoney(_requesterAddress, payable(msg.sender), price);
        } else {
            returnMoney(payable(_requesterAddress), price);
        }
    }

    function hashKeysAndCompare(bytes32 _index, string[] memory _keysFromSeller)
        internal
        view
        returns (bool)
    {
        bytes32[] memory keysFromSample = sampleRequests[_index];
        bool confirm = true;

        for (uint8 i = 0; i < keysFromSample.length; i++) {
            if (
                keysFromSample[i] != keccak256(abi.encode(_keysFromSeller[i]))
            ) {
                confirm = false;
            }
        }
        return confirm;
    }

    function sendMoney(
        address from,
        address payable _to,
        uint256 price
    ) internal {
        bytes32 index = keccak256(abi.encodePacked(from));
        require(price <= deposits[index], "Not enough money sent");
        uint256 moneyToSent = price;
        deposits[index] -= price;
        _to.transfer(moneyToSent);

        emit SendMoneyEvent(_to);
    }

    function returnMoney(address payable _to, uint256 price) internal {
        bytes32 index = keccak256(abi.encodePacked(_to));
        require(price <= deposits[index], "Not enough money in deposit");
        uint256 moneyToSent = price;
        deposits[index] -= price;
        _to.transfer(moneyToSent);

        emit ReturnMoneyEvent(_to);
    }

    function getPurchaseKeys(
        string memory _requesterId,
        string memory _packetId
    ) public view registered(_requesterId) returns (string[] memory) {
        bytes32 index = keccak256(abi.encodePacked(_packetId, msg.sender));
        return purchases[index].keys;
    }

    //***********************************Review*********************************//
    function addReview(
        string memory _rated,
        string memory _reviewer,
        uint8 _rating,
        string memory _comments
    ) public registered(_rated) registered(_reviewer) {
        Review memory review =
            Review(_reviewer, _rating, keccak256(abi.encodePacked(_comments)));
        reviews[keccak256(abi.encodePacked(_rated))].push(review);

        emit ReviewResult(review);
    }

    //***********************************Testing*********************************//
    event Check(bool _isRegistered);

    function getRegisterUsers(string memory _id) public {
        emit Check(registeredUsers[keccak256(abi.encodePacked(_id))]);
    }
}
