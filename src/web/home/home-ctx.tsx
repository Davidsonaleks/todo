import { createContext, useContext } from "react"
import { HomeCategoriesModel } from "./home-categories-model"

type THomeContextProps = {
  categories_model: HomeCategoriesModel
}

export const HomeContext = createContext<THomeContextProps>(null as any)
export const useHomeContext = () => useContext(HomeContext)
