import React, { useState, useEffect } from 'react';
import LeaderBoard from './Leaderboard.jsx';

function App() {
  const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);

  useEffect(() => {
    console.log('Effect triggered')
    setTimeout(() => {
      console.log('Timeout triggered')
      setDisplay(<LeaderBoard />)
    }, 3000)
  },[])


  return (
    <div>
      {pageDisplay}
    </div>
  )

}

export default App;