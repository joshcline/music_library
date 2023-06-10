import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './Components/Gallery.js'
import SearchBar from './Components/SearchBar.js'
import AlbumView from './Components/AlbumView.js'
import ArtistView from './Components/ArtistView.js'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    //gets the data from itunes everytime the search is changed
    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `https://itunes.apple.com/search?term=${encodeURI(search)}`
            const response= await fetch(API_URL)
            const data= await response.json()
            console.log(data)
            if(data.results.length > 0){
                setData(data.results)
            } else {
                setMessage('not found')
            }
        }

        if(search) fetchData()
    }, [search])

    //makes it so that when submited it changes the searched term
    const handleSearch= (e, term) => {
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
                    <Gallery data={data}/>   
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