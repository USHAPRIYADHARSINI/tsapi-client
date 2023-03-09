import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./Editstudent.css";

function Editstudentlist() {
  let navigate = useNavigate();
  const [student, setStudent] = useState("");
  const { id } = useParams();
  const [mentor, setMentor] = useState([]);
  const [fetchedit, setfetchedit] = useState("");

  const getStud = async() => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/student/${id}`)
      .then((data) => data.json())
      .then((data) => setStudent(data));
      console.log(student);
    }

    const getMentor = async() => {
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor`)
      .then((data) => data.json())
      .then((data) => setMentor(data));
      console.log(mentor);
    }

  useEffect(() => {
    getStud();
    getMentor();
    
    console.log(id);
  }, []);

  const [edit, setEdit] = useState({
    mentor: student.mentor,
  });

  const editList = async () => {
    console.log(edit);
    await fetch(
      `${process.env.REACT_APP_LOCAL_URL}/student/edit/${student.id}`,
      {
        method: "PUT",
        body: JSON.stringify(edit),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((data) => data.json())
      .then((data) => setfetchedit(data));
    alert(fetchedit.msg, fetchedit.edited);
    await navigate(`/student`);
  };

  const handledel = async (mentorId, studentid) => {
    const del = {
      mentor: '',
    };
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/edit/${studentid}`, {
      method: "PUT",
      body: JSON.stringify(del),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    const ed = {
      students: [studentid]
    }
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/editdel/${mentorId}`, {
        method: "PUT",
        body: JSON.stringify(ed),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());
      alert("mentor removed")
    
    getMentor();
    getStud();
  };

  return (
    <div>
      {!student? <h3>Loading...</h3>
      : <div className="page">
        <div className="topbar">
          <Button className="back" onClick={() => navigate("/")}>
            Home
          </Button>
          <p>Edit student details</p>
          <Button className="addbutton" onClick={() => navigate("/student")}>
            Student
          </Button>
        </div>
          <div className="mentor">
            <h5 className="card-title"> Hi, {student.name}</h5>
            <h5 className="card-title">Your Id : {student.id}</h5>
            <h5 className="card-title">Your Email : {student.email}</h5>
            <h5 className="card-title">Your Mentorname : {student.mentor}</h5>
            {student.mentor ? <Button onClick={()=>handledel(student.mentor,student.id)}>Delete Mentor</Button>: null}
          </div>
          {student.mentor === "" ? (
            <div className="mentor">
            <Form onSubmit={editList} className="w-100">
              <h5 className="card-title">Select your prefered mentor</h5>
              <Form.Group className="my-2" >
              {mentor.map((ment, index) => (
                <div key={index}>
                  <Form.Control
                    type="radio"
                    name="mentor"
                    onChange={(e) => setEdit({ mentor: e.target.value })}
                    value={ment.mentor}
                  />
                  <Form.Label>{ment.mentor}</Form.Label>
                </div>
              ))}
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
            </div>
          ) : null}
      </div>
      }
    </div>
  );
}

export default Editstudentlist;
