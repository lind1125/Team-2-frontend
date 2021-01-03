import React, {useState, useRef} from 'react';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
// Common componenets
import FormGroup from './common/FormGroup'
import BtnSpinner from './common/BtnSpinner'
// helper
import { login } from '../services/auth.service'
import {resMessage} from '../utils/functions.utils'

const required = (value) => {
  if(!value){
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}
const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [data, setData] = useState({username:"",password:""})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)
    // use the library to validate all fields on the form
    form.current.validateAll()
    // validator stores errrors and we can check if error exists
    if(checkBtn.current.context._errors.length === 0){
      login(data.username, data.password).then(()=>{
        setLoading(false)
        props.history.push("/profile")
        window.location.reload()
      },
      (error)=>{


          setLoading(false)
          setMessage(resMessage(error))
        }
      )
    } else {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
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
      <Form onSubmit={handleLogin} ref={form}>
        <FormGroup text='username'>
          <Input
            type="text"
            className="form-control"
            name="username"
            value={data.username}
            onChange={handleChange}
            validations={[required]}
          />
        </FormGroup>
        <FormGroup text='password'>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={data.password}
            onChange={handleChange}
            validations={[required]}
          />
        </FormGroup>

        <BtnSpinner loading={loading} text="Login"/>

       {message && (
           <div className='form-group'>
               <div className='alert alert-danger' role='alert'>
                   {message}
               </div>
           </div>
       )}
       <CheckButton style={{display:'none'}} ref={checkBtn} />
      </Form>
    </div>
  </div>
  )
}

export default Login;