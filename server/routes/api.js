import express from "express";
const router = express.Router();

import * as TaskController from "../app/controllers/TaskController.js";
import * as UserController from "../app/controllers/UserController.js";
import AuthMiddleware from "../app/middleware/AuthMiddleware.js";

// Users
router.post("/registration", UserController.Registration);
router.post("/login", UserController.Login);
router.get("/profile-details", AuthMiddleware, UserController.ProfileDetails);
router.post("/profile-update", AuthMiddleware, UserController.ProfileUpdate);
router.get("/email-verify", UserController.EmailVerify);
router.post("/code-verify", UserController.CodeVerify);
router.post("/reset-password", UserController.ResetPassword);

// Task
router.post("/create-task", AuthMiddleware, TaskController.CreateTask);
router.post(
  "/update-task-status/:taskId",
  AuthMiddleware,
  TaskController.UpdateTaskStatus
);
router.get(
  "/task-list-b-status",
  AuthMiddleware,
  TaskController.TaskListByStatus
);
router.get("/delete-task/:taskId", AuthMiddleware, TaskController.DeleteTask);
router.get("/count-task", AuthMiddleware, TaskController.CountTask);

export default router;
