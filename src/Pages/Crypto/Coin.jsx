import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../Context/CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import './App.css'
import CoinInfo from './CoinInfo';
import { LinearProgress, Typography } from '@mui/material';

const Coin = () => {

  const {id} = useParams();
  const [crypto,setCrypto] = useState()
  const {currency,symbol} = CryptoState();

  const numberWithCommas = (number) =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    setCrypto(data);
  }

  useEffect(()=>{
    fetchCoin();
  },[currency])

  if(!crypto){
    return <LinearProgress style={{backgroundColor:'gold'}}/>
  }

  console.log(crypto)

  return (
    <div className='container'>
      <div className='sidebar'>
        <img
          src={crypto?.image?.large}
          alt={crypto?.name}
          height='200'
          style={{marginBottom:20}}
        />
        <Typography variant='h3' className='heading' >{crypto?.name}</Typography>
        <Typography variant='subtitle1' className='description'>{crypto?.description.en.split(". ")[0]}.</Typography>

        <div className='marketData'>
          <span style={{display:'flex'}}><Typography variant='h5' style={{fontFamily:'Poppins'}}>Rank : </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{fontFamily: "Poppins"}}>{numberWithCommas(crypto?.market_cap_rank)}</Typography>
          </span>
          <span style={{display:'flex'}}><Typography variant='h5' style={{fontFamily:'Poppins'}}>Current Price : </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{fontFamily: "Poppins"}}>{symbol}{numberWithCommas(crypto?.market_data?.current_price?.inr)}</Typography>
          </span>
          <span style={{display:'flex'}}><Typography variant='h5' style={{fontFamily:'Poppins'}}>Market Cap : </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" style={{fontFamily: "Poppins"}}>{symbol}{numberWithCommas(crypto?.market_data?.market_cap?.inr)}</Typography>
          </span>
        </div>
      </div>

      <CoinInfo crypto={crypto} /> {/* This is the CoinInfo component */}
    </div>
  )
}

export default Coin