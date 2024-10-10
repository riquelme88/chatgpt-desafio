import { Router } from "express";
import * as userController from '../controllers/user'

export const router = Router()

router.get('/ping', (req, res) => {
    res.json({ pong: true })
})

router.get('/users', userController.getUsers)
router.post('/user', userController.addUser)
router.get('/user/:id', userController.getUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)