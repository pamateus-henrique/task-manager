const getAllTasks = (req,res) => {
    res.send('all the tasks');
}

const createTask = (req,res) => {
    console.log(req.body);
    res.send('the task has been saved');
}


const getTask = (req,res) => {
    //const {id} = req.params;
    //console.log(id);
    res.send('get single task');
}

const updateTask = (req,res) => {
    
    res.send('update task');
}

const deleteTask = (req,res) => {
    res.send('the task has been deleted');
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};