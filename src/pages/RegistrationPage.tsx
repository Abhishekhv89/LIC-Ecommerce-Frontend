import React from 'react'
// import Login from '../components/userComponent/Login'
// import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import register from "../images/img-register.jpg"
import Registration from '../components/Registration';



function RegistrationPage() {
  return (
    <div className='formPage'>
        <div className="img-container">
            <img src={register} alt="login image" />
        </div>
        <div className='formDiv'>
            
                <Registration/>
            
            
        </div>
      
    </div>
  )
}

export default RegistrationPage
