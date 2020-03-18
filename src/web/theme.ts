import { createMuiTheme, Theme } from "@material-ui/core"
import { TypographyStyleOptions } from "@material-ui/core/styles/createTypography"

type TColors = {
  [key: string]: {
    light: string
    dark: string
  }
}

const colors: TColors = {
  blue: {
    light: "#3366ff",
    dark: "#333",
  },
  background: {
    light: "#f1f1f1",
    dark: "#212121",
  },
  whiteBlack: {
    light: "#000",
    dark: "#fff",
  },
  cardBackground: {
    light: "#fff",
    dark: "#333",
  },
}

//colors
//const background = "#f3f5f9"
const white = "#fff"

//gap
const spacing = 12
const innerPadding = 18

//breakpoints
const breakpoints = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 }
const smUp = `@media (min-width: ${breakpoints.sm}px)`

//fonts
const h1: TypographyStyleOptions = {
  fontWeight: "bold",
  fontSize: "36px",
  lineHeight: "42px",
  [smUp]: {
    fontSize: "48px",
    lineHeight: "65px",
  },
}
const h2: TypographyStyleOptions = {
  fontWeight: 600,
  fontSize: "24px",
  lineHeight: "33px",
}
const h3: TypographyStyleOptions = {
  fontWeight: "bold",
  fontSize: "18px",
  lineHeight: "25px",
}
const h4: TypographyStyleOptions = {
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "25px",
}
const h5: TypographyStyleOptions = {
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "22px",
}
const h6: TypographyStyleOptions = {
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
}
const body1: TypographyStyleOptions = {
  fontSize: "16px",
  lineHeight: "24px",
}
const body2: TypographyStyleOptions = {
  fontSize: "12px",
  lineHeight: "16px",
}
const button: TypographyStyleOptions = {
  fontWeight: "bold",
  fontSize: "16px",
  lineHeight: "22px",
}
const subtitle2: TypographyStyleOptions = {
  fontWeight: "bold",
  fontSize: "12px",
  lineHeight: "16px",
}
const subtitle1: TypographyStyleOptions = {
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "19px",
}
const overline: TypographyStyleOptions = {
  fontStyle: "italic",
  fontSize: "12px",
  lineHeight: "16px",
}

type TCustomRakebackTheme = {
  gap: {
    innerPadding: number
  }
  colors: {
    white: string
    whiteBlack: string
  }
}

export type TTheme = Theme & { custom: TCustomRakebackTheme }

const getCustomRakebackTheme = (mode: TMode): TCustomRakebackTheme => {
  return {
    gap: {
      innerPadding,
    },
    colors: {
      white,
      whiteBlack: colors.whiteBlack[mode],
    },
  }
}

type TMode = "dark" | "light"

export const getMuiTheme = (mode: TMode): TTheme => {
  const custom = getCustomRakebackTheme(mode)
  return {
    custom,
    ...getTheme(mode),
  }
}

export const getTheme = (mode: TMode) => {
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
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      body1,
      body2,
      subtitle1,
      subtitle2,
      button,
      overline,
    },
    overrides: {
      MuiTypography: {
        colorPrimary: {
          color: colors.whiteBlack[mode],
        },
      },
      MuiCard: {
        root: {
          backgroundColor: colors.cardBackground[mode],
        },
      },
      MuiCardContent: {
        root: {
          padding: `${spacing * 2}px ${innerPadding}px`,
        },
      },
    },
    props: {
      MuiTextField: {
        variant: "outlined",
        fullWidth: true,
        margin: "dense",
      },
      MuiButton: {
        variant: "contained",
        color: "primary",
      },
      MuiGrid: {
        spacing: 2,
      },
      MuiTypography: {
        color: "primary",
      },
    },
  })
}
