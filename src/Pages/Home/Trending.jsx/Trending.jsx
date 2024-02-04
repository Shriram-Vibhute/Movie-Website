import React, { useState } from 'react'
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper"
import SwitchTabs from '../../../Components/SwitchTabs/SwitchTabs'
import Carousel from '../../../Components/Carousel/Carousel';

import { useFetch } from '../../../hooks/useFetch';
const Trending = () => {
    const [endPoint, setEndPoint] = useState('day'); // day is endpoint in url

    const { data, loading } = useFetch(`/trending/all/${endPoint}`);

    const onTabChange = (tab, index) => {
        setEndPoint(tab === "Day" ? "day" : "week");
    }
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} endPoint={endPoint}/>
            {/* Here we are sending the loading state because of based of the value of loading we can apply lazy loading */}
        </div>
    )
}

export default Trending;