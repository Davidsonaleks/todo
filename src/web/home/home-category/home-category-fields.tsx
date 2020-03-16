import { Button, Grid, makeStyles } from "@material-ui/core"
import ColorizeIcon from "@material-ui/icons/Colorize"
import DeleteIcon from "@material-ui/icons/Delete"
import SaveIcon from "@material-ui/icons/Save"
import React, { FC, useState } from "react"
import { ChromePicker, ColorResult } from "react-color"
import { FormRenderProps, FormSpy, useField } from "react-final-form"
import { FFTextField } from "../../el/final-form-miui"
import { TTheme } from "../../theme"
import { WebHome_categories } from "./../types/WebHome"

type TButtonDelete = {
  deleteCategory?: () => Promise<void>
}

export const HomeCategoryFields: FC<FormRenderProps<WebHome_categories> & TButtonDelete> = ({
  handleSubmit,
  deleteCategory,
}) => {
  const classes = useHomeCategoryFieldsStyles()
  const [isPopup, setPopup] = useState<boolean>(false)
  const colorField = useField("color").input
  const colortest = useField("color")
  const [color, setColor] = useState<string>(colorField.value)
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FFTextField name="name" label="name" required />
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <FFTextField name="color" label="color" value={color} />
        </Grid>
        <Grid item>
          <Button onClick={() => setPopup(!isPopup)} color="default">
            <ColorizeIcon />
          </Button>
        </Grid>
        {isPopup && (
          <ChromePicker
            color={color}
            onChangeComplete={(color: ColorResult) => {
              setColor(color.hex)
              colortest.onChange(color.hex)
            }}
          />
        )}
      </Grid>
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
              variant="contained"
              onClick={deleteCategory}
              color="secondary"
              className={classes.button}
            >
              <DeleteIcon />
            </Button>
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
