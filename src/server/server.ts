require("dotenv").config()
import Koa from "koa"
import { spa_middleware } from "./server-spa"

const { PORT } = process.env
const web_port = Number(PORT)
const server = new Koa()

server.use(spa_middleware)
server.listen(web_port, () => {
  console.log("🚀 Web Server started", "http://localhost:" + web_port)
})
