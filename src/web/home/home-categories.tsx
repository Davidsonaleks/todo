import { Button, Dialog, makeStyles, Typography } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Field, Form, FormRenderProps, FormSpy } from "react-final-form"
import { useApollo, useUI } from "../../di"
import { TTheme } from "../theme"
import { useHomeContext } from "./home-ctx"
import { GqlHomeCategoryUpdate } from "./home-query"
import { WebCategoryUpdate, WebCategoryUpdateVariables } from "./types/WebCategoryUpdate"
import { WebHome_categories } from "./types/WebHome"

export const HomeCategories: FC = () => {
  const classes = useStyles()
  const { categories_model } = useHomeContext()
  return (
    <div className={classes.root}>
      {categories_model.categories.map(category => (
        <HomeCategory key={category.id} category={category} />
      ))}
    </div>
  )
}
HomeCategories.displayName = "HomeCategories"

const useStyles = makeStyles<TTheme>(
  _theme => {
    return {
      root: {
        display: "flex",
        alignItems: "center",
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
  }
  return useObserver(() => (
    <>
      <div className={classes.category} onClick={() => setPopup(true)}>
        {category.name}
      </div>
      <Dialog open={isPopup} onClose={() => setPopup(false)}>
        <div className={classes.dialog}>
          <Typography variant="h2" align="center" className={classes.title}>
            Добавить платежную систему
          </Typography>
          <Form
            initialValues={category}
            onSubmit={updateCategory as any}
            // validate={validate as any}
            subscription={{ submitting: true }}
            component={HomeCategoryFields}
          />
        </div>
      </Dialog>
    </>
  ))
}
HomeCategory.displayName = "HomeCategory"
const useHomeCategoryStyles = makeStyles<TTheme>(
  theme => {
    return {
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
  { name: HomeCategory.displayName }
)

export const HomeCategoryFields: FC<FormRenderProps> = ({ handleSubmit }) => {
  const classes = useHomeCategoryFieldsStyles()
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Field name="name" component="input" />
      <FormSpy>
        {({ hasValidationErrors, submitting, pristine }) => (
          <>
            <Button
              type="submit"
              variant="contained"
              disabled={hasValidationErrors || submitting || pristine}
              color="primary"
            >
              Сохранить
            </Button>
          </>
        )}
      </FormSpy>
    </form>
  )
}
HomeCategoryFields.displayName = "HomeCategoryFields"
const useHomeCategoryFieldsStyles = makeStyles<TTheme>(
  _theme => {
    return {
      root: {},
    }
  },
  { name: HomeCategoryFields.displayName }
)
