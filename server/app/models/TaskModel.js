import mongoose from "mongoose";

const Task = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In Progress", "Completed"],
    },
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = mongoose.model("tasks", Task);
export default TaskModel;
