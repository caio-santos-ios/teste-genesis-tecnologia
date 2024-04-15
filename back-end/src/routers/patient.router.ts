import { Router } from "express";
import { patientController } from "../controllers/patient.controller";

export const patientRouter: Router = Router();

patientRouter.post("/", patientController.create)
patientRouter.get("/", patientController.read)
patientRouter.get("/:id", patientController.reatrive)
patientRouter.patch("/:id", patientController.update)
patientRouter.delete("/:id", patientController.destroy)