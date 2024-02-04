import React from 'react'
import "./style.scss"
import HearBanner from '../../Components/Header/heroBanner/HeroBanner'
import Trending from './Trending.jsx/Trending'
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'

const Home = () => {
  return (
    <div>
      <HearBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  )
}

export default Home
