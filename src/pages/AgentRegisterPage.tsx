import Navigationbar from '../components/Navbar'
import AgentRegistration from '../components/AgentRegister'
import Breadcrumbs from '../components/Breadcrumbs';
import "../CSS/style.css"


function AgentRegisterPage() {

  const crumbs = [
    { name: 'Home', path: '/', active: false },
    { name: 'Dashboard', path: '/dashboard', active: false },
    { name: 'Agent Registration', path: '/agentRegistration', active: true },
  ];
  

  
  return (
    <div>
        {/* <Navigationbar /> */}
        <div className="agentRegister">
          <div className="agent-breadcrumb">
          <Breadcrumbs crumbs={crumbs} />
          </div>
            <AgentRegistration/>
        </div>
        
      
    </div>
  )
}

export default AgentRegisterPage
