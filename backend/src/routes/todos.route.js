import express from 'express'
import { getAllTodos, getTodo, addTodo, updateTodo, deleteTodo } from '../controllers/todo.controller.js'

const router = express.Router();

router.get('/todos', getAllTodos)

router.get('/:id', getTodo)

router.post('/', addTodo)

router.put('/:id', updateTodo)

router.delete('/:id', deleteTodo)

export default router;