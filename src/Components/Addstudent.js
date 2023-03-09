import React, { useEffect } from 'react'
import * as yup from "yup";
import {useFormik} from "formik";
// import {Form, Button, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from 'react-bootstrap';
import './Addstudents.css';

const formValidationSchema = yup.object({
    id:yup.string().required(),
    name:yup.string().required(),
    email:yup.string().required(),
  })

function Addstudent() {

    let navigate = useNavigate();

    const {handleSubmit, values, handleChange,handleBlur,touched, errors} = useFormik({
      initialValues:{
        id: '',
        name:'',
        email:'',
        mentor:''
      },
      validationSchema : formValidationSchema,
      onSubmit:(newUser) => {
        addList(newUser)
      }
  
  })
    let addList = (newUser) => {
      console.log(newUser)
      fetch(`${process.env.REACT_APP_LOCAL_URL}/student/add`,{
          method:"POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type" : "application/json",
        },
        })
        .then((data) => data.json())
        .then((data) => {
          if(data){
            alert(data.msg)
            navigate('/student')
          }})}
           

  return (
    <div>
      <div className="page">
        <div className="topbar">
          <Button className="back" onClick={() => navigate("/")}>
            Home
          </Button>
          <p>Students</p>
          <Button className="addbutton" onClick={() => navigate("/student")}>
            student
          </Button>
        </div>
    <Container className='mentorpage ' style={{height: '100vh'}}>
    <Form onSubmit={handleSubmit} className='mentor'>
        <div className='box'>
        <Form.Group className='card'>
            <Form.Label>Enter your name : </Form.Label>
            <Form.Control type="string" name="name" onChange={handleChange} value={values.name} required/>
        </Form.Group>
        <Form.Group className='card'>
            <Form.Label>Enter your email : </Form.Label>
            <Form.Control type="string" name="email" onChange={handleChange} value={values.email} required/>
        </Form.Group>
        <Form.Group className='card'>
            <Form.Label>Enter your Id   : </Form.Label>
            <Form.Control type="string" name="id" onChange={handleChange} value={values.id} required />
        </Form.Group>
            <Button type='submit'>Submit</Button>
        </div>
    </Form>
</Container>
</div>
</div>
  )
}

export default Addstudent