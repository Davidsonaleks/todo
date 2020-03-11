import ApolloClient from "apollo-client"
import { TLoadData as TChykLoadData } from "chyk"
import { GraphQLFieldConfigMap, Thunk } from "graphql"

export type TDeps = {
  apollo: ApolloClient<unknown>
}
export type TLoadData<T, M = any> = TChykLoadData<T, M, TDeps>

export type TSchemaField = Thunk<
  GraphQLFieldConfigMap<
    any,
    any,
    {
      [key: string]: any
    }
  >
>
