const asyncHandler = require('express-async-handler');
const Action = require('../models/actionModel.js');
const Packet = require('../models/packetModel.js');
const { getRandomInt } = require('../utils/utilities.js');
const Cryptr = require('cryptr');

const cryptr = new Cryptr(`${process.env.ENCRYPT_KEY}`);

// @desc    Add new action
// @route   POST /api/action
// @access  Private
exports.addNewAction = asyncHandler(async (req, res) => {
  const { packetId, requesterId, receiverId, type } = req.body;
  let key = {};

  if (
    packetId === undefined ||
    requesterId === undefined ||
    receiverId === undefined ||
    type === undefined
  ) {
    res.status(400);
    throw new Error('Something went wrong');
  } else {
    if (type === 'Sample') {
      const action = new Action({
        requester: requesterId,
        receiver: receiverId,
        packet: packetId,
        type: type,
        status: 'No Status'
      });
      const addedAction = await action.save();
    } else {
      const action = new Action({
        requester: requesterId,
        receiver: receiverId,
        packet: packetId,
        type: type
      });
      const addedAction = await action.save();
    }

    if (type === 'Sample') {
      let packet = await Packet.findById(packetId);

      if (packet.encryptionKeys.length !== 0) {
        let randInt = getRandomInt(packet.encryptionKeys.length);
        key.encryptionKey = cryptr.decrypt(packet.encryptionKeys[randInt]);
        key.ipfsHash = packet.ipfsHashes[randInt];
      }
    }
  }
  res.status(201).json(key);
});

// @desc    Fetch all user actions
// @route   GET /api/action/notif/user/:id
// @access  Private
exports.getNotifications = asyncHandler(async (req, res) => {
  const actions = await Action.find({
    receiver: req.params.id,
    showToReceiver: true
  })
    .populate('requester', 'username')
    .populate('receiver', 'username')
    .populate('packet', 'name image');

  res.json(actions);
});

// @desc    Fetch all user actions
// @route   GET /api/action/requests/user/:id
// @access  Private
exports.getRequests = asyncHandler(async (req, res) => {
  const actions = await Action.find({
    requester: req.params.id,
    showToRequester: true
  })
    .populate('requester', 'username')
    .populate('receiver', 'username')
    .populate('packet', 'name image');

  res.json(actions);
});

// @desc    Count unread user actions
// @route   GET /api/action/count/user/:id
// @access  Private
exports.countUnreadActions = asyncHandler(async (req, res) => {
  const count = await Action.countDocuments({
    receiver: req.params.id,
    readByReceiver: false,
    showToReceiver: true
  });
  res.json(count);
});

// @desc    Update action
// @route   POST /api/action/update/:id
// @access  Private
exports.updateAction = asyncHandler(async (req, res) => {
  const { actionId, update, userId } = req.body;
  const action = await Action.findById(actionId);

  switch (update) {
    case 'Approve':
      action.status = 'Approved';
      action.save();
      break;
    case 'Reject':
      action.status = 'Rejected';
      action.save();
      break;
    case 'Read':
      action.readByReceiver = true;
      action.save();
      break;
    case 'Unread':
      action.readByReceiver = false;
      action.save();
      break;
    case 'Cancel':
      action.remove();
      break;
    case 'Remove':
      if (action.requester == userId) {
        action.showToRequester = false;
        action.save();
      }
      if (action.receiver == userId) {
        action.showToReceiver = false;
        action.save();
      }
      break;
    default:
      break;
  }

  res.json('Action Updated');
});
