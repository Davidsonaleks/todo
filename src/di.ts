import { Chyk, useChyk } from "chyk"
import { TDeps } from "./types"

export const useWebChyk = (): Chyk<TDeps> => useChyk<TDeps>()

export const useApollo = () => useWebChyk().deps.apollo
