import React, { useEffect } from 'react'
import { fetchDataFromUrl } from './Utils/Api'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux' // require to interact react components with redux store
import { getApiConfigurations, getGeners } from './Store/homeSlice'

import { SearchResults, Home, Error404, Explore, Details } from "./Pages/index"
import { Footer, Header } from "./Components/index"

const App = () => {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home) // The state is the complete createSlice object
  console.log(url.total_pages);
  // console.log(url) -> For better referance

  const fetchApiConfig = () => {
    fetchDataFromUrl('/configuration')
      .then((res) => {
        console.log(res);

        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }

        dispatch(getApiConfigurations(url));
      })
  }

  // Fetching multiple data using promise. all method
  const genreCall = async()=> {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {}

    endPoints.forEach((url)=> {
      promises.push(fetchDataFromUrl(`/genre/${url}/list`))
    }); // fetchDataFromUrl itself is an async method;

    const data = await Promise.all(promises);// promise.all() method will only execute after resolving all the promises
    data.map((arrayItems) => {
      return(
        arrayItems.genres.map((item)=> {
          allGenres[item.id] = item;
        })
      )
    }) // Now we have to store this in our store;
    // console.log(data);
    // console.log(allGenres);

    dispatch(getGeners(allGenres));
  }

  useEffect(() => {
    fetchApiConfig();
    genreCall();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:querry' element={<SearchResults />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<Error404 />} /> 
          {/* any other path -> * */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
