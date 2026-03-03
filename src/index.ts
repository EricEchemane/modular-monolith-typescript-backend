import "dotenv/config";
import { createApp } from "./app";
import { PrismaBorrowerRepository } from "./modules/borrower/infra/borrower.infra";

const PORT = process.env.PORT ?? 8000;

const app = createApp({
  borrowerRepository: new PrismaBorrowerRepository(),
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
