import express, { urlencoded } from "express";
import cors from "cors";

import server from "./routes";

const app = express();

const whiteList = ["http://localhost:4200", "https://carloscsz.github.io"];
app.use(cors({ origin: whiteList }));
app.use(urlencoded({ extended: false }));
app.use(express.json());


app.use("/api", server);

export default app;
