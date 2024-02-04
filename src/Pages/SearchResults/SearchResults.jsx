import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchDataFromUrl } from "../../Utils/Api"
import noResults from "../../Images/no-results.png"

import "./style.scss"

import Spinner from "../../Components/Spinner/Spinner"
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper'
import MovieCard from '../../Components/MovieCard/MovieCard'


const SearchResults = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { querry } = useParams();
  console.log(querry)

  // Infinite Scrolling Algorithm
  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromUrl(`/search/multi?query=${querry}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1) // useState can give previous state access for future modifications
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      return error;
    });
  }

  const fetchNextPageData = () => {
    // This method will frequently used to fetch next data and update the previous data with prev data plus current Data (using spread operator)

    fetchDataFromUrl(`/search/multi?query=${querry}&page=${pageNum}`).then((res) => {
      console.log(res);
      if (data?.results) {
        setData({ ...data, results: [...data.results, ...res.results] })
        // We are overriding the complete results section in object
      }
      else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  }

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [querry])

  console.log(querry);
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {(data?.results.length > 0) ?
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "results" : "result"} of ${querry}`}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner/>}
              >
                {data?.results.map((item, index) => {
                  if (item.mediaType === 'person') return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
            :
            <span className="resultNotFound">
              Sorry, Results Not Found
            </span>}
        </ContentWrapper>
      )
      }
    </div >
  )
}

export default SearchResults