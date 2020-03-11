import { DataRoutes, TRouteComponentProps } from "chyk"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { useUI, useWebChyk } from "../di"
import { Locker } from "./el/locker"
import { Header } from "./header/header-root"
import { NotFound } from "./not-found/not-found"

type TLayoutProps = TRouteComponentProps<{}>

export const Layout: FC<TLayoutProps> = ({ route }) => {
  const chyk = useWebChyk()
  const ui = useUI()
  return useObserver(() => (
    <>
      <Header />

      {chyk.is404 ? <NotFound /> : route.routes && <DataRoutes routes={route.routes} />}

      <Locker show={chyk.loading || ui.isLocker} />
    </>
  ))
}
