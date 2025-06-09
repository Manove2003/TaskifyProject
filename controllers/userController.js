const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@ get all user admin only
//@ route Get/api/users/
//@access private(admin)

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    // add task count to each user
    const userWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });
        return {
          ...user._doc, //incule all existing  user data
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    res.json(userWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: message.error });
  }
};

//@desc get user by id
//route Get /api/users/:id
//access private

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: message.error });
  }
};

//@ delete a user (admin only)
//@ route Delete /api/users/:id
//@access private(admin)

// const deleteUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: message.error });
//   }
// };

module.exports = { getUsers, getUserById };
