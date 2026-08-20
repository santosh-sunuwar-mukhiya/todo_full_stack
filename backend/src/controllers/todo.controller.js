import Todo from '../models/todo.model.js'

export const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({success:true, message:todos})
    } catch (error) {
        console.log('Error Occurred: ', error);
        res.status(500).json({success:false, message:"Internal Server Error."})
    }
}

export const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        res.status(200).json({ success: true, message: todo });
    } catch (error) {
        console.log('Error Occurred: ', error);
        res.status(500).json({success:false, message:"Internal Server Error."})
    }
}

export const addTodo = async (req, res) => {
    try {
        const { title, description, isCompleted } = req.body;
        if (!title || !description) {
            return res.status(400).json({sucess:false, message:"All the Fields are Required!"})
        }
        const newTodo = await Todo.create({title, description, isCompleted});
        res.status(201).json({success:true, message:newTodo})
    } catch (error) {
        console.log('Error Occurred: ', error);
        res.status(500).json({success:false, message:"Internal Server Error."})
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted } = req.body;
        const updateTodo = await Todo.findByIdAndUpdate(id, { title, description, isCompleted }, { new: true });
        if (!updateTodo) {
            return res.status(404).json({success:false, message:"Todo Not Found"})
        }
        res.status(200).json({success:true, message:updateTodo})
    } catch (error) {
        console.log('Error Occurred: ', error);
        res.status(500).json({success:false, message:"Internal Server Error."})
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await Todo.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(404).json({sucess:false, message:"Todo Not Found"})
        }
        res.status(200).json({success:true, message:"Todo Deleted Successfully."})
    } catch (error) {
        console.log('Error Occurred: ', error);
        res.status(500).json({success:false, message:"Internal Server Error."})
    }
}