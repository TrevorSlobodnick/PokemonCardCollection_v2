import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Backend } from '../util/Backend';
import { toast } from 'react-toastify';

const Logout = () => {

    useEffect(() => {
        Backend.logout().then(response => {
            toast.success("Logout Successful");
        });
    })

  return (
    <div className='text-center'>
        <h1 className='my-5'>Logged Out</h1>
        <Link className='btn btn-primary' to="/">Back to Home</Link>
    </div>
  )
}

export default Logout