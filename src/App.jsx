import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import InfoLocation from './components/InfoLocation'
import CardResident from './components/CardResident'

function App() {

  const [locationId, setLocationId] = useState(Math.floor(Math.random() * 126) + 1)


  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [ location, getLocation, isLoding, hasError] = useFetch(url)

  useEffect (() => {
    getLocation()
  }, [locationId])

  const inputLocation = useRef()

  const hadLocation = e => {
    e.preventDefault()
    setLocationId(inputLocation.current.value.trim())
  }

  return (
   <div className='app'>
    <h1 className='app__title'></h1>
    <form className='app__form' onSubmit={hadLocation}>
      <input className='app__input' ref={inputLocation} type="text" />
      <button className='app__btn'>Search</button>
    </form>
   { 
      isLoding
      ? <h2>Loading...</h2>
      : (
        hasError || locationId === '0'
        ? <h2 className='error'>❌ Hey! you must provide an id from 1 to 126 🥺</h2>
       : (
         <>
           <InfoLocation location = {location}/>
             <div className='app_card-container'>
               {
                 location?.residents.map(url => (
                   <CardResident 
                     key = {url}
                     url = {url}
                   />
                 ))
               }
             </div>
         </>
       )
      )
     }
   </div>
  )
}

export default App
