import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import userRouter from "./Routes/UserRoutes.js";
import bookRouter from "./Routes/BookRoutes.js";
import issueRouter from "./Routes/IssueRoutes.js";
import issuedBookRouter from "./Routes/IssuedBookRoutes.js";
import { AppError } from "./Middlwares/AppError.js";

import { typeDefs } from "./Schema/typeDefs.js";
import { resolvers } from "./Schema/resolvers.js";
import { pubsub } from "./Server/pubsub.js";
import { authChecker } from "./Middlwares/AuthMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/issueBook", issueRouter);
app.use("/api/v1/issuedBooks", issuedBookRouter);


app.use(AppError);

mongoose
  .connect(
    process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD)
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB Error:", err));


const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer(
  {
    schema,
    context: async () => ({ pubsub }),
  },
  wsServer
);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

await apolloServer.start();
app.use(
  "/graphql",
  express.json(),
  authChecker,
  expressMiddleware(apolloServer,{
    context: async ({req}) =>({ user:req.user,pubsub })
  })
);



const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 GraphQL endpoint ready at http://localhost:${PORT}/graphql`);
});
