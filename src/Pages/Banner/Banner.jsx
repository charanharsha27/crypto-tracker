import { Container, Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import Carousel from './Carousel'

const Banner = () => {
  const BannerDiv = styled('div')({
    backgroundImage : 'url(./banner2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  })

  const BannerContent = styled('Container')({
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around"
  })

  const InnerDiv = styled('div')({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  })

  const CustomTypography = styled('Typography')({
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "poppins",
  })

  const CustomTypography1 = styled('Typography')({
    color: "darkgrey",
    textTransform: "capitalize",
    fontFamily: "poppins",
  })

  return (
    <BannerDiv>
      <BannerContent>
        <InnerDiv>
          <CustomTypography>
            <h1>Crypto Eye</h1>
            <CustomTypography1>
              Get all the information about your favorite cryptocurrencies
            </CustomTypography1>
          </CustomTypography>
        </InnerDiv>
        <Carousel/> {/* Carousel component */}
      </BannerContent>
    </BannerDiv>
  )
}

export default Banner