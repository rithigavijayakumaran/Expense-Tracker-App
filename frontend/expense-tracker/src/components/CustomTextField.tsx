
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface CustomTextFieldProps{
    label : String,
    type?: string,
    value : string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomTextField({
    label,
    type="text",
    value,
    onChange,
}: CustomTextFieldProps) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { my:2, width: '30rem' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id={label.toLowerCase()} label={label} variant="outlined" value={value} type={type} required onChange={onChange}/>
    </Box>
  );
}
