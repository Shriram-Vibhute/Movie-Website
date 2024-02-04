import React, { useRef } from "react";
import './style.scss';
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; // Conversion of date format

import ContentWrapper from "../contentWrapper/ContentWrapper"
import Img from "../lazyLoadingComponents/LazyLoadImg"
import PosterFallback from "../../Images/no-results.png";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../Genres/Genres";

const Carousel = ({ data, loading, endPoint, title }) => {

    const carouselContainer = useRef();  // By using this hook we can actually take referance of any node
    // console.log(carouselContainer.current);

    const { url } = useSelector((state) => state.home); // Fron Redux Store for the formation of API

    const navigation = (dir) => {
        const container = carouselContainer.current; // current referance div/container
        const scrollAmount = (dir === "left") ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
        // offsetWidth -> current container width
        // scrollLeft -> current scroll behavior - dont know

        console.log(container.scrollLeft);
        console.log("offset " + container.offsetWidth);

        container.scrollTo({
            left : scrollAmount,
            behavior : "smooth"
        })
    }
    // console.log(data.results);

    const navigate = useNavigate();

    const skely = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <span className="title skeleton"></span>
                    <span className="date skeleton"></span>
                    {/* sceleton class is defined in style of index.jsx */}
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.results?.map((items) => {
                            const posterUrl = items.poster_path ? url.poster + items.poster_path : PosterFallback;
                            return (
                                // Either we can make poster Item seperate component or write the body of the component here
                                <div className="carouselItem" key={items.id}
                                    onClick={()=> {
                                        navigate(`/${items.media_type || endPoint}/${items.id}`)
                                    }}
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating = {items.vote_average.toFixed(1)}/>
                                        <Genres data={items.genre_ids.slice(0, 2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{items.title || items.name}</span>
                                        <span className="date">
                                            {dayjs(items.first_air_date || items.release_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skely()}
                        {skely()}
                        {skely()}
                        {skely()}
                        {skely()}
                    </div>

                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel
