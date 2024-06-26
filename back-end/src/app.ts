import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import { patientRouter } from "./routers/patient.router";
import { handlerErro } from "./middlewares/handlerErro.middleware";

export const app = express()

app.use(json())
app.use(cors())
app.use("/api/patients", patientRouter)
app.use(handlerErro)