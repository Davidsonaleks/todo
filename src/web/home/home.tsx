import { ApolloQueryResult } from "apollo-client"
import { TRouteComponentProps } from "chyk"
import React, { FC, useState } from "react"
import { TLoadData } from "../../types"
import { GqlHome } from "./home-query"
import { WebHome } from "./types/WebHome"

type THomeData = ApolloQueryResult<WebHome>
export const homeLoader: TLoadData<THomeData> = async (_, { apollo }) =>
  apollo.query({
    query: GqlHome,
  })

type THomeProps = TRouteComponentProps<THomeData>
export const Home: FC<THomeProps> = ({ data }) => {
  console.log(data)
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
      {/* {tasks.map(task => (
        <div key={task.id} style={{ display: "flex" }}>
          <div>{task.name}</div>
        </div>
      ))} */}
      NEW TASK
      <input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}
