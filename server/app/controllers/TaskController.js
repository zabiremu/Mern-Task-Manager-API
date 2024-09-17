import TaskModel from "../models/TaskModel.js";
import USER_MODEL from "../models/UserModel.js";

export const CreateTask = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const reqBody = req.body;
    const getUser = await USER_MODEL.findById(user);
    if (getUser === null) {
      return res.json({ status: "fail", message: "User not found" });
    } else {
      reqBody.userId = user;
      const Task = await TaskModel.create(reqBody);
      return res.json({
        status: "success",
        message: "Task created successfully",
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error });
  }
};

export const UpdateTaskStatus = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const reqBody = req.body;
    const getUser = await USER_MODEL.findById(user);
    if (getUser === null) {
      return res.json({ status: "fail", message: "User not found" });
    } else {
      reqBody.userId = user;
      const Task = await TaskModel.findByIdAndUpdate(
        req.params.taskId,
        reqBody
      );
      return res.json({
        status: "success",
        message: "Task updated successfully",
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error });
  }
};

export const TaskListByStatus = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const getUserTask = await TaskModel.find({ userId: user });
    if (getUserTask === null) {
      return res.json({ status: "success", message: "There is no task" });
    } else {
      return res.json({
        status: "success",
        data: getUserTask,
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error });
  }
};

export const DeleteTask = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const reqBody = req.body;
    const getUser = await USER_MODEL.findById(user);
    if (getUser === null) {
      return res.json({ status: "fail", message: "User not found" });
    } else {
      const Task = await TaskModel.findByIdAndDelete(req.params.taskId);
      return res.json({
        status: "success",
        message: "Task deleted successfully",
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error });
  }
};

export const CountTask = async (req, res) => {
  try {
    const user = req.headers["user_id"];
    const inProgress = await TaskModel.find({ userId: user })
      .where("status")
      .equals("In Progress");
    const pending = await TaskModel.find({ userId: user })
      .where("status")
      .equals("Pending");
    const completed = await TaskModel.find({ userId: user })
      .where("status")
      .equals("Completed");
    if (inProgress === null || pending == null) {
      return res.json({ status: "success", message: "There is no task" });
    } else {
      return res.json({
        status: "success",
        inProgress: inProgress,
        pending: pending,
        completed: completed,
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error });
  }
};
