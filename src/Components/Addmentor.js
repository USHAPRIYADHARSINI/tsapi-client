import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./Addmentor.css";

const formValidationSchema = yup.object({
  mentor: yup.string().required(),
  email: yup.string().required(),
  mentorId: yup.string().required(),
  students: yup.array(),
});

function Addmentor() {
  const [studList, setStudList] = useState([]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_LOCAL_URL}/student/unselected`)
  //     .then((data) => data.json())
  //     .then((data) => setStudList(data));
  // }, []);

  // const EditStudent = async (newUser) => {
  //   let n = newUser.students.length;
  //   for (let index = 0; index < n; index++) {
  //     const id = newUser.students[index];
  //     await fetch(`${process.env.REACT_APP_LOCAL_URL}/student/edit/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         id: id,
  //         mentor: newUser.mentor,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((data) => data.json());
  //   }
  // };

  let navigate = useNavigate();
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        mentor: "",
        email: "",
        mentorId: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (newUser) => {
        addList(newUser);
      },
    });
  let addList = async (newUser) => {
    console.log(newUser);
    await fetch(`${process.env.REACT_APP_LOCAL_URL}/mentor/add`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          alert(data.msg);
          navigate("/mentor");
        }
      });
  };
  return (
    <div>
      <div className="page">
        <div className="topbar">
          <Button className="back" onClick={() => navigate("/")}>
            Home
          </Button>
          <p>Mentors</p>
          <Button className="addbutton" onClick={() => navigate("/mentor")}>
            Mentor
          </Button>
        </div>
        <div className="mentor">
          {!studList ? (
            <div>Loading</div>
          ) : (
            <Form onSubmit={handleSubmit} className="mentor">
              <div className="box">
                <Form.Group className="card">
                  <Form.Label>Enter your name : </Form.Label>
                  <Form.Control
                    type="string"
                    name="mentor"
                    onChange={handleChange}
                    value={values.name}
                    required
                  />
                </Form.Group>
                <Form.Group className="card">
                  <Form.Label>Enter your email : </Form.Label>
                  <Form.Control
                    type="string"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </Form.Group>
                <Form.Group className="card">
                  <Form.Label>Enter your Id : </Form.Label>
                  <Form.Control
                    type="string"
                    name="mentorId"
                    onChange={handleChange}
                    value={values.mentorId}
                    required
                  />
                </Form.Group>
                {/* <Form.Group className="card">
                  <Form.Label>Select your student : </Form.Label>
                  {studList.map((stud, index) => (
                    <Form.Check
                      label={stud.name}
                      name="students"
                      onChange={handleChange}
                      key={index}
                      value={stud.id}
                      id={stud.name}
                    />
                  ))}
                </Form.Group> */}
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addmentor;
