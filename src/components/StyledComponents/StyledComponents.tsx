import { TextField, styled } from "@mui/material";



export const StyledInput = styled(TextField)(() => ({
  width: '100%',
  borderRadius: '10px',
  "& fieldset": { 
      borderRadius: '10px',
      // opacity: 0
   },

}))