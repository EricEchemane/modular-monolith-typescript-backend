import { Router } from "express";
import { BorrowerService } from "./borrower.service";
import { BorrowerController } from "./borrower.controller";

export function createBorrowerRoutes(service: BorrowerService): Router {
  const router = Router();
  const controller = new BorrowerController(service);

  router.post("/", (req, res) => controller.createBorrower(req, res));
  router.get("/", (req, res) => controller.getAllBorrowers(req, res));

  return router;
}
