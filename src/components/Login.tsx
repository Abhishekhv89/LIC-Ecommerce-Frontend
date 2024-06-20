
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Login() {



   const [validated, setValidated] = useState(false);

   const [username,setUsername] = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [disable , setDisable] = useState(true);

  const handleSubmit = (event:any) => {
    const form = event.currentTarget;
     event.preventDefault();

    if (form.checkValidity() === false) {
     
      event.stopPropagation(); 
    }

    setValidated(true);
  };

  useEffect(()=>{

let flage =true;
    if(username && email && password){
      flage = false;
    //  setDisable(false);
  }else{
    flage=true;
    // setDisable(true);
  }

  const email_pattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}/;
    
    
     let emailChk = document.querySelector('.emailChk') as HTMLInputElement;
     
     if(email && !email_pattren.test(email)){
        
        emailChk.innerText = 'Please provide valid Email Id.';
        emailChk.style.color = 'red';

        flage = true;
     }else {
      emailChk.innerText = '';
     }

     setDisable(flage)

  },[username,email,password])


  
    


  return (
    <div className='loginContainer'>
    <div className='loginTitle'><h1><b>Login</b></h1></div>
<div>
<Form className='formdiv' noValidate validated={validated} onSubmit={handleSubmit}>


    <FloatingLabel
        controlId="username-label"
        label="Username"
        className="mb-3"
      >
        <Form.Control   required type="text"  placeholder="username" onChange={e=>setUsername(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
              Please choose a username.
         </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="email-label"
        label="Email"
        className="mb-3"
      >
        <Form.Control  required type="email"  placeholder="name@sample.com" onChange={e=>setEmail(e.target.value)}/>
        
        <div className='emailChk'>
              Please provide valid Email Id.
         </div>
      </FloatingLabel>

      <FloatingLabel
        controlId="password-label"
        label="Password"
        className="mb-3"
      >
        <Form.Control   required type="password"  placeholder="" onChange={e=>setPassword(e.target.value)} />
       
        <Form.Control.Feedback type="invalid">
              Please provide password.
         </Form.Control.Feedback>
      </FloatingLabel>

      <Row>
        <Col sm={5}>
          <a href='/forgot-password'>Forgot Password?</a>
        </Col>
          
        <Col sm={7}>
          <p>Don't have an account? <a href='/register'>Register</a></p>
        </Col>
      </Row>
      
     <div className="d-grid gap-2">
      <Button className="loginButton" type="submit" size="lg" disabled ={disable}>Login</Button>
      </div>
    </Form>





</div>
</div>
  )
}

export default Login





