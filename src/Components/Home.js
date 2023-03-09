import React, { useEffect } from 'react'
// import {ListGroup, ListGroupItem} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
// import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import './Home.css';

function Home() {

    const navigate = useNavigate();
    
  return (
    <div className='home'>
      <h1>Welcome to student teacher Homepage</h1>
      <div className='navbar'>
        <Button onClick={()=>navigate('/mentor')}>Mentor's page</Button>
        <Button onClick={()=>navigate('/student')}>Student's page</Button>
      </div>
    </div>
    
  )
}

export default Home