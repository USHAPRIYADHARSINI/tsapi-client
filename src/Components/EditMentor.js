import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { Form, Button, Container } from "react-bootstrap";

const formValidationSchema = yup.object({
  students: yup.array(),
});

function EditMentor() {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const { id } = useParams();
  const [allstuds, setallStuds] = useState([]);
  const [editmsg, seteditmsg] = useState("");

  const getMentor = () => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/${id}`)
      .then((data) => data.json())
      .then((data) => setList(data));
      console.log(list);
    console.log(id);
  };
  const getStud = () => {
    fetch(`${process.env.REACT_APP_LOCAL_URL}/student/unselected`)
      .then((data) => data.json())
      .then((data) => setallStuds(data));
  };

  useEffect(() => {
    console.log("loading");
    getMentor();
    getStud();
  }, []);

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        students: '',
        mentorId: id,
      },
      validationSchema: formValidationSchema,
      onSubmit: (newUser) => {
        EditMentor(newUser);
        EditStudent(newUser);
      },
    });

  const EditMentor = async (newUser) => {
    console.log(newUser.mentorId);
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/editstud/${newUser.mentorId}`, {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if(data){
          alert(data.msg)
        }})  
  };
  const EditStudent = async (newUser) => {
    let n = newUser.students.length;
    for (let index = 0; index < n; index++) {
      const studid = newUser.students[index];
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/edit/${studid}`, {
        method: "PUT",
        body: JSON.stringify({
          id: studid,
          mentor: newUser.mentorId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => data.json());
    }
    navigate("/mentor");
  };

  const handledel = async (mentorId, students) => {
    const del = {
      students: '',
    };
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/editdelstud/${mentorId}`, {
      method: "PUT",
      body: JSON.stringify(del),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());

    let n = students.length;
    console.log(n)
    const ed = {
      mentor: ''
    }
    for (let index = 0; index < n; index++) {
      const id = students[index];
      await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(ed),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => data.json());
      // .then((data) => alert(data.msg));
      alert("student removed")
    }
    getMentor();
    getStud();
  };

  return (
    <div>
      {!list ? (
        <h3>Loading...</h3>
      ) : (
        <div className="page">
          <div className="topbar">
            <Button className="back" onClick={() => navigate("/")}>
              Home
            </Button>
            <p>Edit Mentor details</p>
            <Button className="addbutton" onClick={() => navigate("/mentor")}>
              Mentor
            </Button>
          </div>
          <div className="mentor">
            <h5 className="card-title">Hi, {list.mentor}</h5>
            <h5 className="card-title">Your Id : {list.mentorId}</h5>
            <h5 className="card-title">Your Email : {list.email}</h5>
            <h5 className="card-title">Your students :{list.students}</h5>
            {/* {list.students.map((stud, index)=>(
              <div>
                <p>{stud}</p>
                <button>Delete</button>
              </div>
            ))} */}
            {!list.students ? null : (
              <Button onClick={() => handledel(list.mentorId, list.students)}>Delete</Button>
            )}
          </div>
          <Container
            className="align-items-center d-flex"
            style={{ height: "100vh" }}
          >
            <Form onSubmit={handleSubmit} className="w-100 mentor">
              <Form.Group className="card-title">
                <Form.Label className="card-title">
                  Select your student
                </Form.Label>
                {allstuds.map((stud, index) => (
                  <Form.Check
                    label={stud.name}
                    name="students"
                    onChange={handleChange}
                    key={index}
                    value={stud.id}
                    id={stud.name}
                  />
                ))}
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Container>
        </div>
      )}
    </div>
  );
}

export default EditMentor;
