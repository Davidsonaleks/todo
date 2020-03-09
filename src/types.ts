import ApolloClient from "apollo-client"
import { TLoadData as TChykLoadData } from "chyk"

export type TDeps = {
  apollo: ApolloClient<unknown>
}
export type TLoadData<T, M = any> = TChykLoadData<T, M, TDeps>
