import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../CSS/DropdownBox.css'; // Create a separate CSS file for styling
import { Button, Navbar } from 'react-bootstrap';
import { Avatar } from '@chakra-ui/react';
import { useLogout } from '../hooks/useLogout';
import { User } from '../interfaces/userInterface';

interface Props{
    userDetail:User | null;
    username:string;
}

function DropdownBox({userDetail,username}:Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

 const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    setOpen(false);
    // navigate('/login');
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button   onClick={handleToggle} >
                <div className="navbar-toggler-icon"></div>
              </button>
      {open && (
        <div className="dropdown-menu">
        
                  <li><Navbar.Text className='p-1 d-flex' ><Avatar size={'sm'} marginRight={3} src='https://bit.ly/broken-link' /><b>{username}</b> </Navbar.Text></li>
                  <li><Button variant="outline-dark" size='sm' className='logout-btn' 
                  onClick={()=>{
                handleLogout()
                setOpen(false);
                }
                
            }
                  >Logout</Button></li>
                  {
                  userDetail?.role == 'admin' && 
                  <li><Button size='sm' className='logout-btn mb-2' onClick={() => {setOpen(false); navigate('/user/admin') }}>Admin Page</Button></li>
                   } 
             
        </div>
      )}
    </div>
  );
}

export default DropdownBox;
