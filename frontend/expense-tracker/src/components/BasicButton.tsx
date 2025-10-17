
import Button from '@mui/material/Button';

interface BasicButtonProps{
  text : string
}

export default function BasicButton({
  text
}:BasicButtonProps) {
  return (
    
      <Button variant="contained" 
    
      sx={{
        py: 1.5,            
        fontSize: "1rem",   
        width:"30rem"
      }}
     >{text}</Button>

    
  );
}