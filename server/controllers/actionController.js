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
      let alrearyRequested = await Action.find({
        requester: requesterId,
        receiver: receiverId,
        packet: packetId
      });

      if (alrearyRequested.length !== 0) {
        res.status(404);
        throw new Error('Already requested sample');
      } else {
        const action = new Action({
          requester: requesterId,
          receiver: receiverId,
          packet: packetId,
          type: type,
          status: 'No Status'
        });
        const addedAction = await action.save();
        res.status(201).json(addedAction);
      }
    } else {
      const action = new Action({
        requester: requesterId,
        receiver: receiverId,
        packet: packetId,
        type: type
      });
      const addedAction = await action.save();
      res.status(201).json(addedAction);
    }
  }
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

// @desc    Store requester address
// @route   POST /api/action/store/address
// @access  Private
exports.storeAddress = asyncHandler(async (req, res) => {
  const { actionId, requesterAddress } = req.body;
  const action = await Action.findById(actionId);
  action.requesterAddress = requesterAddress;
  action.save();
  res.json('Address stored');
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
