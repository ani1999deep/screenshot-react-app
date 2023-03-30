import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  //API KEY for screenshot(https://apiflash.com/dashboard/query_builder)

  const API_KEY = 'd50c29343c784910bbbb72141285f50d';
  //For search input
  const [search, setSearch] = useState("https://www.britannica.com/biography/Steve-Jobs");
  //For image search
  const [img, setImg] = useState('');
  //For displaying errors
  const [errors, setErrors] = useState(false);
  //For loading the page
  const [loading, setLoading] = useState(false);

  //URL of Api Flash(documentention)
  // https://api.apiflash.com/v1/urltoimage?access_key=
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&full_page="true"&fresh="true"`;

  //Get the screenshots
  const getScreenshots = async () => {
    // once you serach,clean input
    setSearch("");
    setErrors(false);
    setLoading(true);


    const response = await fetch(URL);
    if (response.ok) {
      setImg(response);
      setLoading(false)
      console.log(response)
    }
    else {

      setErrors(true);
    }
  }



  const searchScreenshots = (e) => {


    //page not re-render
    e.preventDefault();
    getScreenshots();

  }

  useEffect(() => {
    setSearch('');
    getScreenshots();


  }, [])


  return (
    <>
      <div className='App'>
        <nav>
          <div className='container'>
            {/* when submit the form */}
            <form onSubmit={searchScreenshots}>
              {/* Search input */}
              <input type='text' autoFocus value={search} onChange={e => setSearch(e.target.value)} />
              <button type='submit'>Take screenshot</button>
            </form>

          </div>
        </nav>


        <div className='hero'>
          {!loading && !errors ? (
            <div className='container'>


              {img && (
                <a href={img.url} target='_blank'>

                  <img src={img.url} alt='background' />
                </a>
              )
              }
            </div>
          ) : !errors && loading ? (

            <div className='loading'></div>
          ) : errors ? (

            <div className='container'>
              <h2>Please enter a valid url</h2>
            </div>
          ) : (
            " "
          )


          }


        </div>

      </div>
    </>
  )
}

export default App