import { useState, useEffect } from 'react'
import { useParams,} from 'react-router-dom'
import NavButtons from './NavButtons'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    
    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/song/${id}`
            const response = await fetch(API_URL)
            const data = await response.json()
            console.log(data)
            const songs= data.results.filter(item => item.kind==="song")
            setAlbumData(songs)
        }

        fetchData()

    },[id])
            
    const display = albumData && albumData.map(song => {
        return (
            <div key={song.trackId}>
                <p>{song.trackName}</p>
            </div>
        )
    })
    return (
        <>
            {NavButtons}
           {display}
        </>
    )
}

export default AlbumView