import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core"
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects"
import MenuIcon from "@material-ui/icons/Menu"
import clsx from "clsx"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { setCookie } from "../../browser/cookies"
import { useUI } from "../../di"
import { DarkThemeCookies } from "../../util/common"
import { PageInner } from "../el/page-inner"
import { TTheme } from "../theme"

export const Header: FC = () => {
  const classes = useStyles()
  const ui = useUI()
  const openMenu = () => {
    ui.setMobileMenu(true)
  }
  const changeTheme = (b: boolean) => {
    ui.setDarkTheme(b)
    setCookie(DarkThemeCookies, String(b), 365)
  }
  return useObserver(() => (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <PageInner component="nav" className={clsx(classes.flex, classes.root)}>
          <div className={classes.flex}>
            <MenuIcon className={classes.icon2} onClick={openMenu} />
            <Typography variant="h2" className={classes.title}>
              {ui.headerTitle}
            </Typography>
          </div>
          <EmojiObjectsIcon
            className={classes.icon2}
            onClick={() => changeTheme(!ui.isDarkTheme)}
          />
        </PageInner>
      </Toolbar>
    </AppBar>
  ))
}
Header.displayName = "Header"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        width: "100%",
        justifyContent: "space-between",
      },
      icon2: {
        width: "26px",
        height: "26px",
        fill: theme.custom.colors.white,
      },
      flex: {
        display: "flex",
        alignItems: "center",
      },
      title: {
        marginLeft: theme.spacing(2),
        color: theme.custom.colors.white,
      },
      toolbar: {
        padding: 0,
      },
    }
  },
  { name: Header.displayName }
)
