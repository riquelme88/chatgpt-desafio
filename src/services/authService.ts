import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findFirst({ where: { email } })
    } catch (error) {
        return false
    }
}

type User = {
    name: string,
    email: string,
    password: string
}

export const newUser = async (data: User) => {
    try {
        return await prisma.user.create({ data })
    } catch (error) {
        return false
    }
}

export const user = async (email: string, password: string) => {
    try {
        return await prisma.user.findFirst({ where: { email, password } })
    } catch (error) {
        return false
    }
}