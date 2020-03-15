import React, { useState, useEffect } from 'react';

function LeaderBoard() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      fetch('/leaderboard')
      //check database for all users    
        //.then(response => response.json())
        .then(response => response.json())
        .then(data => {
            console.log('Getting back:', data)
            let tempData = [];
            for (let i = 0; i < Object.keys(data).length; i+=1) {
                console.log('data', Object.keys(data)[i])
                tempData.push(<p>{Object.keys(data)[i]}: {data[Object.keys(data)[i]]}</p>)
            }
            setUserData(tempData)
        }) 
    },[])
  
  
    return (
        <div>
            <h2>Leaderboard</h2>
            {userData}
        </div>
    )
  
  }
  
  export default LeaderBoard;