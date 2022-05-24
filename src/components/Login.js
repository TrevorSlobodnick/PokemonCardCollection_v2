import React, { useState } from 'react'
import { Backend } from '../util/Backend';
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";

const Login = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        Backend.login(email, password).then(response => {
            if(response.completed === false){
                toast.error("Login Failed - \"" + response.data.message + "\"")
            }
            else{
                history.push("/")
            }
        });
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

  return (
    <div className="text-center">
        <div className="form-signin">
            <form className='login-form'>
                <h1 className="h3 my-5 fw-normal">Login</h1>
            
                <div className="form-floating input-group">
                    <input type="email" name='email' className="form-control" id="floatingInput" value={email} onChange={onEmailChange} placeholder="email@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating input-group">
                    <input type="password" name='password' className="form-control" id="floatingPassword" value={email} onChange={onPasswordChange} placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            
                <input type="submit" name='submit' value="Submit" onClick={onSubmit} className="w-100 btn btn-lg btn-primary" />
            </form>
        </div>
    </div>
  )
}

export default Login