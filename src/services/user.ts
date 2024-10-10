import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getUsers = async () => {
    try {
        return await prisma.user.findMany()
    } catch (error) {
        return false
    }
}

type userCreate = {
    name: string,
    email: string
}

export const createUser = async (data: userCreate) => {
    try {
        return await prisma.user.create({ data })
    } catch (error) {
        return false
    }
}

type userUpdate = {
    name?: string,
    email?: string
}

export const updateUser = async (id: number, data: userUpdate) => {
    try {
        return await prisma.user.update({
            where: { id },
            data
        })
    } catch (error) {
        return false
    }
}

export const deleteUser = async (id: number) => {
    try {
        return await prisma.user.delete({ where: { id } })
    } catch (error) {
        return false
    }
}

export const getOne = async (id: number) => {
    try {
        return await prisma.user.findFirst({ where: { id } })
    } catch (error) {
        return false
    }
}