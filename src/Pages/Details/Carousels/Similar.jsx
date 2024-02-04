import React from "react";

import Carousel from "../../../Components/Carousel/Carousel"
import {useFetch} from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
    // Working on it -> mediaType will passaing as undefined 

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = (mediaType === "tv")? "Similar TV Shows" : "Similar Movies";
    console.log(mediaType)
    return (
        <Carousel
            title={title}
            data={data}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default Similar;