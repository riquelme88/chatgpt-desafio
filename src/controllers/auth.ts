import { RequestHandler } from "express";
import { createUserSchema, userSchema } from "../schemas/auth";
import bcrypt, { compare } from 'bcrypt'
import * as authServices from '../services/authService'
import jwt from 'jsonwebtoken'
import { payload } from "../middleware/authMid";

export const signup: RequestHandler = async (req, res) => {
    const safeData = createUserSchema.safeParse(req.body)
    if (!safeData.success) { return res.json({ error: 'Ocorreu algum erro' }) }

    const hasUser = await authServices.getUserByEmail(safeData.data.email)
    if (hasUser) { return res.json({ error: 'Usuario existente' }) }

    const hash = await bcrypt.hash(safeData.data.password, 10)

    const newUser = await authServices.newUser({
        name: safeData.data.name,
        email: safeData.data.email,
        password: hash
    })

    res.json({ newUser })

}

export const signin: RequestHandler = async (req, res) => {
    const safeData = userSchema.safeParse(req.body)
    if (!safeData.success) { return res.json({ error: 'Ocorreu algum erro' }) }

    const user = await authServices.getUserByEmail(safeData.data.email)
    if (!user) { return res.json({ error: 'Usuario inválido' }) }

    const verifyPassword = await compare(safeData.data.password, user.password)
    if (!verifyPassword) { return res.json({ error: 'Usuario inválido' }) }

    const token = payload(user.email)

    res.json({
        name: user.name,
        email: user.email,
        token: token
    })

}