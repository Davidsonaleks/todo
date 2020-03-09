import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient, { DefaultOptions } from "apollo-client"
import { ApolloLink } from "apollo-link"
import { createHttpLink } from "apollo-link-http"
import { Chyk } from "chyk"
import { createBrowserHistory } from "history"
import fetch from "node-fetch"
import { FC } from "react"
import { onErrorLink } from "../server/apollo"
import { TDeps } from "../types"
import { LayoutRoot } from "../web/layout-root"
import { routes } from "../web/routes"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
  },
  query: {
    fetchPolicy: "no-cache",
  },
}

const init = () => {
  const history = createBrowserHistory()
  const httpLink = createHttpLink({
    uri: (window as any).env.GRAPHQL_URL,
    fetch: fetch as any, // https://github.com/apollographql/apollo-client/issues/5367
  })
  const apollo = new ApolloClient({
    link: ApolloLink.from([onErrorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    queryDeduplication: false,
  })

  new Chyk<TDeps>({
    routes,
    history,
    deps: { apollo },
    statusCode: (window as any).ssr_statusCode,
    el: document.getElementById("app"),
    component: LayoutRoot as FC,
    onLoadError: err => {
      console.log("onLoadError", err)
    },
  })
}

init()
