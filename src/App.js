import { useState, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery'
import SearchBar from './Components/SearchBar'
import AlbumView from './Components/AlbumView'
import ArtistView from './Components/ArtistView'
import NavButtons from './Components/NavButtons'
import { createResource as fetchData } from './helper'
import Spinner from './Spinner'


function App() {
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('Search for Music!')
    const [data, setData] = useState(null)

    useEffect(() => {
      if (search) {
          setData(fetchData(search))
      }
    }, [search])

    const renderGallery = () => {
      if(data) {
        return(
          <Suspense fallback={<Spinner />} >
            <Gallery data={data} />
          </Suspense>
        )
      }
    }


    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    return (
        <div>
            {message}
            <Router>
              <Routes>
                <Route path='/' element={
                  <>
                    <SearchBar handleSearch={handleSearch} />
                    <NavButtons />
                    {renderGallery()}
                  </>
                } />
                <Route path='/album/:id' element={<AlbumView />} />
                <Route path='/artist/:id' element={<ArtistView />} />
              </Routes>
            </Router>
        </div>
    )
}

export default App