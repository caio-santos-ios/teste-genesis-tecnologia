import { Router } from "express";
import { addressController } from "../controllers/address.controller";

export const addressRouter: Router = Router();

addressRouter.post("/", addressController.create)
addressRouter.get("/", addressController.read)
addressRouter.get("/:id", addressController.reatrive)
addressRouter.patch("/:id", addressController.update)
addressRouter.delete("/:id", addressController.destroy)