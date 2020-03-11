import { CssBaseline, ThemeProvider } from "@material-ui/core"
import React, { FC } from "react"
import { getMuiTheme } from "./theme"

export const LayoutRoot: FC = ({ children }) => (
  <ThemeProvider theme={getMuiTheme()}>
    <CssBaseline />
    {children}
  </ThemeProvider>
)
