import { ApolloQueryResult } from "apollo-client"
import { TRouteComponentProps } from "chyk"
import React, { FC, useMemo } from "react"
import { TLoadData } from "../../types"
import { PageInner } from "../el/page-inner"
import { HomeCategoriesModel } from "./home-categories-model"
import { HomeCategories } from "./home-category/home-categories-root"
import { HomeContext } from "./home-ctx"
import { GqlHome } from "./home-query"
import { HomeTasksModel } from "./home-tasks-model"
import { HomeTasks } from "./home-tasks/home-tasks-root"
import { WebHome, WebHome_categories, WebHome_tasks } from "./types/WebHome"

type THomeData = { data: WebHome }
export const homeLoader: TLoadData<THomeData | null> = async (_, { apollo, userInterface }) => {
  userInterface.setHeaderTitle("Tasker")
  const r: ApolloQueryResult<WebHome> = await apollo.query({
    query: GqlHome,
  })
  return { data: r.data }
}

type THomeProps = TRouteComponentProps<THomeData>
export const Home: FC<THomeProps> = ({ data }) => {
  const categories_model = useMemo(() => {
    const categories_model = new HomeCategoriesModel()
    if (data.categories) {
      const cat = data.categories.filter(item => item && item) as WebHome_categories[]
      categories_model.setCategories(cat)
    }
    return categories_model
  }, [])

  const tasks_model = useMemo(() => {
    const tasks_model = new HomeTasksModel()
    if (data.tasks) {
      const tasks = data.tasks.filter(item => item && item) as WebHome_tasks[]
      tasks_model.setTasks(tasks)
    }
    return tasks_model
  }, [])

  return (
    <HomeContext.Provider value={{ categories_model, tasks_model }}>
      <HomeCategories />
      <PageInner>
        <HomeTasks />
      </PageInner>
    </HomeContext.Provider>
  )
}
