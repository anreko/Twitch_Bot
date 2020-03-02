import React, { useState, useEffect } from 'react';

function App() {
  const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);

  useEffect(() => {
    console.log('Effect triggered')
    setTimeout(() => {
      console.log('Timeout triggered')
      setDisplay(<p>Not working</p>)
    }, 3000)
  },[])


  return (
    <div>
      {pageDisplay}
    </div>
  )

}

export default App;