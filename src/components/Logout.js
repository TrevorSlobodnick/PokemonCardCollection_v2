import React, { useEffect } from 'react'
import { Backend } from '../util/Backend';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    useEffect(() => {
        Backend.logout().then(response => {
            toast.success("Logout Successful");
        });
    })

  return (
    <Redirect to="/"></Redirect>
  )
}

export default Logout