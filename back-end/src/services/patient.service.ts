import { prisma } from "../database/prisma";

class PatientService {
    async create(payload: any) {
        let myAddress;
    
        const findPatient = await prisma.patient.findUnique({
            where: {
                cpf: payload.cpf
            }
        })

        if(findPatient) throw new Error("CPF inválido")

        const findAddress = await prisma.address.findUnique({
            where: {
                code: payload.address.code
            }
        })

        if(findAddress) {
            myAddress = findAddress;
        } else {
            myAddress = await prisma.address.create({
                data: payload.address
            })
        }

        delete payload.address
       
        const patient = await prisma.patient.create({
            data: {
                ...payload,                
                addressId: 1
            }
        })

        return patient;
    }

    async read() {
        const patienties = await prisma.patient.findMany({
            include: {
                address: true
            }
        });

        return patienties;
    }

    async retrive(id: number) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        if(!patient) throw new Error("not found")

        return patient;
    }

    async update(id: number, payload: any) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        if(!patient) throw new Error("not found")

        const patientUpdated = await prisma.patient.update({
            where: {
                id
            },
            data: payload
        })

        return patientUpdated;
    }
    
    async destroy(id: number) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        if(!patient) throw new Error("not found")

        await prisma.patient.delete({
            where: {
                id
            }
        })

        return;
    }
}

export const patientService = new PatientService()