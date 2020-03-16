import { ApolloQueryResult } from "apollo-client"
import { TRouteComponentProps } from "chyk"
import React, { FC, useMemo, useState } from "react"
import { useApollo } from "../../di"
import { TLoadData } from "../../types"
import { PageInner } from "../el/page-inner"
import { HomeCategories } from "./home-categories"
import { HomeCategoriesModel } from "./home-categories-model"
import { HomeContext } from "./home-ctx"
import { GqlHome, GqlHomeCreate } from "./home-query"
import { WebAddTask, WebAddTaskVariables } from "./types/WebAddTask"
import { WebHome, WebHome_categories } from "./types/WebHome"

type THomeData = ApolloQueryResult<WebHome>
export const homeLoader: TLoadData<THomeData> = async (_, { apollo }) =>
  apollo.query({
    query: GqlHome,
  })

type THomeProps = TRouteComponentProps<THomeData>
export const Home: FC<THomeProps> = ({ data }) => {
  const { tasks } = data
  const apollo = useApollo()
  const [value, setValue] = useState<string>("")
  const create = async () => {
    await apollo.mutate<WebAddTask, WebAddTaskVariables>({
      mutation: GqlHomeCreate,
      variables: {
        name: value,
        isDone: false,
      },
    })
  }

  const categories_model = useMemo(() => {
    const categories_model = new HomeCategoriesModel()
    if (data.categories) {
      const cat = data.categories.filter(item => item && item) as WebHome_categories[]
      categories_model.setCategories(cat)
    }
    return categories_model
  }, [])
  return (
    <HomeContext.Provider value={{ categories_model }}>
      <HomeCategories />
      <PageInner>
        <div>HOME</div>
        <br />
        <br />
        <br />
        <br />
        {tasks &&
          tasks.map(task => (
            <div key={task!.id} style={{ display: "flex" }}>
              <div>{task!.name}</div>
            </div>
          ))}
        NEW TASK
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={create}>Go</button>
      </PageInner>
    </HomeContext.Provider>
  )
}
