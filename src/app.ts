import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import axios from "axios";

import server from "./routes";

const app = express();

const whiteList = ["http://localhost:4200", "http://localhost:4001"];
app.use(cors({ origin: whiteList }));
app.use(urlencoded({ extended: false }));
app.use(express.json());

const baseEndpoint =
  "https://www.inegi.org.mx/app/api/denue/v1/consulta/Nombre/";

app.post("/api/consultas", async (req: Request, res: Response) => {
  const { body } = req;
  const apiKey = "ed089a83-ba8c-483c-bd81-35ee59067f65";
  const condicion = body.condicion.split(" ").join("%20");
  const consulta = `${baseEndpoint}${condicion}/${body.claveEnt}/${body.registroInit}/${body.registroFinal}/${apiKey}`;
  console.log("consulta: ", consulta);
  const response = await axios.get(consulta);
  console.log("response: ", response.data);
  res.send(response.data).status(201);
});
app.use("/api", server);

export default app;
