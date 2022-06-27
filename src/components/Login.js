import React, { useState } from 'react'
import { Backend } from '../util/Backend';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

const Login = () => {

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if(email.trim() === "" || password.trim() === ""){
            setErrorMessage("All fields must contain values");
            return;
        }
        Backend.login(email, password).then(response => {
            if(response.completed === false){
                setErrorMessage(response.data.message)
                toast.error("Login Failed")
            }
            else{
                toast.success("Login Successful")
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
                <h1 className="h3 mt-5 fw-normal">Login</h1>

                <p className='text-danger my-4'>{errorMessage}</p>
            
                <div className="form-floating mb-3">
                    <input type="email" name='email' className="form-control" id="floatingInput" value={email} onChange={onEmailChange} placeholder="email@example.com" required />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" name='password' className="form-control" id="floatingPassword" value={password} onChange={onPasswordChange} placeholder="Password" required />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
            
                <input type="submit" name='submit' value="Submit" onClick={onSubmit} className="w-100 btn btn-lg btn-primary" />
            </form>
        </div>
    </div>
  )
}

export default Login