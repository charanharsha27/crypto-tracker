import React, { useEffect, useState } from 'react'
import { CryptoState } from '../Context/CryptoContext';
import axios from 'axios';
import { Button, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import { chartDays } from '../config/data';
Chart.register(CategoryScale);

const CoinInfo = ({crypto}) => {

  const [chartData,setChartData] = useState();
  const [days,setDays] = useState(1);

  const {currency,symbol} = CryptoState();

  const fetchChartData = async() => {
    const {data} = await axios.get(HistoricalChart(crypto?.id,days,currency));
    console.log(data.prices);
    setChartData(data.prices);
  }

  useEffect(() => {
    fetchChartData();
  },[currency])

  const darkTheme = createTheme({
    palette: {
      primary:{
        main:'#fff',
      },
      type: "dark"
    },
  });

  console.log(chartData);

  

  return (
    <ThemeProvider theme={darkTheme}>
      <div className='container1'>
        {
          !HistoricalChart ? (
           <CircularProgress style={{color:'gold'}} size={250} thickness={1} />
          ) :(
            <>
              <Line data={{labels:chartData?.map((data) => {
                let date = new Date(data[0]);
                let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM` : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString()
              }), datasets : [{
                data: chartData?.map((data) => data[1]),
                label: `Price (Past ${days} Days) in ${currency}`,
                borderColor: '#EEBC1D',
              }]
            }} options={{elements:{point:{radius:1}}}} />
            
            <div style={{display: "flex",marginTop: 20,justifyContent: "space-between"}}>
              {chartDays.map((day) => (
                <Button className='button-1'  key={day.value}
                onClick={() => {setDays(day.value);
                  // setflag(false);
                }} variant={day.value === days ? 'contained' : 'outlined'}>{day.label}</Button>
              ))}
            </div>  
            </>
          )
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo