import { Chyk } from "chyk"
import { FC } from "react"
import { LayoutRoot } from "./layout-root"
import { routes } from "./routes"

const init = () => {
  new Chyk<{}>({
    routes,
    deps: {},
    statusCode: (window as any).ssr_statusCode,
    el: document.getElementById("app"),
    component: LayoutRoot as FC,
    onLoadError: err => {
      console.log("onLoadError", err)
    },
  })
}

init()
