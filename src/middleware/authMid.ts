import { NextFunction, Request, RequestHandler, Response } from "express"
import jwt from 'jsonwebtoken'
import { getUserByEmail } from "../services/authService"

export type ExtendedRequest = Request & {
    userEmail?: string
}

export const payload = (user: string) => {
    return jwt.sign({ user }, process.env.SECRET_KEY as string)
}


export const middleware = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization']
    if (!header) { return res.json({ error: 'Mande um token' }) }

    const token = header.split(' ')[1]
    const verify = jwt.verify(token, process.env.SECRET_KEY as string,
        async (error, decoded: any) => {
            if (error) return res.status(401).json({ error: 'Acesso negado' })

            const user = await getUserByEmail(decoded.email);

            if (!user) return res.status(401).json({ error: 'Acesso negado' })

            req.userEmail = user.email

            next()
        }
    )
}