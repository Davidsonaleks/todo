import { makeStyles } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { useUI } from "../../di"
import { PageInner } from "../el/page-inner"
import { TTheme } from "../theme"

export const Header: FC = () => {
  const classes = useStyles()
  const ui = useUI()
  const openMenu = () => {
    ui.isMobileMenu = !ui.isMobileMenu
  }
  return useObserver(() => (
    <div className={classes.root}>
      <PageInner component="nav">
        <MenuIcon className={classes.icon2} onClick={openMenu} />
      </PageInner>
    </div>
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
        height: "52px",
        backgroundColor: theme.palette.primary.main,
      },
      icon: {
        width: "22px",
        height: "22px",
        fill: theme.custom.colors.white,
      },
      icon2: {
        width: "30px",
        height: "30px",
        fill: theme.custom.colors.white,
      },
    }
  },
  { name: Header.displayName }
)
