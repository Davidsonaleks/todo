import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Switch,
  SwitchProps,
  TextField,
} from "@material-ui/core"
import { CheckboxProps } from "@material-ui/core/Checkbox"
import { FormControlLabelProps } from "@material-ui/core/FormControlLabel"
import { TextFieldProps } from "@material-ui/core/TextField"
import React, { TextareaHTMLAttributes } from "react"
import { FieldMetaState, FieldRenderProps, useField, UseFieldConfig } from "react-final-form"

type TFieldMetaState = FieldMetaState<any>
export type TErrorObject<T> = Partial<Record<keyof T, string | string[]>>

const show_error = (meta: TFieldMetaState) =>
  meta.touched &&
  (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) &&
  !meta.submitting

export const get_errors = (meta: TFieldMetaState): null | string[] => {
  const showError = show_error(meta)
  if (!showError) {
    return null
  }
  const error = showError ? meta.error || meta.submitError : null
  const errors = Array.isArray(error) ? error : [error]
  return errors
}

export const Errors: React.FC<{ errors: string[] }> = ({ errors }) => {
  const classes = useStyles()
  return (
    <>
      {errors.map(err => (
        <span key={err} className={classes.root}>
          {err}
        </span>
      ))}
    </>
  )
}

const useStyles = makeStyles(
  {
    root: {
      margin: "30px 0px",
    },
  },
  { name: "Errors" }
)

type TFFTextFieldProps = {
  name: string
  config?: UseFieldConfig<any>
  textarea?: boolean
} & TextFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>

export const FFTextField: React.FC<TFFTextFieldProps> = ({ config, textarea, ...rest }) => {
  const field = useField(rest.name, { parse: value => value, ...config })
  const {
    input: { name, onChange, value, type, ...restInput },
    meta,
  } = field
  const errors = get_errors(meta)
  return (
    <TextField
      multiline={textarea}
      name={name}
      helperText={errors !== null && <Errors errors={errors} />}
      error={errors !== null}
      inputProps={restInput}
      onChange={onChange}
      value={value === null ? "" : value}
      {...rest}
    />
  )
}

type TFFColorPickerProps = {
  name: string
  config?: UseFieldConfig<any>
  textarea?: boolean
} & TextFieldProps &
  TextareaHTMLAttributes<HTMLTextAreaElement>

export const FFColorPicker: React.FC<TFFColorPickerProps> = ({ config, textarea, ...rest }) => {
  const field = useField(rest.name, { parse: value => value, ...config })
  const {
    input: { name, onChange, value, type, ...restInput },
    meta,
  } = field
  const errors = get_errors(meta)
  return (
    <TextField
      multiline={textarea}
      name={name}
      helperText={errors !== null && <Errors errors={errors} />}
      error={errors !== null}
      inputProps={restInput}
      onChange={onChange}
      value={value === null ? "" : value}
      {...rest}
    />
  )
}

type T_FF_CheckboxProps = {
  field: FieldRenderProps<string, HTMLInputElement | HTMLTextAreaElement>
} & CheckboxProps

export const FF_Checkbox: React.SFC<T_FF_CheckboxProps> = ({
  field: {
    input: { name, onChange, checked, ...restInput },
  },
  ...rest
}) => {
  return (
    <Checkbox name={name} inputProps={restInput} onChange={onChange} checked={checked} {...rest} />
  )
}

type T_FFC_CheckboxFieldProps = { name: string; config?: UseFieldConfig<any> } & {
  CheckboxProps?: CheckboxProps
} & Omit<FormControlLabelProps, "control">
export const FFC_CheckboxField: React.FC<T_FFC_CheckboxFieldProps> = ({
  CheckboxProps,
  config,
  ...rest
}) => {
  const field = useField(rest.name, { ...config, type: "checkbox" })
  const errors = get_errors(field.meta)
  return (
    <div>
      <FormControlLabel control={<FF_Checkbox field={field} {...CheckboxProps} />} {...rest} />
      {errors !== null && (
        <FormHelperText error margin="dense">
          <Errors errors={errors} />
        </FormHelperText>
      )}
    </div>
  )
}

type T_FF_SwitchProps = {
  field: FieldRenderProps<string, HTMLInputElement | HTMLTextAreaElement>
} & SwitchProps

export const FF_Switch: React.SFC<T_FF_SwitchProps> = ({
  field: {
    input: { name, onChange, checked, ...restInput },
  },
  ...rest
}) => {
  return (
    <Switch name={name} inputProps={restInput} onChange={onChange} checked={checked} {...rest} />
  )
}

type T_FFC_SwitchFieldProps = { name: string; config?: UseFieldConfig<any> } & {
  SwitchProps?: SwitchProps
} & Omit<FormControlLabelProps, "control">
export const FFC_SwitchField: React.FC<T_FFC_SwitchFieldProps> = ({
  SwitchProps,
  config,
  ...rest
}) => {
  const field = useField(rest.name, { ...config, type: "checkbox" })
  const errors = get_errors(field.meta)
  return (
    <div>
      <FormControlLabel control={<FF_Switch field={field} {...SwitchProps} />} {...rest} />
      {errors !== null && (
        <FormHelperText error margin="dense">
          <Errors errors={errors} />
        </FormHelperText>
      )}
    </div>
  )
}
