import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../Context/CryptoContext';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const Carousel = () => {
    
    const {currency,symbol} = CryptoState();
    const [trending,setTrending] = useState([]);

    const Div = styled('div')({
        height: "50%",
        display: "flex",
        alignItems: "center",
    })

    const CarouselItem = styled('Link')({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    })

    const fetchTrendingCoins = async() => {
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }
    
    console.log(trending);
    useEffect(() => {
        fetchTrendingCoins();
    },[currency])
    
    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
    };

    const numberWithCommas = (number) =>{
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;
        return(
            <Link to={`/crypto/${coin?.id}`} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",}}>
                <img src={coin?.image} style={{height: 50, width: 50}} alt={coin?.name}/>
                <h1>{coin?.name} </h1> 
                <p>{coin?.symbol} <span style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red",fontWeight: 500,}}>{profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%</span> </p>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </Link>
        )
    })
    
    return (
    <Div>
        <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive} //how many items on screen at a time
            items={items}
            autoPlay/>
    </Div>
    )
}

export default Carousel