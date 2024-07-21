import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// import "bootstrap/dist/css/bootstrap.min.css"


function AgentRegistration() {

    const [validated, setValidated] = useState(false);
    const [disable , setDisable] = useState(true);

    const [agentData,setAgentData] = useState({
        agentName:'',
        agentPhone:'',
        agentEmail:'',
        agentId:'',
        nomineeName:'',
        nomineePhone:'',
        nomineeAddress:'',
        relationship:''
    })

    const handleSubmit = async(event:FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    // setIsLoading(true);
     event.preventDefault();

     const { agentName,agentEmail,agentPhone,agentId,nomineeName,nomineePhone,nomineeAddress,relationship} = agentData
     
     
    

    if (form.checkValidity() === false) {
          
      
      event.stopPropagation();
      
    
    }else{

      

    if(!disable){
        try{
  
    //   const {data} = await axios.post('http://localhost:3001/register',{name,email,password,address,phone});
       
    //    if(data.error){
    //     toast.error(data.error);
    //     setIsLoading(false);
    //    }else{
    //       //make all empty
    //        setIsLoading(false);
    //       toast.success('Registration was successfull.')
    //       navigate("/login");
    //    }
    console.log("hi");
     
     }catch(err){
      console.log(err);
     }

    }
     
     
      
    }

 setValidated(true);

  };


   useEffect(()=>{
 const { agentName,agentEmail,agentPhone,agentId,nomineeName,nomineePhone,nomineeAddress,relationship} = agentData

    
     const email_pattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}/;
    let flage =true;
    

      let agentPh = document.querySelector('.agentPh') as HTMLInputElement;
      
      if(agentPhone && agentPhone.length !=10 ){

        agentPh.innerText = 'the phone number must contain 10 numbers ';
        agentPh.style.color = 'red';

        flage = true;
        // setDisable(true);
    
      }else{
        agentPh.innerText = '';
        flage = false;
      }
         let nomineePh = document.querySelector('.nomineePh') as HTMLInputElement;
      if(nomineePhone && nomineePhone.length !=10 ){

        nomineePh.innerText = 'the phone number must contain 10 numbers ';
        nomineePh.style.color = 'red';

        flage = true;
    
      }else{
        nomineePh.innerText = '';
        // flage = false;
      }
            
  

     let emailChk = document.querySelector('.emailChk') as HTMLInputElement;
     
     if(agentEmail && !email_pattren.test(agentEmail)){
        
        emailChk.innerText = 'Please provide valid Email Id.';
        emailChk.style.color = 'red';

        flage = true;
     }else {
      emailChk.innerText = '';

     }

     if(!(agentName && agentEmail && agentPhone && agentId && nomineeName && nomineePhone)){
        flage=true
    }

     setDisable(flage);

  },[{...agentData}]);

  

  return (
<div className="agentRegisterContainer">
  
  
    <Form  noValidate validated={validated} onSubmit={handleSubmit} >

            <h2>Registration</h2>
      

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Name <span className='required'>*</span> :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter Name" 
          value={agentData.agentName}
          required
        onChange={e=>setAgentData({...agentData,agentName:e.target.value})}/>
          
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Phone <span className='required'>*</span> :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="Enter Phone Number" 
          value={agentData.agentPhone}
          required
        onChange={e=>setAgentData({...agentData,agentPhone:e.target.value})}/>
        </Col>
        <div className="agentPh"></div>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Email <span className='required'>*</span> :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Enter Email"
          value={agentData.agentEmail}
          required
          onChange={e=>setAgentData({...agentData,agentEmail:e.target.value})}
           />
        </Col>
         <div  className='emailChk'>
             
         </div>
       
      </Form.Group>


      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Agent ID <span className='required'>*</span> :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter Agent ID" 
          value={agentData.agentId}
    
    required
    onChange={e=>setAgentData({...agentData,agentId:e.target.value})}/>
        </Col>
      </Form.Group>


       <h2 style={{marginTop:'20px'}}>Nominee Details</h2>
      
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Name <span className='required'>*</span> :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter Nominee Name" 
          value={agentData.nomineeName}
required
onChange={e=>setAgentData({...agentData,nomineeName:e.target.value})}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Mobile <span className='required'>*</span> :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="Enter Nominee Mobile" 
          value={agentData.nomineePhone}
required

        onChange={e=>setAgentData({...agentData,nomineePhone:e.target.value})}/>
        </Col>
        <div className="nomineePh"></div>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Address :
        </Form.Label>
        <Col sm={10}>
          <Form.Control as="textarea" aria-label="With textarea" placeholder='Enter Nominee address' 
          value={agentData.nomineeAddress}

        onChange={e=>setAgentData({...agentData,nomineeAddress:e.target.value})}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Relationship :
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="Enter Relationship" 
          value={agentData.relationship}
        onChange={e=>setAgentData({...agentData,relationship:e.target.value})}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 9, offset: 6 }}>
          <Button type="submit" disabled={disable}>Register</Button>
        </Col>
      </Form.Group>
    </Form>
  </div>


        

   
    
  );
}

export default AgentRegistration