import * as z from "zod";

export const BorrowerCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  middleName: z.string().min(1),
  email: z.email(),
  contactNumber: z.string().min(1),
  loanableAmount: z.number().min(0),
});
