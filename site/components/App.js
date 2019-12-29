import React, { useState, useEffect } from 'react';

function App() {
  const [pageDisplay, setDisplay] = useState(<p>LOADING</p>);



  return (
    <div>
      {pageDisplay}
    </div>
  )

}

export default App;