const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskCheckList,
  getDashboardData,
  getUserDashboardData,
} = require("../controllers/taskController");
const router = express.Router();

// Task management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get all task (Admin: all ,user: assigned)
router.get("/:id", protect, getTaskById); //Get Task by id
router.post("/", protect, adminOnly, createTask); //create a task admin Only
router.put("/:id", protect, updateTask); // update Task details
router.delete("/:id", protect, adminOnly, deleteTask); // delete a task (admin only)
router.put("/:id/status", protect, updateTaskStatus); // update Task status
router.put("/:id/todo", protect, updateTaskCheckList); //update task check list

module.exports = router;
