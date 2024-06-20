
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
// import { redirect } from 'react-router-dom';




function Registration() {



   const [validated, setValidated] = useState(false);

   const [name,setName] = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [conPassword,setConPassword] = useState('');
   const [disable , setDisable] = useState(true);
   const [passchk,setPasschk] = useState(true);
   const [phone,setPhone] = useState('');
   const [address , setAddress] = useState('');
   const [reset,setReset] = useState(false);

   const navigate = useNavigate();

  const handleSubmit = (event:any) => {
    const form = event.currentTarget;
     event.preventDefault();

     
     
      let temp = false;
    if(conPassword!==password){
      event.stopPropagation();
     setPasschk(false);
     temp = false;    
    }else{
        setPasschk(true);
         temp = true;
    }


    if (form.checkValidity() === false) {
      
      
      event.stopPropagation();
      
    
    }else{

      console.log()

     if(temp){
      navigate("/login");
     }
    }

 setValidated(true);



  

    
   
  };

  useEffect(()=>{


    if(name || email || password || conPassword || phone || address){
      
      setReset(true);
    }else{
      console.log("reset")
      setReset(false);
    }
     const email_pattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}/;
    let flage =true;
    if(name && email && password && conPassword && phone && address){
      let phoneChk = document.querySelector('.phone') as HTMLInputElement;

      if(phone.length !=10 ){

        phoneChk.type='invalid';
        phoneChk.innerText = 'the phone number must contain 10 numbers ';
        phoneChk.style.color = 'red';

        flage = true;
        // setDisable(true);
      }else{
        phoneChk.innerText = '';
        flage = false;
        // setDisable(false);
        
      }
            
    }else{
      flage = true;
            // setDisable(true);
     }

     let emailChk = document.querySelector('.emailChk') as HTMLInputElement;
     
     if(email && !email_pattren.test(email)){
        
        emailChk.innerText = 'Please provide valid Email Id.';
        emailChk.style.color = 'red';

        flage = true;
     }else {
      emailChk.innerText = '';

     }


     setDisable(flage);


     



  },[name,email,password,conPassword,address,phone])


  
    


  return (
    <div className='registerContainer'>
    <div className='registerTitle'><h1><b>Registration</b></h1></div>
<div>
<Form className='formdiv' noValidate validated={validated} onSubmit={handleSubmit}>

  <Row className='g-2'>
    <Col> 
    <FloatingLabel
        controlId="name-label"
        label="Name"
        className='mb-3'
      
      >
        <Form.Control   required type="text"  placeholder="name" onChange={e=>setName(e.target.value)} />
        <Form.Control.Feedback type="invalid">
              Please provide name.
         </Form.Control.Feedback>
      </FloatingLabel>
    </Col>

    <Col>
          <FloatingLabel
        controlId="phone-label"
        label="Phone number"
        className="mb-3"
      >
        <Form.Control   required type="number"  placeholder="" onChange={e=>setPhone(e.target.value)} />
        <div className='phone' ></div>
        <Form.Control.Feedback  type="invalid">
              Please provide phone number.
         </Form.Control.Feedback>
      </FloatingLabel>

    </Col>
      </Row>


      <FloatingLabel
        controlId="email-label"
        label="Email"
        className="mb-3"
       
      >
        
          <Form.Control className=""  required type="email"  placeholder="name@sample.com" onChange={e=>setEmail(e.target.value)}/>
      
      
        <div  className='emailChk'>
             
         </div>
      
      </FloatingLabel>

      



<Row className='g-2'>
  <Col>
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
  </Col>
  
<Col>
<FloatingLabel
        controlId="conPassword-label"
        label="Confirm password"
        className="mb-3"
      >
        <Form.Control   required type="password"  placeholder="" onChange={e=>setConPassword(e.target.value)} />
        {passchk  || <Form.Control.Feedback type="invalid">
              Re-enter the password.
         </Form.Control.Feedback>}
        { !passchk && <div className='passwordCheck'>password and confirm password must match</div> } 
      </FloatingLabel>

</Col>
       

</Row>

      


      <FloatingLabel
        controlId="address-label"
        label="Address"
        className="mb-3"
      >
        <Form.Control  className="address" required as="textarea"  placeholder="" onChange={e=>setAddress(e.target.value)}  style={{ height: '60px', background:'rgb(242, 240, 238)'}}/>
        <Form.Control.Feedback type="invalid">
              Please provide password.
         </Form.Control.Feedback>
      </FloatingLabel>
      

      
      <Row>
        <Col >
         <div className="d-grid gap-2 ">
      <Button className="registerButton" variant='success' type="submit" size="lg" disabled ={disable}>Register</Button>
      </div>
        </Col>
        <Col >
        <div className="d-grid gap-2 ">
      <Button className="resetButton" variant='danger' type="reset" size="lg" disabled ={!reset}>Reset</Button>
      </div>
        </Col>
         
      
       

      </Row>
    
    </Form>





</div>
</div>
  )
}

export default Registration





