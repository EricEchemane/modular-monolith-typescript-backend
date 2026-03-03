import { BorrowerService } from "../borrower.service";
import {
  Borrower,
  BorrowerCreate,
  BorrowerFilters,
  BorrowerUpdate,
  IBorrowerRepository,
} from "../ports/borrower.repo";

class InMemoryBorrowerRepository implements IBorrowerRepository {
  private borrowers: Borrower[] = [];
  private nextId = 1;

  async create(borrower: BorrowerCreate): Promise<Borrower> {
    const created: Borrower = {
      id: this.nextId++,
      ...borrower,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 1,
    };
    this.borrowers.push(created);
    return created;
  }

  async getById(id: number): Promise<Borrower | null> {
    return this.borrowers.find((b) => b.id === id) ?? null;
  }

  async getAll(_filters?: BorrowerFilters): Promise<Borrower[]> {
    return this.borrowers;
  }

  async update(id: number, borrower: BorrowerUpdate): Promise<Borrower> {
    const idx = this.borrowers.findIndex((b) => b.id === id);
    if (idx === -1) {
      throw new Error("Borrower not found");
    }
    this.borrowers[idx] = { ...this.borrowers[idx], ...borrower };
    return this.borrowers[idx];
  }

  async delete(id: number): Promise<void> {
    this.borrowers = this.borrowers.filter((b) => b.id !== id);
  }
}

describe("BorrowerService", () => {
  it("creates, read, updates, and deletes a borrower via the repository", async () => {
    const repo = new InMemoryBorrowerRepository();
    const service = new BorrowerService(repo);

    let borrowers = await service.getAllBorrowers();
    expect(borrowers.length).toBe(0);

    const input: BorrowerCreate = {
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      email: "john.doe@example.com",
      contactNumber: "1234567890",
      loanableAmount: 1000,
    };

    const created = await service.createBorrower(input);

    expect(created.id).toBeDefined();
    expect(created.firstName).toBe(input.firstName);

    const fetched = await service.getBorrowerById(created.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.email).toBe(input.email);

    const updated = await service.updateBorrower(created.id, {
      email: "john.doe@example.com",
    });
    expect(updated.email).toBe("john.doe@example.com");

    await service.deleteBorrower(created.id);
    const deleted = await service.getBorrowerById(created.id);
  });
});
