import { makeStyles, Typography, useTheme } from "@material-ui/core"
import React, { FC } from "react"
import { CREATED_ID } from "../../../util/common"
import { PageInner } from "../../el/page-inner"
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
      <PageInner>
        <Typography variant="h2">Категории</Typography>
      </PageInner>

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
        paddingTop: theme.spacing(2),
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
        [theme.breakpoints.up("sm")]: {
          maxWidth: "1280px",
          margin: "0 auto",
        },
      },
    }
  },
  { name: HomeCategories.displayName }
)
