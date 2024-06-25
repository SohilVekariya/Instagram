import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';


type CustomInputProps = {
    label: string
    placeholder: string
    name: string
    type: string
    value: string | any
    onChange: any
    disabled: boolean
    className: string
}


const CustomInput =forwardRef(({
    label,
    placeholder,
    name,
    type = "text",
    value,
    onChange,
    disabled = false,
    className = ''
} : CustomInputProps) => {
  return (
      <TextField type={type}
        label={label}
        name={name}
        id={name}
        required
        placeholder={placeholder}
        className={`${className}`}
        onChange={onChange}
        value={value}
        disabled={disabled} 
        variant="outlined"
        style={{width:300}}
        />
  )
})

export default CustomInput