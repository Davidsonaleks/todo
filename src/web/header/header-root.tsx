import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { TTheme } from "../theme"

export const Header: FC = () => {
  const classes = useStyles()
  return <div className={classes.root}>Header</div>
}
Header.displayName = "Header"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        margin: theme.spacing(4),
        color: "red",
      },
    }
  },
  { name: Header.displayName }
)
