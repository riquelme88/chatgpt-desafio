import { RequestHandler } from "express"
import { ExtendedRequest } from "../middleware/authMid"
import { getUserByEmail } from "../services/authService"

export const profileController: RequestHandler = async (req: ExtendedRequest, res) => {
    const email = req.userEmail

    const user = await getUserByEmail(email as string)
    if (!user) { return res.json({ error: 'Usuario inexistente' }) }



    res.json({ name: user.name, email: user.email })
}