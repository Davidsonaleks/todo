import { TRouteConfig } from "chyk"
import { FC } from "react"
import { Home, homeLoader } from "./home/home"
import { Layout } from "./layout"
import { NotFound } from "./not-found/not-found"
import { taskLoader, TaskRoot } from "./task/task-root"

export const routes: TRouteConfig[] = [
  {
    component: Layout as FC,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home as FC,
        dataKey: "home",
        loadData: homeLoader,
      },
      {
        path: "/task/:id",
        exact: true,
        component: TaskRoot as FC,
        dataKey: "task",
        loadData: taskLoader,
      },
      {
        component: NotFound as FC,
        loadData: async ({ chyk }: any) => chyk.set404(),
      },
    ],
  },
]
