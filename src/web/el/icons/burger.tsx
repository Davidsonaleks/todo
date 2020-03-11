import { IconProps, SvgIconProps } from "@material-ui/core"
import React, { FC } from "react"

type TIconProps = SvgIconProps & IconProps

export const BurgerIcon: FC<TIconProps> = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M492 236H20a20 20 0 100 40h472a20 20 0 100-40zM492 76H20a20 20 0 100 40h472a20 20 0 100-40zM492 396H20a20 20 0 100 40h472a20 20 0 100-40z" />
    </svg>
  )
}
