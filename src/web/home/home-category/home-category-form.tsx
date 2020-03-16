import { Dialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core"
import { useObserver } from "mobx-react-lite"
import React, { FC } from "react"
import { Form } from "react-final-form"
import { useApollo, useUI } from "../../../di"
import { CREATED_ID } from "../../../util/common"
import { TTheme } from "../../theme"
import { useHomeContext } from "../home-ctx"
import { GqlHomeCategoryCreate, GqlHomeCategoryDelete, GqlHomeCategoryUpdate } from "../home-query"
import { WebCategoryCreate, WebCategoryCreateVariables } from "../types/WebCategoryCreate"
import { WebCategoryDelete, WebCategoryDeleteVariables } from "../types/WebCategoryDelete"
import { WebCategoryUpdate, WebCategoryUpdateVariables } from "../types/WebCategoryUpdate"
import { WebHome_categories } from "../types/WebHome"
import { HomeCategoryFields } from "./home-category-fields"

type THomeCategoryProps = {
  category: WebHome_categories
  isPopup: boolean
  setPopup: (b: boolean) => void
}

export const HomeCategoryForm: FC<THomeCategoryProps> = ({ category, isPopup, setPopup }) => {
  const classes = useHomeCategoryStyles()
  const apollo = useApollo()
  const ui = useUI()
  const { categories_model } = useHomeContext()
  console.log(isPopup, "isPopup")

  const updateCategory = async (values: WebHome_categories) => {
    ui.setLocker(true)
    try {
      const r = await apollo.mutate<WebCategoryUpdate, WebCategoryUpdateVariables>({
        mutation: GqlHomeCategoryUpdate,
        variables: {
          id: category.id,
          name: values.name,
          color: values.color,
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
          color: values.color,
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

  const deleteCategory = async () => {
    ui.setLocker(true)
    try {
      const r = await apollo.mutate<WebCategoryDelete, WebCategoryDeleteVariables>({
        mutation: GqlHomeCategoryDelete,
        variables: {
          id: category.id,
        },
      })
      if (r.data && r.data.deleteCategory) {
        const cat = r.data.deleteCategory.filter(item => item && item) as WebHome_categories[]
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
    <Dialog open={isPopup} onClose={() => setPopup(false)}>
      <DialogTitle className={classes.title}>
        {category.id === CREATED_ID ? "Create category" : "Update " + category.name}
      </DialogTitle>
      <DialogContent>
        <Form
          initialValues={category}
          onSubmit={category.id === CREATED_ID ? createCategory : (updateCategory as any)}
          subscription={{ submitting: true }}
          render={props => {
            return <HomeCategoryFields {...props} deleteCategory={deleteCategory} />
          }}
        />
      </DialogContent>
    </Dialog>
  ))
}
HomeCategoryForm.displayName = "HomeCategoryForm"

const useHomeCategoryStyles = makeStyles<TTheme>(
  _theme => {
    return {
      title: {
        textAlign: "center",
      },
    }
  },
  { name: HomeCategoryForm.displayName }
)
