import React, { useState } from 'react'

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        
    }

    return (
        <div className="text-center">
            <div className="form-signin">
                <form className='login-form'>
                    <h1 className="h3 my-5 fw-normal">Register</h1>
                
                    <div className="form-floating input-group">
                        <input type="email" name='email' className="form-control" id="floatingInput" placeholder="email@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating input-group">
                        <input type="password" name='password' className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                
                    <input type="submit" name='submit' value="Submit" onClick={onSubmit} className="w-100 btn btn-lg btn-primary" />
                </form>
            </div>
        </div>
    )
}

export default Register