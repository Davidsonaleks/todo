import { createContext, useContext } from "react"
import { HomeCategoriesModel } from "./home-categories-model"
import { HomeTasksModel } from "./home-tasks-model"

type THomeContextProps = {
  categories_model: HomeCategoriesModel
  tasks_model: HomeTasksModel
}

export const HomeContext = createContext<THomeContextProps>(null as any)
export const useHomeContext = () => useContext(HomeContext)
