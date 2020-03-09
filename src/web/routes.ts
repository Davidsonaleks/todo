import { TRouteConfig } from "chyk"
import { FC } from "react"
import { Home, homeLoader } from "./home/home"
import { Layout } from "./layout"
import { NotFound } from "./not-found/not-found"
import { NotHome } from "./not-home/not-home"

export const routes: TRouteConfig[] = [
  {
    component: Layout as FC,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home as FC,
        dataKey: "promotion",
        loadData: homeLoader,
      },
      {
        path: "/not-home",
        exact: true,
        component: NotHome as FC,
      },
      {
        component: NotFound as FC,
        loadData: async ({ chyk }: any) => chyk.set404(),
      },
    ],
  },
]