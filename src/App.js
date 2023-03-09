import {Routes,Route} from 'react-router-dom';
import Home from './Components/Home.js';
import GetStudents from './Components/GetStudents';
import Addmentor from './Components/Addmentor';
import Addstudent from './Components/Addstudent';
import EditMentor from './Components/EditMentor';
import Editstudentlist from './Components/Editstudentlist';
import Mentor from './Components/Mentor';
import React,{useEffect} from 'react';

function App() {

  //  useEffect(() => {
      
  //   },[])

  return (
    <div>
    <>
      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/mentor" element={<Mentor/>} />
        <Route path="/student" element={<GetStudents/>} />
        <Route path="/mentor/add" element={<Addmentor/>} />
        <Route path="/student/add" element={<Addstudent/>} />
        <Route path="/mentor/edit/:id" element={<EditMentor/>} />
        <Route path="/student/edit/:id" element={<Editstudentlist/>} />
      </Routes>
    </>
    </div>
  );
}

export default App;
