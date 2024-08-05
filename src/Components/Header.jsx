import { AppBar, Box, Button, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { CryptoState } from '../Pages/Context/CryptoContext';

const Header = () => {
  const CustomTypography = styled('Typography')({
    flex:1,
    color:'gold',
    fontFamily:'poppins',
    cursor:'pointer',
    fontWeight:'bold',
  });

  const darkTheme = createTheme({
    palette: {
      primary:{
        main:'#fff',
      },
      type: "dark"
    },
  });

  const {currency,setCurrency} = CryptoState();
  console.log(currency);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position="static">
        <Container>
            <Toolbar>
            <CustomTypography onClick={()=> navigate("/")}  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Crypto Eye
            </CustomTypography>
            {/* <Button color="inherit">Login</Button> */}
            <Select style={{
                width:100,
                height:40,
                backgroundColor:'white',
                marginLeft:5
            }}
            value={currency}
            onChange={(e)=>{
              setCurrency(e.target.value)
            }} labelId="demo-simple-select-label">
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
            </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
    </Box>
  )
}

export default Header