import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { useUI } from "../di"
import { getMuiTheme } from "./theme"

export const LayoutRoot: FC = ({ children }) => {
  const ui = useUI()
  return useObserver(() => (
    <ThemeProvider theme={getMuiTheme(ui.isDarkTheme ? "dark" : "light")}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  ))
}
