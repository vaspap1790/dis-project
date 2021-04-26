import asyncHandler from 'express-async-handler';
import Action from '../models/actionModel.js';

// @desc    Add new action
// @route   POST /api/action
// @access  Private
const addNewAction = asyncHandler(async (req, res) => {
  const { packetId, requesterId, receiverId, type } = req.body.action;

  if (
    packetId === undefined ||
    requesterId === undefined ||
    receiverId === undefined ||
    type === undefined
  ) {
    res.status(400);
    throw new Error('Something went wrong');
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
});

// @desc    Fetch all user actions
// @route   GET /api/action/user/:id
// @access  Private
const getActions = asyncHandler(async (req, res) => {
  const actions = await Action.find({
    $or: [{ requester: req.params.id }, { receiver: req.params.id }]
  })
    .populate('requester', 'username')
    .populate('receiver', 'username')
    .populate('packet', 'name image');

  res.json(actions);
});

// @desc    Count unread user actions
// @route   GET /api/action/count/user/:id
// @access  Private
const countUnreadActions = asyncHandler(async (req, res) => {
  const count = await Action.countDocuments({
    receiverId: req.params.id,
    readByReceiver: false
  });
  res.json(actions);
});

// @desc    Update action
// @route   POST /api/action/update/:id
// @access  Private
const updateAction = asyncHandler(async (req, res) => {
  const { actionId, update, userId } = req.body.data;
  const action = await Action.findById(actionId);

  switch (update) {
    case 'Approved':
      action.status = 'Approved';
      action.save();
      break;
    case 'Rejected':
      action.status = 'Rejected';
      action.save();
      break;
    case 'Read':
      action.readByReceiver = true;
      action.save();
      break;
    case 'Remove':
      if (action.requesterId === userId) {
        if (!action.showToReceiver) {
          const res = await Action.remove({ _id: actionId });
          res.deletedCount;
        } else {
          action.showToRequester = false;
          action.save();
        }
      }

      if (action.receiverId === userId) {
        if (!action.showToRequester) {
          const res = await Action.remove({ _id: actionId });
          res.deletedCount;
        } else {
          action.showToReceiver = false;
          action.save();
        }
      }
      break;
    default:
      break;
  }

  res.json('Action Updated');
});

export { addNewAction, getActions, updateAction, countUnreadActions };
