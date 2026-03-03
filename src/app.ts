import { IBorrowerRepository } from "./modules/borrower/ports/borrower.repo";
import express from "express";
import { createBorrowerRoutes } from "./modules/borrower/borrower.routes";
import { BorrowerService } from "./modules/borrower/borrower.service";

export function createApp(deps: { borrowerRepository: IBorrowerRepository }) {
  const app = express();
  app.use(express.json());

  const borrowerService = new BorrowerService(deps.borrowerRepository);
  app.use("/api/borrowers", createBorrowerRoutes(borrowerService));

  return app;
}
