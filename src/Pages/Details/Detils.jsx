import React from 'react'
import './style.scss';
import {useFetch} from "../../hooks/useFetch"
import { useParams } from 'react-router-dom';
import DetailsBanner from './DetailsBanner/DetailsBanner';
import Cast from './Cast/Cast';
import VideosSection from './videoSection/VideosSection';
import Similar from "../Details/Carousels/Similar"
import Recommendations from "../Details/Carousels/Recommendation"
const Detils = () => {
  const {mediaType, id} = useParams(); // use this hook for destructuring the url data
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  console.log(data);
  // Some new Syntex
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);
  
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendations mediaType={mediaType} id={id}/>
    </div>
  )
}
export default Detils;