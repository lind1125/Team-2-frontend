import React, {useState, useRef} from 'react';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import validator from 'validator';
// Common components we made
import FormGroup from './common/FormGroup'
import BtnSpinner from './common/BtnSpinner'
// helpers
import {resMessage} from '../utils/functions.utils'
import { register, login } from '../services/auth.service'

const required = (value) => {
  if(!value){
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

// validates username
const vusername = (value) => {
  if(value.length < 3 || value.length>= 20){
    return (
      <div className="alert alert-danger" role="alert">The username must be 3-20 characters</div>
    )
  }
}

// function that validates Password
const vpassword = value => {
  if(value.length<6 || value.length>=40){
    return (
      <div className="alert alert-danger" role="alert">The password must be 6-40 characters</div>
    )
  }
}

const email = (value) => {
  if (!validator.isEmail(value)) {
    return (<div className="alert alert-danger" role="alert">
      `${value} is not a valid email.`
    </div>
      )
  }
};


const Signup = (props) =>{
  const form = useRef()
  const checkBtn = useRef()

  const [data,setData] = useState({username:"",password:"",email:""})
  const [successful, setSuccessful] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignup = (e) => {
    e.preventDefault()
    setMessage("")
    setSuccessful(false)
    // use the library to validate all fields on the form
    form.current.validateAll()
    // validator stores errrors and we can check if error exists
    if(checkBtn.current.context._errors.length === 0){
      // register the user
      register(data.username, data.email, data.password).then((response)=>{
        setMessage(response.data.message)
        setSuccessful(true)
        // log them in after
        login(data.username,data.password).then(()=>{
          props.history.push("/")
          window.location.reload()
        })
      },
      (error)=>{

          setSuccessful(false)
          setMessage(resMessage(error))
        }
      )
    } else {
      setSuccessful(false)
    }
  }

  const handleChange = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleSignup} ref={form}>
          <FormGroup text='username'>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={data.username}
              onChange={handleChange}
              validations={[required, vusername]}
            />
          </FormGroup>

          <FormGroup text='email'>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={data.email}
              onChange={handleChange}
              validations={[required, email]}
            />
          </FormGroup>

          <FormGroup text='password'>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={data.password}
              onChange={handleChange}
              validations={[required, vpassword]}
            />
          </FormGroup>

          <BtnSpinner loading={successful} text="SignUp"/>

         {message && (
             <div className='form-group'>
                 <div className={successful ? 'alert alert-success':'alert alert-danger'} role='alert'>
                     {message}
                 </div>
             </div>
         )}
         <CheckButton style={{display:'none'}} ref={checkBtn} />
        </Form>
      </div>
    </div>
)};

export default Signup;