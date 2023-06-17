const API_URL = `https://itunes.apple.com/search?term=`

const fetchSearch = async (search) => {
    const response = await fetch(API_URL + search)
    const resData = await response.json()
    return resData.results
}

const wrapPromise = async (promise) => {
    let status = 'pending'
    let result = ''
    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })
    return {
        read() {
            if(status === 'pending') {
                throw suspender
            } else if (status === 'error') {
                throw result
            }
            return result
        }
    }
}

export const createResource = (search) => {
    return {
        result: wrapPromise(fetchSearch(search))
    }
}