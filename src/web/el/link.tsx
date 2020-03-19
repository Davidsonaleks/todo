import { makeStyles, Typography, TypographyProps } from "@material-ui/core"
import React, { FC } from "react"
import { Link, LinkProps } from "react-router-dom"
import { TTheme } from "../theme"

type TRouterLinkProps = TypographyProps & LinkProps

export const RouterLink: FC<TRouterLinkProps> = props => {
  const classes = useStyles()
  return (
    <Typography className={classes.root} {...props} component={Link as any}>
      {props.children}
    </Typography>
  )
}
RouterLink.displayName = "RouterLink"

const useStyles = makeStyles<TTheme>(
  _theme => {
    return {
      root: {
        textDecoration: "none",
      },
    }
  },
  { name: RouterLink.displayName }
)
