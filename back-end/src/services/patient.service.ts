import { AppErro } from "../AppError";
import { prisma } from "../database/prisma";

class PatientService {
    async create(payload: any) {   
        const findPatient = await prisma.patient.findUnique({
            where: {
                cpf: payload.cpf
            }
        })
       
        if(findPatient) throw new AppErro("CPF inválido", 400)
       
        const patient = await prisma.patient.create({
            data: payload
        })

        return patient;
    }

    async read() {
        const patienties = await prisma.patient.findMany();

        return patienties;
    }

    async retrive(id: number) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        if(!patient) throw new AppErro("not found", 404)

        return patient;
    }

    async update(id: number, payload: any) {
        const patient = await prisma.patient.findUnique({
            where: {
                id
            }
        })

        if(!patient) throw new AppErro("not found", 404)

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

        if(!patient) throw new AppErro("not found", 404)

        await prisma.patient.delete({
            where: {
                id
            }
        })

        return;
    }
}

export const patientService = new PatientService()