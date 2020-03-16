import { makeStyles, Typography } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import React, { FC, useState } from "react"
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

  return (
    <div
      className={classes.category}
      style={category.color ? { background: category.color } : undefined}
      onClick={() => setPopup(true)}
    >
      <Typography variant="body2" className={classes.name}>
        {category.id === CREATED_ID ? <AddIcon /> : category.name}
      </Typography>
      <HomeCategoryForm isPopup={isPopup} setPopup={setPopup} category={category} />
    </div>
  )
}
HomeCategory.displayName = "HomeCategory"

const size = 70
const useHomeCategoryStyles = makeStyles<TTheme>(
  theme => {
    return {
      category: {
        minWidth: size,
        minHeight: size,
        borderRadius: "50%",
        background: "#fff",
        color: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: theme.custom.gap.innerPadding,
        scrollSnapAlign: "start",
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
    }
  },
  { name: HomeCategory.displayName }
)
