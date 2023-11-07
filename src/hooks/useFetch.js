import axios from "axios"
import { useState } from "react"

const useFetch = (url) => {
    
    const [infoApi, setInfoApi] = useState()
    const [isLoding, setIsLoding] = useState(true)
    const [hasError, setHasError] = useState(false)

    const getApi = () => {
        setIsLoding(true)
        axios.get(url)
        .then(res => {
            setInfoApi(res.data)
            setHasError(false)
        })
        .catch(err => {
            console.log(err)
            setHasError(true)
        })
        .finally(() => setIsLoding(false))
    }
    return [infoApi, getApi, isLoding, hasError]
}

export default useFetch