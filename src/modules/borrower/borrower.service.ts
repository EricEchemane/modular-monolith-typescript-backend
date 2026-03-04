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

  async updateStatusBasedOnLoanableAmount(
    id: number,
  ): Promise<Borrower | null> {
    const borrower = await this.borrowerRepository.getById(id);
    if (!borrower) {
      return null;
    }
    const minimumLoanableAmount = 500_000;
    if (borrower.loanableAmount < minimumLoanableAmount) {
      await this.borrowerRepository.update(id, { status: 2 });
    } else {
      await this.borrowerRepository.update(id, { status: 1 });
    }
    return this.borrowerRepository.getById(id);
  }
}
