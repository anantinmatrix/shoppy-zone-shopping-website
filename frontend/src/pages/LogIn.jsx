import { useState } from "react";
import "./css/Login.css";
import axios from 'axios'
import { API_URL } from "../config/config";
import { showNotification } from "../NotificationProvider";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";


const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
  const location = useLocation();


  const handleLogin = (e)=>{
    e.preventDefault();

    axios.post(`${API_URL}/users/login`,{
      email: email,
      password : password
    })
    .then((res)=>{
      console.log(res)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify({id: res.data.user._id, name: res.data.user.name}) )
      showNotification("success","Successfully signed up", 3)
      setemail('')
      setpassword('')
      navigate('/homepage')
    })
    .catch((err)=>{
      showNotification("error",err.response.data.toUpperCase(), 3)
      console.log(err)
    })
  }

  return (
    <>
      <div className="login container-fluid d-flex align-items-center justify-content-center">
        <div className="loginBody w-50 m-auto text-center">
          <h1 className="mb-4">Login</h1>
          <form onSubmit={handleLogin} className="loginForm d-flex flex-column gap-3 form-control w-50 m-auto mb-2">
            <input type="email" id={'email'} className="form-control" placeholder="Email" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="password" id={'password'} className="form-control" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            <button type="submit" className="btn btn-light">Login</button>
          </form>
          <p>
            Don't have an account? <Link to={'/signup'}>Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
