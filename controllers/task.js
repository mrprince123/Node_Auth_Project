import ErrorHandler from "../middleware/error.js";
import Task from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {

        const { title, description } = req.body;

        if (!title || !description) {
            res.status(401).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        const task = new Task({
            title,
            description,
            user: req.user,
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: "Task added Successfully",
        });

    } catch (error) {
        next(error);
    }
}


export const getMyTask = async (req, res, next) => {
    try {

        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        });

    } catch (error) {
        next(error);
    }
}


export const updateMyTask = async (req, res, next) => {
    try {

        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }


        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated Successfully"
        })

    } catch (error) {
        next(error);
    }
}


export const deleteMyTask = async (req, res, next) => {
    try {

        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
        });


    } catch (error) {
        next(error);
    }
}