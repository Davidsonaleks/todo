import { Fab, makeStyles, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React, { FC, useEffect, useState } from "react"
import { CREATED_ID } from "../../../util/common"
import { TTheme } from "../../theme"
import { WebHome_categories } from "../types/WebHome"
import { HomeCategoryForm } from "./home-category-form"

type THomeCategoryProps = {
  category: WebHome_categories
}

export const HomeCategory: FC<THomeCategoryProps> = ({ category }) => {
  const classes = useHomeCategoryStyles()
  const [isPopup, setPopup] = useState<boolean>(false)
  useEffect(() => {
    return () => (() => setPopup(false))()
  }, [])

  return (
    <div className={classes.root}>
      <Fab
        className={classes.category}
        style={category.color ? { background: category.color } : undefined}
        onClick={() => setPopup(true)}
      >
        <Typography variant="body2" className={classes.name}>
          {category.id === CREATED_ID ? <AddIcon className={classes.plusIcon} /> : category.name}
        </Typography>
      </Fab>
      <HomeCategoryForm isPopup={isPopup} setPopup={setPopup} category={category} />
    </div>
  )
}
HomeCategory.displayName = "HomeCategory"

const useHomeCategoryStyles = makeStyles<TTheme>(
  theme => {
    return {
      root: {
        paddingLeft: theme.custom.gap.innerPadding,
        scrollSnapAlign: "start",
      },
      category: {
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        transition: ".3s",
        "&:hover": {
          "&:not($name)": {
            filter: "brightness(0.7)",
          },
        },
        "&:last-child": {
          position: "relative",
          "&:after": {
            position: "absolute",
            content: '""',
            left: "100%",
            top: 0,
            width: theme.custom.gap.innerPadding,
            height: "1px",
          },
        },
      },
      name: {
        color: "#fff",
        fontWeight: "bold",
      },
      plusIcon: {
        width: "30px",
        height: "30px",
      },
    }
  },
  { name: HomeCategory.displayName }
)
