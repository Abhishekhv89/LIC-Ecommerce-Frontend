
import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FloatingLabel } from 'react-bootstrap';
// import "../CSS/style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';


function Login() {

   const [validated, setValidated] = useState(false);
   const [disable , setDisable] = useState(true);
   const [isLoading , setIsLoading] = useState(false);
   
   const data ={
    username:'',
    email:'',
    password:''
   }
   
   const [userData,setUserData] = useState(data);

   const navigate = useNavigate();
   const {dispatch}:any  = useAuthContext();
   const {error,isAuthenticated}:any = useAuthContext();


  const handleSubmit = async(event:FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
     event.preventDefault();
     
     setIsLoading(true);

    if (form.checkValidity() === false) {
     
      event.stopPropagation(); 
    }else{

      try{

        const {username,email,password} = userData;

        //  const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post('http://localhost:3001/login',{
        username,
        email,
        password
      }
    );


      // console.log(data);

      if(data.error ){
        toast.error(data.error);
        console.log(data.error)
        setIsLoading(false);
    
      }else
      if(data.userId){
        // make values empty
        setUserData({ username:'', email:'',password:''});
         //save the user to local storage
         localStorage.setItem("user",JSON.stringify(data));
          dispatch({type:'LOGIN_SUCCESS',payload:data});
          //  console.log(data.status)
          if(isAuthenticated){
        document.cookie = `token=${data.token};path=/`;
        navigate('/dashboard');
          }
          

      }
      }catch(error:any ){
        console.log("LOGIN_FAIL :",error);
        dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message });
      } 
      }
    setValidated(true);
  };

  useEffect(()=>{
    if(error){
      toast.error(error);
    }
  },[error])
 


  useEffect(()=>{

let flage =true;
    if(userData.username && userData.email && userData.password){
      flage = false;
   
  }else{
    flage=true;

  }

  const email_pattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}/;
    
    
     let emailChk = document.querySelector('.emailChk') as HTMLInputElement;
     
     if(userData.email && !email_pattren.test(userData.email)){
        
        emailChk.innerText = 'Please provide valid Email Id.';
        emailChk.style.color = 'red';

        flage = true;
     }else {
      emailChk.innerText = '';
     }

     setDisable(flage)

  },[{...userData}])



    


  return (
    <div className='loginContainer'>
      
      
    <div className='loginTitle'><h1><b>Login</b></h1></div>
<div>
<Form className='formdiv' noValidate validated={validated} onSubmit={handleSubmit} >


    <FloatingLabel
        controlId="username-label"
        label="Username"
        className="mb-3"
      >
        <Form.Control   required type="text"  placeholder="username" 
        /*onChange={e=>setUsername(e.target.value)}*/ 
        value={userData.username}
        onChange={e=>setUserData({...userData,username:e.target.value})}/>
        <Form.Control.Feedback type="invalid">
              Please choose a username.
         </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        controlId="email-label"
        label="Email"
        className="mb-3"
      >
        <Form.Control  required type="email"  placeholder="name@sample.com" 
        /*onChange={e=>setEmail(e.target.value)}*/
        value={userData.email}
         onChange={e=>setUserData({...userData,email:e.target.value})}/>
        
        <div className='emailChk'>
              Please provide valid Email Id.
         </div>
      </FloatingLabel>

      <FloatingLabel
        controlId="password-label"
        label="Password"
        className="mb-3"
      >
        <Form.Control   required type="password"  placeholder="" 
        /*onChange={e=>setPassword(e.target.value)}*/
        value={userData.password}
         onChange={e=>setUserData({...userData,password:e.target.value})} />
       
        <Form.Control.Feedback type="invalid">
              Please provide password.
         </Form.Control.Feedback>
      </FloatingLabel>

      <Row>
        <Col sm={5}>
          <a href='/forgot-password'><u>Forgot Password?</u></a>
        </Col>
          
        <Col sm={7}>
          <p>Don't have an account? <a href='/register'><u>Register</u></a></p>
        </Col>
      </Row>
      
     <div className="d-grid gap-2">
      <Button className="loginButton"  type="submit" size="lg" disabled ={disable || isLoading}>{isLoading? <div className="spinner-border"></div>:"Login"}</Button>
      </div>
    </Form>





</div>
</div>
  )
}

export default Login





