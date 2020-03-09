require("dotenv").config()
import cors from "@koa/cors"
import { ApolloServer } from "apollo-server-koa"
import Koa from "koa"
import { connect, connection } from "mongoose"
import { rootQuery } from "./schema/schema"

const { GRAPHQL_PORT } = process.env
const web_port = Number(GRAPHQL_PORT)

export const graphQLServer = new ApolloServer({
  schema: rootQuery,
  playground: true,
})

const server = new Koa()

server.use(cors({ credentials: true }))

connect(
  "mongodb+srv://admin:123qwe@cluster0-iervk.azure.mongodb.net/graphql?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
)

server.use(graphQLServer.getMiddleware({ path: "/" }))

connection.on("error", err => console.log("Connection to DB Error " + err))
connection.once("open", () => console.log("Connection to DB Success!"))

server.listen(web_port, () => {
  console.log("🚀 Api Server started", "http://localhost:" + web_port)
})
