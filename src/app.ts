import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
dotenv.config();

const { createHandler } = require("graphql-http/lib/use/express");

import schema from "./schema";
import DatabaseService from "./config/db.service";

const app = express();

app.use(express.json());

app.use(morgan("common"));

const databaseService = DatabaseService.getInstance(
  String(process.env.MONGODB_URL)
);

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);

// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);

app.use("/graphql", graphqlHTTP({ schema, graphiql: false }));
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

async function startApp() {
  try {
    await databaseService.connect();

    app.all("/graphql", createHandler({ schema }));

    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
      console.log(`Backend server is running at port ${PORT}`);
      console.log(`GraphQL Server running at http://localhost:${PORT}/graphql`);
      console.log(`Playground at http://localhost:${PORT}/playground`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startApp();

export default app;
