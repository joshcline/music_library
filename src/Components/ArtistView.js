import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavButtons from './NavButtons'

function ArtistView() {
    const { id } = useParams()
    const [artistData, setArtistData ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `http://localhost:4000/album/${id}`
            const response = await fetch(API_URL)
            const data = await response.json()
            const albums = data.results.filter(item => item.collectionType === 'Album')
            setArtistData(albums)
        }

        fetchData()
    }, [id])

    const display = artistData && artistData.map(album => {
        return (
            <div key={album.collectionId}>
                <p>{album.collectionName}</p>
            </div>
        )
    })

    return (
        <div>
            {NavButtons}
            {display}
        </div>
    )
}

export default ArtistView