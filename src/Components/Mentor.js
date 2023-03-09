import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Alert } from "react-bootstrap";
import "./Mentor.css";

//get all mentors
function Mentor() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [deletemsg, setDeletemsg] = useState("");

  const getMentors = async () => {
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor`)
      .then((data) => data.json())
      .then((data) => setList(data));
    console.log(list)
  };

  // const getStudents = async (list) => {
  //   let n = list.students.length;
  //   for (let index = 0; index < n; index++) {
  //     const id = list.students[index];
  //     await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/${id}`)
  //       .then((data) => data.json())
  //       .then((data) => console.log(data));
  //   }
  // };

  useEffect(() => {
    getMentors();
    // console.log(list)
    // getStudents(list);
  }, []);

  async function handleDelete(id) {
    console.log(id);
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/delete/${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => setDeletemsg(data));
    console.log(deletemsg);
    // Alert("data deleted successfully");
    alert(deletemsg.msg);
    navigate("/mentor");
  }

  async function handleDel(studs){
    console.log(studs);
    if(studs){
      const del = {
      mentor: ''
    }
    let n = studs.length
    for (let index = 0; index < n; index++) {
      const id = studs[index];
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(del),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json());
        navigate('/mentor')
    }}
  }

  return (
    <div>
      <div className="page">
        <div className="topbar">
          <Button className="back" onClick={() => navigate("/")}>
            Home
          </Button>
          <p>Mentors</p>
          <Button className="addbutton" onClick={() => navigate("/mentor/add")}>
            Add new mentor
          </Button>
        </div>

        <div className="mentorpage">
          {!list ? (
            <p>loading ...</p>) 
            : (
            list.map((mentor, index) => (
              <div className="card mentor-card mentor" key={index}>
                <div className="card-head">
                  <h3 className="card">Name : {mentor.mentor}</h3>
                  <h3 className="card">Id : {mentor.mentorId}</h3>
                  <h3 className="card">Email : {mentor.email}</h3>
                </div>
                <div className="card-body">
                  <h3>My students (Id)</h3>
                  {!mentor.students? <h3>-</h3> 
                  : <h3>{mentor.students}</h3>}
                  <h5
                    className="navigate"
                    onClick={() => navigate(`/mentor/edit/${mentor.mentorId}`)}
                  >
                    Click here to edit
                  </h5>
                </div>
                <Button
                  className="del"
                  onClick={() => handleDelete(mentor.mentorId) && handleDel(mentor.students)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Mentor;
