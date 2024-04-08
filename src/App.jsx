
import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchData } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfig } from './store/homeSlice';


import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
  }, [])

  const urlData = useSelector((state) => state.home.url);
  // console.log(urlData);


  const fetchApiConfig = async () => {
    const data = await fetchData('/configuration');

    const url = {
      backdrop: data.images.secure_base_url + 'original',
      poster: data.images.secure_base_url + 'original',
      profile: data.images.secure_base_url + 'original',
    }

    dispatch(getApiConfig(url));

    // console.log(data);
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* / is for after loading page  */}
        <Route path='/' element={<Home />} />

        {/* mediaType is for it is Movie or TvShow and id for perticular selected movie or show  */}
        <Route path='/:mediaType/:id' element={<Details />} />

        <Route path='/search/:query' element={<SearchResult />} />

        <Route path='/explore:mediaType' element={<Explore />} />

        {/* * for when no all routes work this it will show pagenotfound  */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
