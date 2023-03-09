import React, { useEffect, useState } from "react";
import { Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./GetStudents.css";

function GetStudents() {
  const [studList, setStudList] = useState([]);
  const navigate = useNavigate();
  const [deletedata, setDeletedata] = useState("");

  const getStudents = () => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/student`)
      .then((data) => data.json())
      .then((data) => setStudList(data));
    console.log(studList);
  };

  useEffect(() => {
    getStudents();
    // if (studList) {
    //   console.log(studList)
    // } else return
  }, []);

  const handleDelete = async (Id) => {
    console.log(Id);
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/delete/${Id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => {
        if(data){
          alert(data.msg)}
      });
    
    getStudents();
    navigate("/student");
  };

  async function handleDel(mentId, studId){
    console.log(mentId);
    const del = {
      students: studId
    }
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/editdel/${mentId}`, {
        method: "PUT",
        body: JSON.stringify(del),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json());
        navigate('/student')
    
  }

  return (
    <div>
      <div className="page">
        <div className="topbar">
          <Button className="back" onClick={() => navigate("/")}>
            Home
          </Button>
          <p>Students</p>
          <Button onClick={() => navigate("/student/add")}>
            Add new student
          </Button>
        </div>
        <Container className="mentorpage">
          {!studList ? (
            <h2>loading</h2>
          ) : (
            studList.map((stud, index) => (
              <div className="card mentor-card mentor" key={index}>
                <div className="card-head">
                  <h3 className="card">Name : {stud.name}</h3>
                  <h3 className="card">Id : {stud.id}</h3>
                  <h3 className="card">Email : {stud.email}</h3>
                </div>
                <div className="card-body">
                  <h3>Mentor name</h3>
                  {stud.mentor ? <h3>{stud.mentor}</h3> : <h3>-</h3>}
                  <h5 className="navigate" onClick={() => navigate(`/student/edit/${stud.id}`)}>
                    Click here to edit
                  </h5>
                </div>
                <Button onClick={() => handleDelete(stud.id) && handleDel(stud.mentor, stud.id)}>Delete</Button>
              </div>
            ))
          )}
        </Container>
      </div>
    </div>
  );
}

export default GetStudents;
