import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React, { FC } from "react"
import { getMuiTheme } from "./theme"

export const LayoutRoot: FC = ({ children }) => {
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
