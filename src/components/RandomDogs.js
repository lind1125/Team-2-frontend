import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card'
import {getRandomDogs, likeDog, rejectDog} from '../services/dogs.service.js'
import NotLoggedIn from './common/NotLoggedIn'
import {getCurrentUser} from '../services/auth.service'
import '../css/components/RandomDogs.css'

const RandomDogs = (props) => {
  const [dogs, setDogs] = useState([])
  const [clicked, setClicked] = useState(false)
  const [lastDirection, setLastDirection] = useState()

  //initial useEffect for
  useEffect(()=>{
    if(getCurrentUser()){
      getRandomDogs(props.match.params.dogid).then(response=>{
        setDogs(response.data)
      }).catch(err=>console.log(err))
    }
  },[])

  const swiped = (direction, idToDelete) => {
    console.log('removing: ' + idToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  // Left is reject, Right is accept :)

  const handleClick = () => {
    setClicked(!clicked)
  }

  const display = () => {
    return !getCurrentUser()
    ? <NotLoggedIn/>
    : (
      <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {dogs.map((dog) =>
          <TinderCard className='swipe' key={dog.name} onSwipe={(dir) => swiped(dir, dog._id)} onCardLeftScreen={() => outOfFrame(dog.name)}>
            <div onClick={handleClick} style={{ backgroundImage: 'url(' + dog.picture_url + ')' }} className='card'>
              {clicked?<div className="dogInfo"><h3>{dog.name}</h3><p>{dog.breed}</p></div> :<h3>{dog.name}</h3>}
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
    )
  }
  return display()
}

export default RandomDogs
