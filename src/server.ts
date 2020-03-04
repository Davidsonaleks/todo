require("dotenv").config()
import Koa, { Middleware } from "koa"

const { WDS_PORT, PORT } = process.env
const web_port = Number(PORT)
const server = new Koa()

const spa_middleware: Middleware = async (ctx, next) => {
  ctx.body = template()
  await next()
}

server.use(spa_middleware)
server.listen(web_port, () => {
  console.log("🚀 Web Server started", "http://localhost:" + web_port)
})

const template = () => `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="yandex-verification" content="62d185b643083c98" />
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700&display=swap&subset=cyrillic" rel="stylesheet">
</head>
<body>
  <div id="app"</div>

  <script src="${WDS_PORT ? `http://localhost:${WDS_PORT}/dist/web.js` : "/dist/web.js"}"></script>
  </body>
  </html>
  `
