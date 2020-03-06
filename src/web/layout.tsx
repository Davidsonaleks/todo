import { DataRoutes, TRouteComponentProps, useChyk } from "chyk"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import { NotFound } from "./not-found/not-found"

type TLayoutProps = TRouteComponentProps<{}>

export const Layout: FC<TLayoutProps> = ({ route }) => {
  const chyk = useChyk()
  return (
    <div className="Layout">
      <Link to="/">HOME</Link>
      <Link to="/not-home">NOT HOME</Link>
      <Link to="/sadfasdf">404</Link>
      <div>{chyk.is404 ? <NotFound /> : route.routes && <DataRoutes routes={route.routes} />}</div>
    </div>
  )
}
