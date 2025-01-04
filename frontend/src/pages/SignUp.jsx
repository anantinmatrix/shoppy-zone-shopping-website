import { useState } from "react";
import "./css/SignUp.css";
import axios from 'axios'
import { API_URL } from "../config/config";
import { showNotification } from "../NotificationProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();

  const handleSignUp = (e)=>{
    e.preventDefault();

    axios.post(`${API_URL}/users/signup`,{
      name : name,
      email: email,
      password : password
    })
    .then((res)=>{
      console.log(res)
      showNotification("success","Successfully signed up", 3)
      setname('')
      setemail('')
      setpassword('')
      navigate('/login')
    })
    .catch((err)=>{
      showNotification("error",JSON.stringify(err.response.data.toUpperCase()), 3)
      console.log(err)
    })
  }

  return (
    <>
      <div className="signUp container-fluid d-flex align-items-center justify-content-center">
        <div className="signUpBody w-50 m-auto text-center">
          <h1 className="mb-4">Sign In</h1>
          <form onSubmit={handleSignUp} className="signUpForm d-flex flex-column gap-3 form-control w-50 m-auto mb-2">
            <input type="text" id={'name'} className="form-control" placeholder="Name" value={name} onChange={(e)=> setname(e.target.value)}/>
            <input type="email" id={'email'} className="form-control" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="password" id={'password'} className="form-control" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            <button type="submit" className="btn btn-light">Sign In</button>
          </form>
          <p>
            Already have an account? <Link to={'/login'}>Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
