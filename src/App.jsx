
import './App.css'
import { useEffect } from 'react';
import { fetchData } from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfig } from './store/homeSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    apiTesting();
  },[])

  const urlData = useSelector((state) => state.home.url);
  console.log(urlData);
  
  
  const apiTesting = async() => {
    const data = await fetchData('/discover/movie')
    dispatch(getApiConfig(data.results));

    // console.log(data);
  }

  return (
    <div className='App'>
      
    </div>
  )
}

export default App;
