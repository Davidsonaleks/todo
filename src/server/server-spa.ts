require("dotenv").config()
import { ServerStyleSheets } from "@material-ui/core"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import { Chyk, ChykStaticComponent } from "chyk"
import { Middleware } from "koa"
import fetch from "node-fetch"
import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { TDeps } from "../types"
import { DarkThemeCookies } from "../util/common"
import { WebUi } from "../util/user-interface"
import { LayoutRoot } from "../web/layout-root"
import { routes } from "../web/routes"
import { onErrorLink } from "./apollo"

const { WDS_PORT, DISABLE_SSR, GRAPHQL_PORT } = process.env
const graphql_uri = `http://localhost:${GRAPHQL_PORT}/`

export const spa_middleware: Middleware = async (ctx, next) => {
  const pathname: string = ctx.url || ""

  if (DISABLE_SSR === "true") {
    ctx.status = 200
    ctx.body = template({ html: "", statusCode: 200, css: "" })
  } else {
    const isDarkTheme = JSON.parse(ctx.cookies.get(DarkThemeCookies) || "false")
    const userInterface = new WebUi()
    userInterface.setDarkTheme(isDarkTheme)

    const sheets = new ServerStyleSheets()
    const httpLink = createHttpLink({
      uri: graphql_uri,
      fetch: fetch as any, // https://github.com/apollographql/apollo-client/issues/5367
    })
    const apollo = new ApolloClient({
      link: ApolloLink.from([onErrorLink, httpLink]),
      cache: new InMemoryCache(),
      ssrMode: true,
    })

    const chyk = new Chyk<TDeps>({
      routes,
      deps: { apollo, userInterface },
      component: LayoutRoot,
      onLoadError: () => {}, // we catch all errors in apollo error link
    })
    await chyk.loadData(pathname)
    const html = renderToString(sheets.collect(createElement(ChykStaticComponent, { chyk })))
    const css = sheets.toString()
    const { statusCode } = chyk.locationState
    ctx.body = template({ html, statusCode, css })
  }
  await next()
}

type TTemplateProps = {
  html: string
  statusCode: number
  css: string
}

const template = (props: TTemplateProps) => `
  <!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style id="jss-server-side">${props.css}</style>
  </head>
  <body>
    <div id="app">${props.html}</div>
    <script>window.env = ${JSON.stringify({ GRAPHQL_URL: graphql_uri })}</script>
    <script src="${
      WDS_PORT ? `http://localhost:${WDS_PORT}/dist/web.js` : "/dist/web.js"
    }"></script>
    <script>window.ssr_statusCode = ${props.statusCode}</script>
    </body>
    </html>
    `
