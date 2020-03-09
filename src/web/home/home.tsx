import { ApolloQueryResult } from "apollo-client"
import { TRouteComponentProps } from "chyk"
import React, { FC, useState } from "react"
import { TLoadData } from "../../types"
import { GqlHome } from "./home-query"

type THomeData = ApolloQueryResult<{}>
export const homeLoader: TLoadData<THomeData> = async (_, { apollo }) =>
  apollo.query({
    query: GqlHome,
  })

type THomeProps = TRouteComponentProps<THomeData>
export const Home: FC<THomeProps> = ({ data }) => {
  const [counter, setCounter] = useState<number>(0)
  const incriment = () => {
    setCounter(prev => prev + 1)
  }
  return (
    <div>
      <div>HOME aaaa</div>
      <div className="">{counter}</div>
      <button onClick={incriment}>+</button>
      {JSON.stringify(data)}
    </div>
  )
}
