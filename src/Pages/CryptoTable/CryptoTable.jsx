import React, { useEffect, useState } from 'react';
import { CryptoState } from '../Context/CryptoContext';
import { CoinList } from '../config/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CryptoTable = () => {
  const { currency, symbol } = CryptoState();
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate  = useNavigate();

  const handleSearch = (value) =>{
    if(value){
      setSearch(value);
    }
    // else{
    //   setSearch("");
    // }
    // console.log(crypto);
    return crypto.filter((coin) => {
      return coin.name.toLowerCase().includes(search)  || coin.symbol.toLowerCase().includes(search);
    })
  }

  const numberWithCommas = (number) =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCoins = async () => {
    setLoading(true);  
    try {
      const { data } = await axios.get(CoinList(currency));
      setCrypto(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography style={{ margin: 18, fontFamily: 'Poppins' }} variant='h2'>
          Get Crypto Currency Prices of the Current Market
        </Typography>
        <TextField onChange={(e)=> handleSearch(e.target.value)} label='Search your Crypto coin here...'
          variant='outlined'
          style={{marginBottom:20, width: '100%'}}/>

        <TableContainer>
          {loading?(
            <LinearProgress style={{backgroundColor: 'gold'}}/>
          ) :(
              <Table>
                <TableHead style={{backgroundColor : '#EEBC1D'}}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((item) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "750",
                        fontFamily: "poppins",
                      }} key={item} align={item === "Coin" ? "" : "right"}>
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
                </TableHead>
                <TableBody>
                    {handleSearch().slice((page-1)*10, (page-1)*10 + 10).map((item) => {
                      let profit = item?.price_change_percentage_24h >= 0;
                        return (
                          <TableRow onClick={() => navigate(`/crypto/${item?.id}`)} key={item?.id}  style={{
                            backgroundColor: "#16171a",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "black",
                            },
                            fontFamily: "Poppins",}
                            }>
                              <TableCell
                                component="th"
                                scope="row"
                                style={{
                                  display: "flex",
                                  gap: 15,
                                }}>
                              <img
                            src={item?.image}
                            alt={item?.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {item?.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {item?.name}
                            </span>
                          </div>
                          </TableCell>
                          <TableCell align='right'>
                              {symbol}{" "}{numberWithCommas(item?.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {item?.price_change_percentage_24h.toFixed(2)} %
                        </TableCell>
                        <TableCell align='right'>
                          {symbol}{" "}{numberWithCommas(item?.market_cap.toString().slice(0,9))}
                        </TableCell>
                        </TableRow>
                        )
                    })} {/*display coins based on search */}
                </TableBody>
              </Table>
          )}
        </TableContainer>
          <Pagination count={(handleSearch()?.length / 10).toFixed(0)} style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }} onChange={(_, value) => {
            setPage(value);
            setCrypto(crypto);
            window.scroll(0, 450);
          }} />
      </Container>
    </ThemeProvider>
  );
}

export default CryptoTable;
