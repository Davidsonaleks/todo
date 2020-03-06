require("dotenv").config()
import { Chyk, ChykStaticComponent } from "chyk"
import { Middleware } from "koa"
import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { LayoutRoot } from "../web/layout-root"
import { routes } from "../web/routes"

const { WDS_PORT, DISABLE_SSR } = process.env

export const spa_middleware: Middleware = async (ctx, next) => {
  const pathname: string = ctx.url || ""
  const chyk = new Chyk<{}>({
    routes,
    deps: {},
    component: LayoutRoot,
    onLoadError: () => {}, // we catch all errors in apollo error link
  })
  if (DISABLE_SSR === "true") {
    ctx.status = 200
    ctx.body = template({ html: "", statusCode: 200 })
  } else {
    await chyk.loadData(pathname)
    const html = renderToString(createElement(ChykStaticComponent, { chyk }))
    const { statusCode } = chyk.locationState
    ctx.body = template({ html, statusCode })
  }
  await next()
}

type TTemplateProps = {
  html: string
  statusCode: number
}

const template = (props: TTemplateProps) => `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>
  <body>
    <div id="app">${props.html}</div>
  
    <script src="${
      WDS_PORT ? `http://localhost:${WDS_PORT}/dist/web.js` : "/dist/web.js"
    }"></script>
    <script>window.ssr_statusCode = ${props.statusCode}</script>
    </body>
    </html>
    `
