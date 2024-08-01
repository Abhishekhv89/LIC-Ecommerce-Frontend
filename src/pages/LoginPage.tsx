import React from 'react'
import Login from '../components/Login'
// import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import login from "../images/img-login.webp"



function LoginPage() {
  return (
    <div className='formPage'>
        <div className="img-container">
            <img src={login} alt="login image" />
        </div>
        <div className='formDiv'>
            
                <Login/>
            
            
        </div>
      
    </div>
  )
}

export default LoginPage
