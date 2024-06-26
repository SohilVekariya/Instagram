import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';


type CustomInputProps = {
    label?: string
    placeholder: string
    name: string
    type: string
    disabled?: boolean
    className: string
    control?: any
    onKeyUp?:any
    onInputBlur?:any
    value?:any
}


const CustomInput =forwardRef(({
    label,
    placeholder,
    name,
    type = "text",
    disabled = false,
    className = '',
    onKeyUp,
    value,
    onInputBlur,
    control
} : CustomInputProps,ref) => {
  const{
    field: {onChange},
    fieldState : {error}
  } = useController({
    name,
    control,
    defaultValue:''
  })
  return (
      <TextField type={type}
        label={label}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`${className}`}
        onChange={onChange}
        disabled={disabled} 
        variant="outlined"
        style={{width:300}}
        error={!!error} 
        helperText={error?.message}
        inputRef={ref}
        onKeyUp={onKeyUp}
        onBlur={onInputBlur}
        defaultValue={value}
        />
  )
})

export default CustomInput