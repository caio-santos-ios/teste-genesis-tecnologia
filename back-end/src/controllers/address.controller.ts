import { Request, Response } from "express";
import { addressService } from "../services/address.service";

class AddressController {
    async create(req: Request, res: Response) {
        const patient = await addressService.create(req.body)

        return res.status(201).json(patient)
    }

    async read(req: Request, res: Response) {
        const patients = await addressService.read()

        return res.status(200).json(patients)
    }
    
    async reatrive(req: Request, res: Response) {
        const patient = await addressService.retrive(Number(req.params.id))

        return res.status(200).json(patient)
    }

    async update(req: Request, res: Response) {
        const patient = await addressService.update(Number(req.params.id), req.body)

        return res.status(200).json(patient)
    }

    async destroy(req: Request, res: Response) {
        await addressService.destroy(Number(req.params.id))

        return res.status(204).json()
    }
}

export const addressController = new AddressController();