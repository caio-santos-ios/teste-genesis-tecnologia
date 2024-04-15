import { Address } from "@prisma/client";
import { prisma } from "../database/prisma";

class AddressService {
    async create(payload: any): Promise<Address>{
        const findAddress = await prisma.address.findUnique({
            where: {
                code: payload.code
            }
        })

        if(findAddress) return findAddress;

        const address = await prisma.address.create({
            data: payload
        })

        return address;
    }

    async read(): Promise<Address[]>{
        const address = await prisma.address.findMany();

        return address;
    }

    async retrive(id: number): Promise<Address>{
        const findAddress = await prisma.address.findUnique({
            where: {
                id
            }
        })

        if(!findAddress) throw new Error("not found");

        return findAddress;
    }

    async update(id: number, payload: any): Promise<Address>{
        const findAddress = await prisma.address.findUnique({
            where: {
                id
            }
        })

        if(!findAddress) throw new Error("not found");

        const address = await prisma.address.update({
            where: {
                id
            },
            data: payload
        })

        return address;
    }
    
    async destroy(id: number): Promise<void>{
        const findAddress = await prisma.address.findUnique({
            where: {
                id
            }
        })

        if(!findAddress) throw new Error("not found");

        await prisma.address.delete({
            where: {
                id
            }
        })

        return
    }
}

export const addressService = new AddressService()