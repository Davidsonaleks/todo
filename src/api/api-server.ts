require("dotenv").config()
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

connect(
  "mongodb+srv://admin:123qwe@cluster0-iervk.azure.mongodb.net/graphql?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
)

server.use(graphQLServer.getMiddleware({ path: "/" }))

connection.on("error", err => console.log("COnnection Error " + err))
connection.once("open", () => console.log("COnnection to DB!"))

server.listen(web_port, () => {
  console.log("🚀 Api Server started", "http://localhost:" + web_port)
})
