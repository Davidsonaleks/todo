import { ApolloQueryResult } from "apollo-client"
import { TRouteComponentProps } from "chyk"
import React, { FC, useState } from "react"
import { TLoadData } from "../../types"
import { GqlHome } from "./home-query"

type TTaskProps = {
  id: string
  name: string
  isDone: boolean
}

type TDataProps = {
  tasks: TTaskProps[]
}

type THomeData = ApolloQueryResult<TDataProps>
export const homeLoader: TLoadData<THomeData> = async (_, { apollo }) =>
  apollo.query({
    query: GqlHome,
  })

type THomeProps = TRouteComponentProps<THomeData>
export const Home: FC<THomeProps> = ({ data }) => {
  const tasks: TTaskProps[] = data.tasks
  const [value, setValue] = useState<string>("")
  // const create = async () => {
  //   const new_task = await
  // }
  return (
    <div>
      <div>HOME</div>
      <br />
      <br />
      <br />
      <br />
      {tasks.map(task => (
        <div key={task.id} style={{ display: "flex" }}>
          <div>{task.name}</div>
        </div>
      ))}
      NEW TASK
      <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}
