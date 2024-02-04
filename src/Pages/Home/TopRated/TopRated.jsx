import React, { useState } from 'react'
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper"
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import Carousel from '../../../Components/Carousel/Carousel';

import { useFetch } from '../../../hooks/useFetch';
const TopRated = () => {
    const [endPoint, setEndPoint] = useState('movie'); // day is endpoint in url

    const { data, loading } = useFetch(`/${endPoint}/top_rated`);

    const onTabChange = (tab, index) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv");
    }
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className='carouselTitle'>Top Rated</span>
                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} endPoint={endPoint}/>
            {/* Here we are sending the loading state because of based of the value of loading we can apply lazy loading */}
        </div>
    )
}

export default TopRated;