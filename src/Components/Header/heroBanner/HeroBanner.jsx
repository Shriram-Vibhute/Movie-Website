import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'; // Keys like if you press ENter then it will compute the result
import { useFetch } from '../../../hooks/useFetch';
import { UseSelector, useSelector } from 'react-redux/';
import Img from '../../lazyLoadingComponents/LazyLoadImg';
import './style.scss'
import dragon from '../../../Images/Dragon.jpg'

const HearBanner = () => {

    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");

    const navigate = useNavigate(); // Keys like Enter

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }
    const onChangeHandler = (event) => {
        setQuery(event.target.value);
    }
    const handleOnClick = (e) => {
        e.preventDefault();
        navigate(`/search/${query}`);
    }

    const { data, loading } = useFetch("/movie/upcoming");
    const { url } = useSelector((state) => state.home);
    useEffect(() => {
        // Here we formed the complete url which require to fetch the image data
        // const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        // setBackground(bg);
    }, [data])


    return (
        <div className="heroBanner">
            <div className="backdrop-img">
                <Img src={dragon} />
            </div>
            <div className="wrapper">
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover.
                        Explore now.</span>
                    <div className="search">
                        <input type="text"
                            placeholder='Search for a movie or TV Show'
                            onKeyUp={searchQueryHandler}
                            value={query}
                            onChange={onChangeHandler}
                        />
                        <button onClick={handleOnClick}>Search</button>
                    </div>
                </div>
            </div>
            <div className="opacity-layer"></div>
        </div>
    )
}

export default HearBanner
