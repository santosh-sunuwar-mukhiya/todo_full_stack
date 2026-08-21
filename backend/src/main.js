import express from 'express'
import { config } from './config/env.js';
import connectDB from './config/db.js'
import todoRouter from './routes/todos.route.js'
import cors from 'cors'

const PORT = config.port || 8000

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/todo', todoRouter);

app.get('/', (req, res) => {
    res.send('Hello World.');
})

app.listen(PORT, () => {
    connectDB();
    console.log(`The Server is running on..${PORT}`)
})