const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error.errors.name.properties.message);
        res.status(500).json({msg: error.errors.name.properties.message});
    }
}

const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch(e){
        res.status(500).json({error: "server error"});
        console.error(e.errors.name.properties.message);
    }
}


const getTask = async (req,res) => {
    
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID});

        if(!task){
            return res.status(404).json({msg: `no task with id: ${taskID}`});
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updateTask = async (req,res) => {
    try {
        const {id: taskID} = req.params;

        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true, //return the object that is already update instead of the old one 
            runValidators: true //by standart the validators are not done, so we guaraante that they are 
        })

        if(!task){
            res.status(404).send(`no task with this id: ${taskID}`);
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({error});
    }    

}

const deleteTask = async (req,res) => {
    try {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task){
            res.status(404).json({msg: "this item does not exist"});
        }
        res.status(200).json({msg: "task deleted"});
    } catch (error) {
        res.status(500).json({msg: error});
    }

}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};