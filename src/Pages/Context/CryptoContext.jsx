import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

const CryptoContext = ({children}) => {

    const [currency,setCurrency] = useState("INR")
    const [symbol,setSymbol] = useState("₹")
    useEffect(()=>{
        if(currency==='INR'){
            setSymbol('₹');
            setCurrency('INR');
        }
        else{
            setSymbol('$');
            setCurrency("USD")
        }
    },[currency])

    return <Crypto.Provider value={{currency,symbol,setCurrency}}>{children}</Crypto.Provider>
}

export default CryptoContext;

export const CryptoState = () =>{
    return useContext(Crypto);
}