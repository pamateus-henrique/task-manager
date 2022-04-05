const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper( async (req,res) => {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
})

const createTask = asyncWrapper (async (req,res) => {
        const task = await Task.create(req.body);
        res.status(201).json({task});
})


const getTask = asyncWrapper( async (req,res, next) => {
        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID});

        if(!task){
            const error = new Error('Not found');
            error.status = 404;
            return next(error);
        }

        res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req,res) => {
        const {id: taskID} = req.params;

        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, //return the object that is already update instead of the old one 
            runValidators: true //by standart the validators are not done, so we guaraante that they are 
        })

        if(!task){
            res.status(404).send(`no task with this id: ${taskID}`);
        }

        res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req,res) => {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task){
            res.status(404).json({msg: "this item does not exist"});
        }
        res.status(200).json({msg: "task deleted"});
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};