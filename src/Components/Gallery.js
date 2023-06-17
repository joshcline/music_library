import GalleryItem from './GalleryItem'


function Gallery({ data }) {

    data = data.result.read

    const display = data.map((item,i) => {
        console.log(data.map)
        return <GalleryItem key={i} item={item} />
    })

    return(
        <div>
            {display}
        </div>
    )
}

export default Gallery