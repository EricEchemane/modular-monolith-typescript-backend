import {
  Borrower,
  BorrowerCreate,
  BorrowerFilters,
  BorrowerUpdate,
  IBorrowerRepository,
} from "./ports/borrower.repo";

export class BorrowerService {
  constructor(private readonly borrowerRepository: IBorrowerRepository) {}

  async createBorrower(borrower: BorrowerCreate): Promise<Borrower> {
    return this.borrowerRepository.create(borrower);
  }

  async getBorrowerById(id: number): Promise<Borrower | null> {
    return this.borrowerRepository.getById(id);
  }

  async getAllBorrowers(filters?: BorrowerFilters): Promise<Borrower[]> {
    return this.borrowerRepository.getAll(filters);
  }

  async updateBorrower(
    id: number,
    borrower: BorrowerUpdate,
  ): Promise<Borrower> {
    return this.borrowerRepository.update(id, borrower);
  }

  async deleteBorrower(id: number): Promise<void> {
    return this.borrowerRepository.delete(id);
  }
}
