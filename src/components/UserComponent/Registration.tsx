
import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
// import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { ChangeEvent } from 'react';



function Registration() {



   const [validated, setValidated] = useState(false);

   const data ={
    name:'',
    email:'',
    password:'',
    phone:'',
    conPassword:'',
    address:''

   }

   
   const [userData,setUserData] = useState(data);

   const [disable , setDisable] = useState(true);
   const [passchk,setPasschk] = useState(true);
  
   const [reset,setReset] = useState(false);
   const [isLoading,setIsLoading] = useState(false);

   const navigate = useNavigate();



  const handleSubmit = async(event:FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    setIsLoading(true);
     event.preventDefault();

     const { name,email,password,phone,conPassword,address} = userData
     
      let isValid = false;
    if(conPassword!==password){
      event.stopPropagation();
     setPasschk(false);
     isValid = false;    
    }else{
        setPasschk(true);
         isValid = true;
    }


    if (form.checkValidity() === false) {
          
      
      event.stopPropagation();
      
    
    }else{

      

     if(isValid){
     try{
  
      const {data} = await axios.post('http://localhost:3001/register',{name,email,password,address,phone});
       
       if(data.error){
        toast.error(data.error);
        setIsLoading(false);
       }else{
          //make all empty
           setIsLoading(false);
          toast.success('Registration was successfull.')
          navigate("/login");
       }
     
     }catch(err){
      console.log(err);
     }
     }
      
    }

 setValidated(true);



  

    
   
  };

  

  const handelRest=()=>{
    setUserData({ name:'',
    email:'',
    password:'',
    phone:'',
    conPassword:'',
    address:''
});
  }

  useEffect(()=>{
 const { name,email,password,phone,conPassword,address} = userData

    if(name || email || password || conPassword || phone || address){
      
      setReset(true);
    }else{
      
      setReset(false);
    }
     const email_pattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}/;
    let flage =true;
    if(name && email && password && conPassword && phone){
      let phoneChk = document.querySelector('.phone') as HTMLInputElement;

      if(phone.length !=10 ){

        phoneChk.type='invalid';
        phoneChk.innerText = 'the phone number must contain 10 numbers ';
        phoneChk.style.color = 'red';

        flage = true;
    
      }else{
        phoneChk.innerText = '';
        flage = false;
      
        
      }
            
    }else{
      flage = true;
 
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

  },[{...userData}])


  
    


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
        <Form.Control   required type="text"  placeholder="name" 
        // onChange={e=>setName(e.target.value)} 
        value={userData.name}
        onChange={e=>setUserData({...userData,name:e.target.value})}
         />
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
        <Form.Control   required type="number"  placeholder="" 
        // onChange={e=>setPhone(e.target.value)} 
        value={userData.phone}
        onChange={e=>setUserData({...userData,phone:e.target.value})}
        />
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
        
          <Form.Control className="" type="email" required placeholder="name@sample.com" 
          // onChange={e=>setEmail(e.target.value)}
          value={userData.email}
          onChange={e=>setUserData({...userData,email:e.target.value})}
          />
      
      <Form.Control.Feedback type="invalid">
              Please provide email.
         </Form.Control.Feedback>
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
        <Form.Control   required type="password"  placeholder=""
        //  onChange={e=>setPassword(e.target.value)}
        value={userData.password}
        onChange={e=>setUserData({...userData,password:e.target.value})}
          />
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
        <Form.Control   required type="password"  placeholder="" 
        // onChange={e=>setConPassword(e.target.value)}
        value={userData.conPassword}
        onChange={e=>setUserData({...userData,conPassword:e.target.value})}
         />
        {!passchk  || <Form.Control.Feedback type="invalid">
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
        <Form.Control  className="address"  as="textarea"  placeholder="" 
        // onChange={e=>setAddress(e.target.value)} 
        value={userData.address}
        onChange={e=>setUserData({...userData,address:e.target.value})} 
        style={{ height: '60px', background:'rgb(242, 240, 238)'}}/>
        
      </FloatingLabel>
        
      <Row>
        <Col >
         <div className="d-grid gap-2 ">
      <Button className="registerButton" variant='success' type="submit" size="lg" disabled ={disable}>Register</Button>
      </div>
        </Col>
        <Col >
        <div className="d-grid gap-2 ">
      <Button className="resetButton" variant='danger' onClick={handelRest} size="lg" disabled ={!reset}>Reset</Button>
      </div>
        </Col>

      </Row>
    
    </Form>

</div>
</div>
  )
}

export default Registration





