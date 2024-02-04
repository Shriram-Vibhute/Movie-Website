import React from "react";

import Carousel from "../../../Components/Carousel/Carousel"
import {useFetch} from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
    console.log("media : " + mediaType)
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );
    console.log(mediaType) // undefined
    return (
        data && (<Carousel
            title="Recommendations"
            data={data}
            loading={loading}
            endpoint={mediaType}
        />)
    )
};

export default Recommendation;