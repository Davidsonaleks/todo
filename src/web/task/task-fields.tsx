import { Button, Grid, makeStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import SaveIcon from "@material-ui/icons/Save"
import React, { FC } from "react"
import { FormRenderProps, FormSpy } from "react-final-form"
import { FFC_CheckboxField, FFTextField } from "../el/final-form-miui"
import { TTheme } from "../theme"
import { WebTask } from "./types/WebTask"

type TTaskFields = FormRenderProps<any> & { data: WebTask }

export const TaskFields: FC<TTaskFields> = ({ handleSubmit, data }) => {
  const { categories } = data
  const classes = useStyles()
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <FFTextField name={"name"} required label={"Name"} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FFTextField
            name={"category.id"}
            label={"Category"}
            SelectProps={{
              native: true,
            }}
            select
          >
            <option value="" />
            {categories &&
              categories.map(category => (
                <option key={category!.id} value={category!.id}>
                  {category!.name}
                </option>
              ))}
          </FFTextField>
        </Grid>
        <Grid item>
          <FFC_CheckboxField name={"isDone"} label="Is Done" />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <FormSpy>
            {({ hasValidationErrors, submitting, pristine }) => (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={hasValidationErrors || submitting || pristine}
                size="large"
              >
                <SaveIcon />
              </Button>
            )}
          </FormSpy>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" size="large">
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
TaskFields.displayName = "TaskFields"

const useStyles = makeStyles<TTheme>(
  _theme => {
    return {
      root: {},
    }
  },
  { name: TaskFields.displayName }
)
