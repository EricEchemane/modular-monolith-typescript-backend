import { prisma } from "@/lib/prisma";
import {
  Borrower,
  BorrowerCreate,
  BorrowerFilters,
  IBorrowerRepository,
} from "../ports/borrower.repo";
import { BorrowerUpdate } from "../ports/borrower.repo";
import { Prisma } from "generated/prisma";

export class PrismaBorrowerRepository implements IBorrowerRepository {
  private borrowers: Borrower[] = [];

  async create(borrower: BorrowerCreate): Promise<Borrower> {
    const inserted = await prisma.borrower.create({
      data: borrower,
    });
    const newBorrower = {
      ...inserted,
      loanableAmount: inserted.loanableAmount.toNumber(),
    };
    return newBorrower;
  }

  async getById(id: number): Promise<Borrower | null> {
    return this.borrowers.find((borrower) => borrower.id === id) ?? null;
  }

  async getAll(filters?: BorrowerFilters): Promise<Borrower[]> {
    const where: Prisma.BorrowerWhereInput = {};

    if (filters?.search?.trim()) {
      where.OR = [
        { firstName: { contains: filters.search } },
        // { lastName: { contains: filters.search, mode: 'insensitive' } },
        // { middleName: { contains: filters.search, mode: 'insensitive' } },
        // { email: { contains: filters.search, mode: 'insensitive' } },
        // { contactNumber: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    console.log(where);

    const rows = await prisma.borrower.findMany({ where });
    return rows.map((row) => ({
      ...row,
      loanableAmount: row.loanableAmount.toNumber(),
    }));
  }

  async update(id: number, borrower: BorrowerUpdate): Promise<Borrower> {
    const index = this.borrowers.findIndex((borrower) => borrower.id === id);
    if (index === -1) {
      throw new Error("Borrower not found");
    }
    this.borrowers[index] = { ...this.borrowers[index], ...borrower };
    return this.borrowers[index];
  }

  async delete(id: number): Promise<void> {
    this.borrowers = this.borrowers.filter((borrower) => borrower.id !== id);
  }
}
