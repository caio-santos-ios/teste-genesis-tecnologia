import { Request, Response } from "express";
import { AppErro } from "../AppError";

export const handlerErro = (err: any, req: Request, res: Response) => {
    if(err instanceof AppErro) {
        return res.status(err.code).json({ message: err.message })
    }

    if(err instanceof TypeError) {
        return res.status(400).json({ message: err.message })
    }
    
    return res.status(500).json({ message: "Server error internal" })
}