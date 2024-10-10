import { Request, RequestHandler, Response } from "express"
import { userSchema, userUpdateSchema } from "../Schemas/user"
import * as userService from '../services/user'


export const getUsers = async (req: Request, res: Response) => {
    const user = await userService.getUsers()
    if (!user) { return res.json({ error: 'Não existe nenhum usuario' }) }

    res.json({ user })
}

export const addUser = async (req: Request, res: Response) => {
    const safeData = userSchema.safeParse(req.body)
    if (!safeData.success) { return res.json({ error: 'Ocorreu algum erro!' }) }

    const newUser = userService.createUser({
        name: safeData.data.name,
        email: safeData.data.email
    })

    if (!newUser) { return res.json({ error: 'Falha ao criar novo usuario' }) }
    res.json({ newUser })
}


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const safeData = userUpdateSchema.safeParse(req.body)
    if (!safeData.success) { return res.json({ error: 'Ocorreu algum erro!' }) }

    const user = await userService.updateUser(parseInt(id), {
        name: safeData.data.name,
        email: safeData.data.email
    })

    if (!user) { return res.json({ error: 'Falha ao atualizar' }) }

    res.json({ user })

}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await userService.deleteUser(parseInt(id))
    if (!user) { return res.json({ error: 'Falha ao deletar!' }) }

    res.json({ deletado: true })
}

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = await userService.getOne(parseInt(id))
    if (!user) { return res.json({ error: 'Não foi possivel encontrar o usuario' }) }

    res.json({ user })
}