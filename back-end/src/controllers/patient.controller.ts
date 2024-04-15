import { Request, Response } from "express";
import { patientService } from "../services/patient.service";

class PatientController {
    async create(req: Request, res: Response) {
        const patient = await patientService.create(req.body)

        return res.status(201).json(patient)
    }

    async read(req: Request, res: Response) {
        const patients = await patientService.read()

        return res.status(200).json(patients)
    }
    
    async reatrive(req: Request, res: Response) {
        const patient = await patientService.retrive(Number(req.params.id))

        return res.status(200).json(patient)
    }

    async update(req: Request, res: Response) {
        const patient = await patientService.update(Number(req.params.id), req.body)

        return res.status(200).json(patient)
    }

    async destroy(req: Request, res: Response) {
        await patientService.destroy(Number(req.params.id))

        return res.status(204).json()
    }
}

export const patientController = new PatientController();