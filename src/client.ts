import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const getPrismaClient = (): PrismaClient => {
    return db;
}
