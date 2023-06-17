import GalleryItem from './GalleryItem'

function Gallery({ data }) {

    data = data.result.read

    const display = data.map((item,i) => {
        return <GalleryItem item={item} key={i}/>
    })

    return(
        <div>
            {display}
        </div>
    )
}

export default Gallery