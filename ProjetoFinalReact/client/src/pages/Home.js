import React from 'react'
import axios from 'axios';
import {useEffect, useState} from 'react';


function Home() {
    const [listofposts, setlistofposts] = useState([]);
    const userRole = localStorage.getItem("userRole");

  useEffect(()=>{
    axios.get("http://localhost:3001/posts").then((response)=>{
      setlistofposts(response.data)
    });
  }, []);
  return (
    <div>
      
      <div className="App">    
       
          
    {listofposts.map((value, key) =>{ 
      return <div className='post'>
       <div className='title'>{value.title} </div>
       <div className='body'>{value.postText} </div>
       <div className='footer'>{value.username} </div></div>
       

    })}
    </div>
    
    </div>
  )
}

export default Home
