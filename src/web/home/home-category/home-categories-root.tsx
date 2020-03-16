import { makeStyles, useTheme } from "@material-ui/core"
import React, { FC } from "react"
import { CREATED_ID } from "../../../util/common"
import { TTheme } from "../../theme"
import { useHomeContext } from "./../home-ctx"
import { WebHome_categories } from "./../types/WebHome"
import { HomeCategory } from "./home-category-item"

export const HomeCategories: FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const { categories_model } = useHomeContext()
  const newCategory: WebHome_categories = {
    __typename: "Category",
    id: CREATED_ID,
    name: "",
    color: theme.palette.primary.main,
  }
  return (
    <div className={classes.root}>
      <div className={classes.slider}>
        {categories_model.categories.map(category => (
          <HomeCategory key={category.id} category={category} />
        ))}
        <HomeCategory category={newCategory} />
      </div>
    </div>
  )
}
HomeCategories.displayName = "HomeCategories"

const useStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        //background: theme.palette.primary.main,
      },
      slider: {
        display: "flex",
        alignItems: "center",
        //background: theme.palette.primary.main,
        padding: `${theme.spacing(4)}px 0`,
        position: "relative",
        scrollSnapType: "x mandatory",
        overflowX: "auto",
        overflowY: "hidden",
        overflowScrolling: "touch",
        scrollbarColor: "transparent transparent", //for scrollbar hidden
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    }
  },
  { name: HomeCategories.displayName }
)
