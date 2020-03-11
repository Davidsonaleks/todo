import { makeStyles } from "@material-ui/core"
import React, { FC } from "react"
import { TTheme } from "../theme"
import { useHomeContext } from "./home-ctx"

export const HomeCategories: FC = () => {
  const classes = useStyles()
  const { categories_model } = useHomeContext()
  return (
    <div className={classes.root}>
      {categories_model.categories.map(category => (
        <div key={category.id} className={classes.category}>
          {category.name}
        </div>
      ))}
    </div>
  )
}
HomeCategories.displayName = "HomeCategories"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        display: "flex",
        alignItems: "center",
      },
      category: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#fff",
        color: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.spacing(2),
      },
    }
  },
  { name: HomeCategories.displayName }
)
