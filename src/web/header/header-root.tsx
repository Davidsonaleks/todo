import { makeStyles } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { useUI } from "../../di"
import { BurgerIcon } from "../el/icons/burger"
import { PageInner } from "../el/page-inner"
import { TTheme } from "../theme"

export const Header: FC = () => {
  const classes = useStyles()
  const ui = useUI()
  const openMenu = () => {
    ui.isMobileMenu = !ui.isMobileMenu
  }
  return useObserver(() => (
    <PageInner component="nav">
      <div className={classes.root}>
        <BurgerIcon className={classes.icon} onClick={openMenu} />
      </div>
    </PageInner>
  ))
}
Header.displayName = "Header"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(2),
      },
      icon: {
        width: "22px",
        height: "22px",
      },
    }
  },
  { name: Header.displayName }
)
