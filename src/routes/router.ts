import { Router } from "express";
import * as authController from '../controllers/auth'
import { middleware } from "../middleware/authMid";
import { profileController } from "../controllers/profile";

export const router = Router()


router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.get('/profile', middleware, profileController)