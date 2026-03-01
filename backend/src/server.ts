import dotenv from "dotenv";
import { createApp } from "./app.js";

dotenv.config();

const port = Number(process.env.PORT || 8080);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "*";
const app = createApp({ frontendOrigin });

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

