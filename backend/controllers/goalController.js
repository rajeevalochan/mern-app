const asyncHandler = require('express-async-handler');

//@desc Get Goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'GET Goals',
  });
});

//@desc Set Goals
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Pease Add text field');
  }
  res.status(200).json({
    message: 'Create Goal',
  });
});

//@desc Update Goal
//@route PUT /api/goal/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update Goal of ${req.params.id}`,
  });
});

//@desc Delete Goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete Goal of ${req.params.id}`,
  });
});

module.exports = {
  getGoals,
  updateGoal,
  setGoal,
  deleteGoal,
};
