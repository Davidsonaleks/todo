require("dotenv").config()
import cors from "@koa/cors"
import { ApolloServer } from "apollo-server-koa"
import Koa from "koa"
import { connect } from "mongoose"
import { rootQuery } from "./schema/schema"

const { GRAPHQL_PORT } = process.env
const web_port = Number(GRAPHQL_PORT)
const MONGO_URL = process.env.MONGO_URL || ""

export const graphQLServer = new ApolloServer({
  schema: rootQuery,
  playground: true,
})

const server = new Koa()

server.use(cors({ credentials: true }))
server.use(graphQLServer.getMiddleware({ path: "/" }))

const start = async () => {
  try {
    await connect(
      MONGO_URL,
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
      error => {
        if (error) console.log("Connection to DB Error " + error)
        console.log("Connection to DB Success!")
      }
    )
    server.listen(web_port, () => {
      console.log("🚀 Api Server started", "http://localhost:" + web_port)
    })
  } catch (e) {
    console.log("API server error:" + e)
  }
}

start()
