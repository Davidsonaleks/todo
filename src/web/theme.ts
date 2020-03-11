import { createMuiTheme, Theme } from "@material-ui/core"

//colors
const background = "#f3f5f9"

//spacing
const spacing = 12

type TCustomRakebackTheme = {}

const getCustomRakebackTheme = (): TCustomRakebackTheme => {
  return {}
}

export type TTheme = Theme & { custom: TCustomRakebackTheme }

export const getMuiTheme = (): TTheme => {
  const custom = getCustomRakebackTheme()
  return {
    custom,
    ...getTheme(),
  }
}

export const getTheme = () => {
  return createMuiTheme({
    spacing,
    palette: {
      background: {
        default: background,
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
    props: {},
  })
}
