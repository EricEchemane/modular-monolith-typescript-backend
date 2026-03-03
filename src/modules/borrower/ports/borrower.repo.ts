export interface Borrower {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  contactNumber: string;
  loanableAmount: number;
  createdAt: Date;
  updatedAt: Date;
  status: number;
}

export type BorrowerCreate = Omit<
  Borrower,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export type BorrowerUpdate = Partial<Borrower>;

export type BorrowerFilters = Partial<{
  status: number[];
  search: string;
  page: number;
  limit: number;
}>;

export interface IBorrowerRepository {
  create(borrower: BorrowerCreate): Promise<Borrower>;
  getById(id: number): Promise<Borrower | null>;
  getAll(filters?: BorrowerFilters): Promise<Borrower[]>;
  update(id: number, borrower: BorrowerUpdate): Promise<Borrower>;
  delete(id: number): Promise<void>;
}
