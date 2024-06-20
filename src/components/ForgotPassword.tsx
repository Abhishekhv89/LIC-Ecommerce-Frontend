import React from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef } from 'react';



function ForgotPassword() {

   const [validated, setValidated] = useState(false);
   const [email,setEmail] = useState('');
   const [disable , setDisable] = useState(true);
   const [phone,setPhone] = useState('');
   const navigate = useNavigate();
   const emptyArr = ['', '', '', ''];
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = '1204';

useEffect(()=>{


let flage = true;

    if(email && phone){
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
     const email_pattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}/;
     
     if(email && !email_pattren.test(email)){
        
        emailChk.innerText = 'Please provide valid Email Id.';
        emailChk.style.color = 'red';

        flage = true;
     }else {
      emailChk.innerText = '';

     }

     setDisable(flage);


  },[email,phone])


  const otpHandler =()=>{

    const otp = document.querySelector('.otpContainer') as HTMLDivElement;
    otp.style.visibility="visible";

     const missed = inputs.map((item, i) => {
      if (item === '')
        return i;
    }).filter((item) => (item || item === 0));
    console.log('missed ', missed);
    const mised = missed.map(String);

    setMissing(mised);
    if (missed.length) {
      return
    }

    const userInput = inputs.join('');
    const isMatch = userInput === CODE;

        if(isMatch)
            navigate("/login");
        else{
           let otpChk = document.querySelector('.otpChk') as HTMLDivElement;
           otpChk.innerText='Incorrect OTP';
           otpChk.style.color='red';
           otpChk.style.textAlign="center";
           otpChk.style.marginBottom="5px";

        }

  }



const handleSubmit = (event:any) => {
    const form = event.currentTarget;
     event.preventDefault();






    


    if (form.checkValidity() === false) {
     
      event.stopPropagation();
    
    }else{
       
        otpHandler();
    }
    



 setValidated(true);


 


    
    // alert(msg);
   
  };

  

  const handleInputChange = (e:any, index:number) => {
    const val = e.target.value;
    console.log(val, index);
    if (!Number(val) && val!='0')
      return;

    if (index < inputs.length - 1) { // 1
      refs[index + 1]?.current?.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  }

  const handleOnKeyDown = (e:any, index:number) => {
    console.log(e.keyCode, index);
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1]?.current?.focus();
      }
    }
  }

  const handlePaste = (e:any) => {
    const data = e.clipboardData.getData('text');
    console.log('paste data ', data)
    if (!Number(data) || data.length !== inputs.length)
      return;

    const pastCode = data.split('');
    setInputs(pastCode);
    refs[inputs.length - 1]?.current?.focus();
  }


  return (
    <div className='forgotPasswordContainer'>
    <div className='forgotPasswordTitle'>
        <h1><b>Forgot Password</b></h1>
    </div>
    <div>
        <Form className='formdiv' noValidate validated={validated} onSubmit={handleSubmit}>

      <FloatingLabel
        controlId="email-label"
        label="Email"
        className="mb-3"
       
      >
        
          <Form.Control className=""  required type="email"  placeholder="name@sample.com" onChange={e=>setEmail(e.target.value)}/>
      
          
        <div className='emailChk'>
             
         </div>
      
      </FloatingLabel>


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


       
      <Button className="registerButton"  size="lg" onClick={handleSubmit} disabled ={disable}>Send OTP</Button>
      

    <Row className="otpContainer">
      
        <Col sm={2} className='p-6' >

               <h5>OTP :</h5>
        </Col>
        <Col sm={10}>
        <div>
        {
          emptyArr.map((item, i) => {
            return <input
              value={inputs[i]}
              key={i}
              ref={refs[i]}
              type='text'
              maxLength={1}
              onPaste={handlePaste}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleOnKeyDown(e, i)}
              className={missing.includes(i.toString()) ? 'otp-error' : ''}
            />
          })
        }
        </div>
        
        
        </Col>
        <div className='otpChk'>
            
        </div>
        <div className="d-grid gap-2 mb-2">
      <Button className="registerButton" type="submit" size="lg" >Submit</Button>
      </div>
     
       </Row>

   
    
    </Form>
    </div>
    </div>
  )
}

export default ForgotPassword


