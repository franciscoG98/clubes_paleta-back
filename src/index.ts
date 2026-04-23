import express, { Request, Response, NextFunction } from "express";
import db from "./models";
import canchaRoutes from "./routes/canchas";
import pendingCanchaRoutes from "./routes/pendingCancha";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config"
import path from "path";

import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import { options } from "./swaggerOptions"
import { buildCorsAllowlist, createCorsOptions } from "./corsOptions";
import { ensureAddressColumns } from "./ensureAddressColumns";

const app = express();

const corsAllowlist = buildCorsAllowlist();
app.use(cors(createCorsOptions(corsAllowlist))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by")

// TODO: imagenes canchas
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


// TODO: port on env
const PORT = process.env.PORT || 3001;

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello my pelotari friend!");
});
app.use("/canchas", canchaRoutes);
app.use("/pending-canchas", pendingCanchaRoutes);

const specs = swaggerJSDoc(options)
app.use("/docs", serve, setup(specs))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

// db sync
const syncDatabase = async () => {
  try {
    // await (db as any).sequelize.sync({ force: true });
    await (db as any).sequelize.sync({ force: false });
    await ensureAddressColumns((db as any).sequelize);
    console.log("\nDatabase successfully synchronized.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

// sync db and after start server
syncDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} \n`);
  });
});
