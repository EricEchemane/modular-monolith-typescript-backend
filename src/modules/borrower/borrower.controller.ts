import z from "zod";
import { BorrowerCreateSchema } from "../../common/validator";
import { BorrowerService } from "./borrower.service";
import { Request, Response } from "express";

export class BorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  async createBorrower(req: Request, res: Response): Promise<void> {
    const validatedData = BorrowerCreateSchema.safeParse(req.body);
    if (!validatedData.success) {
      res
        .status(400)
        .json({ error: z.treeifyError(validatedData.error).properties });
      return;
    }
    const borrower = await this.borrowerService.createBorrower(
      validatedData.data,
    );
    res.status(201).json(borrower);
  }

  async getAllBorrowers(req: Request, res: Response): Promise<void> {
    const borrowers = await this.borrowerService.getAllBorrowers(req.query);
    res.json(borrowers);
  }
}
