import React from 'react'
import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import forgPass from "../images/img-forpass.webp"

import ForgotPassword from '../components/ForgotPassword';



function ForgotPasswordPage() {
  return (
    <div className='formPage'>
        <div className="img-container">
            <img src={forgPass} alt="login image" />
        </div>
        <div className='formDiv'>
            
                <ForgotPassword/>
            
            
        </div>
      
    </div>
  )
}

export default ForgotPasswordPage

