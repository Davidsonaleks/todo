import { createMuiTheme, Theme } from "@material-ui/core"

const colors = {
  blue: {
    light: "#3366ff",
    dark: "#333",
  },
  background: {
    light: "#fff",
    dark: "#212121",
  },
}

//colors
//const background = "#f3f5f9"
const white = "#fff"

//gap
const spacing = 12
const innerPadding = 18

type TCustomRakebackTheme = {
  gap: {
    innerPadding: number
  }
  colors: {
    white: string
  }
}

const getCustomRakebackTheme = (): TCustomRakebackTheme => {
  return {
    gap: {
      innerPadding,
    },
    colors: {
      white,
    },
  }
}

export type TTheme = Theme & { custom: TCustomRakebackTheme }

export const getMuiTheme = (mode: "dark" | "light"): TTheme => {
  const custom = getCustomRakebackTheme()
  return {
    custom,
    ...getTheme(mode),
  }
}

export const getTheme = (mode: "dark" | "light") => {
  return createMuiTheme({
    spacing,
    palette: {
      primary: {
        main: colors.blue[mode],
      },
      background: {
        default: colors.background[mode],
      },
    },
    mixins: {},
    typography: {
      // fontFamily: '"Open Sans",sans-serif',
      // h1: h1, //Title T1
      // h2: h2, //Title T2
      // h3: h3, //Title T3
      // h4: h4, //Subheader 1
      // h5: h5, //Subheader 2
      // h6: h6, //Subheader 3
      // body1: body1, //Text
      // body2: body2, //Subtext
      // subtitle1: subtitle1, //Text Button
      // subtitle2: subtitle2, //Button 2
      // button: button, //Button 1
      // overline: overline, //Caption Date
    },
    overrides: {},
    props: {
      MuiTextField: {
        variant: "outlined",
        fullWidth: true,
        margin: "dense",
      },
    },
  })
}
