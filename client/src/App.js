import React, { useState, useEffect } from 'react';
import './App.css';
import ApiService from './components/ApiService';

/* IMPORT: other functions */
import Header from './components/Header'
import Ladder from './containers/Ladder'
import './components/Header.css';

function App() {
  const [ladder, setLadder] = useState({});
  const [players, setPlayers] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect( () => {
    // Get all DB data. FIX ME: move this to another component & make more DRY.
    console.log('app.js:: useEffect: fetching DB data..');
    // Get ladder
    ApiService.getLadder()
      .then(ladder => {
        setLadder(ladder)
      })
      .catch( err => { console.log(`ERROR App.js:: useEffect() getPlayers Error =`); console.log(err) } );
    // Get players
    ApiService.getPlayers()
    .then(players => {
      setPlayers(players)
    })
    .catch( err => { console.log(`ERROR App.js:: useEffect() getChallenges Error =`); console.log(err) } );
    // Get challenges
    ApiService.getChallenges()
      .then(challenges => {
        setChallenges(challenges)
      })
      .catch( err => { console.log(`ERROR App.js:: useEffect() getChallenges Error =`); console.log(err) } );
  }, [])

  return (
    <>
      <Header />
      <div>ladder --> ladderPlayer (list) --> playerDetail (link)</div>
      <Ladder ladder={ladder} players={players}>Ladder here</Ladder>
    </>
  );
}

export default App;
