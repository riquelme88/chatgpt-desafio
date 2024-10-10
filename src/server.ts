import express, { urlencoded } from 'express'
import { router } from './routes/router';
import cors from 'cors'

const server = express();

server.use(urlencoded({ extended: true }))
server.use(express.json())
server.use(cors())


server.use('/', router)

server.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000} `)
})