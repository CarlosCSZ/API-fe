import "dotenv/config";

import app from "./src/app";
import { dbConnect } from "./config/database";


dbConnect();
const port = process.env.PORT ?? 3000;

app.listen(port, () =>
  console.log(`[server] Connected to port ${port}`)
);
