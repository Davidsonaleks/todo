import { Container, ContainerProps, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import React, { FC } from "react"
import { TTheme } from "../theme"

type TPageInnerProps = ContainerProps
export const PageInner: FC<TPageInnerProps> = ({ children, className, ...rest }) => {
  const classes = useStyles()
  return (
    <Container className={clsx(classes.container, className)} {...rest}>
      {children}
    </Container>
  )
}
PageInner.displayName = "PageInner"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      container: {
        paddingLeft: theme.custom.gap.innerPadding,
        paddingRight: theme.custom.gap.innerPadding,
      },
    }
  },
  { name: PageInner.displayName }
)
