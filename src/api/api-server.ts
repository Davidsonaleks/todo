require("dotenv").config()
import { ApolloServer } from "apollo-server-koa"
import Koa from "koa"
import { rootQuery } from "./schema/schema"

const { GRAPHQL_PORT } = process.env
const web_port = Number(GRAPHQL_PORT)

export const graphQLServer = new ApolloServer({
  schema: rootQuery,
  playground: true,
})

const server = new Koa()

server.use(graphQLServer.getMiddleware({ path: "/" }))

server.listen(web_port, () => {
  console.log("🚀 Api Server started", "http://localhost:" + web_port)
})
