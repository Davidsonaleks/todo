import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import { useObserver } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Form, FormRenderProps, FormSpy } from "react-final-form"
import { useApollo, useUI } from "../../di"
import { CREATED_ID } from "../../util/common"
import { FFTextField } from "../el/final-form-miui"
import { TTheme } from "../theme"
import { useHomeContext } from "./home-ctx"
import { GqlHomeCategoryCreate, GqlHomeCategoryUpdate } from "./home-query"
import { WebCategoryCreate, WebCategoryCreateVariables } from "./types/WebCategoryCreate"
import { WebCategoryUpdate, WebCategoryUpdateVariables } from "./types/WebCategoryUpdate"
import { WebHome_categories } from "./types/WebHome"

export const HomeCategories: FC = () => {
  const classes = useStyles()
  const { categories_model } = useHomeContext()
  const newCategory: WebHome_categories = {
    __typename: "Category",
    id: CREATED_ID,
    name: "",
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
        background: theme.palette.primary.main,
      },
      slider: {
        display: "flex",
        alignItems: "center",
        background: theme.palette.primary.main,
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

type THomeCategoryProps = {
  category: WebHome_categories
}

export const HomeCategory: FC<THomeCategoryProps> = ({ category }) => {
  const classes = useHomeCategoryStyles()
  const apollo = useApollo()
  const ui = useUI()
  const [isPopup, setPopup] = useState<boolean>(false)
  const { categories_model } = useHomeContext()

  const updateCategory = async (values: WebHome_categories) => {
    ui.setLocker(true)
    try {
      const r = await apollo.mutate<WebCategoryUpdate, WebCategoryUpdateVariables>({
        mutation: GqlHomeCategoryUpdate,
        variables: {
          id: category.id,
          name: values.name,
        },
      })
      if (r.data && r.data.updateCategory) {
        const cat = r.data.updateCategory.filter(item => item && item) as WebHome_categories[]
        categories_model.setCategories(cat)
      }
      ui.setLocker(false)
      setPopup(false)
    } catch (e) {
      ui.setLocker(false)
      console.error(e)
    }
  }

  const createCategory = async (values: WebHome_categories) => {
    ui.setLocker(true)
    try {
      const r = await apollo.mutate<WebCategoryCreate, WebCategoryCreateVariables>({
        mutation: GqlHomeCategoryCreate,
        variables: {
          name: values.name,
        },
      })
      if (r.data && r.data.addCategory) {
        const cat = r.data.addCategory.filter(item => item && item) as WebHome_categories[]
        categories_model.setCategories(cat)
      }
      ui.setLocker(false)
      setPopup(false)
    } catch (e) {
      ui.setLocker(false)
      console.error(e)
    }
  }
  return useObserver(() => (
    <>
      <div className={classes.category} onClick={() => setPopup(true)}>
        <Typography variant="body2">{category.name}</Typography>
      </div>
      <Dialog open={isPopup} onClose={() => setPopup(false)}>
        <DialogTitle className={classes.title}>
          {category.id === CREATED_ID ? "Create" : "Update"}Category
        </DialogTitle>
        <DialogContent>
          <Form
            initialValues={category}
            onSubmit={category.id === CREATED_ID ? createCategory : (updateCategory as any)}
            // validate={validate as any}
            subscription={{ submitting: true }}
            component={HomeCategoryFields}
          />
        </DialogContent>
      </Dialog>
    </>
  ))
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
      title: {
        textAlign: "center",
      },
    }
  },
  { name: HomeCategory.displayName }
)

export const HomeCategoryFields: FC<FormRenderProps> = ({ handleSubmit }) => {
  const classes = useHomeCategoryFieldsStyles()
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FFTextField name="name" label="name" />
      <FormSpy>
        {({ hasValidationErrors, submitting, pristine }) => (
          <Button
            type="submit"
            variant="contained"
            disabled={hasValidationErrors || submitting || pristine}
            color="primary"
            className={classes.button}
          >
            <SaveIcon />
          </Button>
        )}
      </FormSpy>
    </form>
  )
}
HomeCategoryFields.displayName = "HomeCategoryFields"

const useHomeCategoryFieldsStyles = makeStyles<TTheme>(
  theme => {
    return {
      button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
      },
    }
  },
  { name: HomeCategoryFields.displayName }
)
