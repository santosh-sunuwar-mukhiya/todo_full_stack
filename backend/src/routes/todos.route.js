import express from 'express'
import { getAllTodos, getTodo, addTodo } from '../controllers/todo.controller.js'

const router = express.Router();

router.get('/todos', getAllTodos)

router.get('/:id', getTodo)

router.post('/', addTodo)

router.put('/:id', (req, res) => {
    res.send('This is from get Router')
})

router.delete('/:id', (req, res) => {
    res.send('This is from get Router')
})

export default router;