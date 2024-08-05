import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home/Home';
import Coin from './Pages/Crypto/Coin';
import { styled } from '@mui/system';
import CryptoContext from './Pages/Context/CryptoContext';

const CustomDiv = styled('div')({
  backgroundColor: 'black',
  color: 'white',
  minHeight: '100vh',
});

function App() {
  return (
    <CryptoContext>
    <BrowserRouter>
      <CustomDiv>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='crypto/:id' element={<Coin/>} />
        </Routes>
      </CustomDiv>
    </BrowserRouter>
    </CryptoContext>
  );
}

export default App;
