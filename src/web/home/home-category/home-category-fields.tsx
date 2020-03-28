import { Button, makeStyles } from "@material-ui/core"
import ColorizeIcon from "@material-ui/icons/Colorize"
import DeleteIcon from "@material-ui/icons/Delete"
import SaveIcon from "@material-ui/icons/Save"
import React, { FC, useState } from "react"
import { ChromePicker, ColorResult } from "react-color"
import { FormRenderProps, FormSpy, useField } from "react-final-form"
import { FFTextField } from "../../el/final-form-miui"
import { TTheme } from "../../theme"
import { WebHome_categories } from "./../types/WebHome"

type THomeCategoryFieldsProps = {
  deleteCategory?: () => Promise<void>
}

type THomeCategoryFields = FormRenderProps<WebHome_categories> & THomeCategoryFieldsProps

export const HomeCategoryFields: FC<THomeCategoryFields> = props => {
  const { handleSubmit, deleteCategory } = props
  const classes = useHomeCategoryFieldsStyles()
  const [isPopup, setPopup] = useState<boolean>(false)
  const colorInput = useField("color").input
  const colorValue = useField("color").input.value

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FFTextField name="name" label="name" required />

      <FFTextField name="color" label="color" />

      {isPopup && (
        <ChromePicker
          color={colorValue}
          onChangeComplete={(color: ColorResult) => {
            colorInput.onChange({ target: { value: color.hex } })
          }}
        />
      )}

      <FormSpy>
        {({ hasValidationErrors, submitting, pristine }) => (
          <div className={classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              disabled={hasValidationErrors || submitting || pristine}
              color="primary"
              className={classes.button}
            >
              <SaveIcon />
            </Button>
            <Button
              onClick={() => setPopup(!isPopup)}
              color={"primary"}
              variant="contained"
              className={classes.button}
            >
              <ColorizeIcon />
            </Button>
            {deleteCategory && (
              <Button
                variant="contained"
                onClick={deleteCategory}
                color="secondary"
                className={classes.button}
              >
                <DeleteIcon />
              </Button>
            )}
          </div>
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
      buttons: {
        display: "flex",
        justifyContent: "space-between",
      },
    }
  },
  { name: HomeCategoryFields.displayName }
)
