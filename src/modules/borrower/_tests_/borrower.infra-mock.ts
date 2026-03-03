import {
  Borrower,
  BorrowerCreate,
  IBorrowerRepository,
} from "../ports/borrower.repo";
import { BorrowerUpdate } from "../ports/borrower.repo";

export class InMemoryBorrowerRepository implements IBorrowerRepository {
  private borrowers: Borrower[] = [];

  async create(borrower: BorrowerCreate): Promise<Borrower> {
    const newBorrower = {
      ...borrower,
      id: this.borrowers.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 1,
    };
    this.borrowers.push(newBorrower);
    return newBorrower;
  }

  async getById(id: number): Promise<Borrower | null> {
    return this.borrowers.find((borrower) => borrower.id === id) ?? null;
  }

  async getAll(): Promise<Borrower[]> {
    return this.borrowers;
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
