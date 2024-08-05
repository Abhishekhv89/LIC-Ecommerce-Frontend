import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Box, Table, Tbody, Tr, Td, Thead, Th, Spinner, Heading, Text, Alert, AlertIcon, Flex, Avatar, Stack } from '@chakra-ui/react';
import { User } from '../interfaces/userInterface';
import toast from 'react-hot-toast';
import SearchInput from '../components/UserComponent/SearchInput';
import Navigationbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
// import { Breadcrumbs } from '@mui/material';

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [adminUsers, setAdminUsers] = useState<User[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user }: any = useAuthContext();


  const getAdminUsers = async()=>{
try {
      setAdminLoading(true);
      const { data } = await axios.get("http://localhost:3001/adminUsers", { withCredentials: true });

      if (data.error) {
        // setError(data.error);
        toast.error(data.error)
        // navigate('/dashboard');
      } else if (data.adminUsers) {
        setAdminUsers(data.adminUsers);
      }
    } catch (err) {
      // setError('Failed to fetch users');
      console.log("error: ", err);
      // navigate('/dashboard');
    } finally {
      setAdminLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      const func = async () => {
        try {
          setUserLoading(true);
          setAdminLoading(true);
          const { data } = await axios.get("http://localhost:3001/admin", { withCredentials: true });

          if (data.error) {
            console.log("error: ", data.error);
            navigate('/dashboard');
          } else if (!data.auth) {
            navigate('/dashboard');
          }

          if(data.auth){
            getAdminUsers();
          }

        } catch (error: any) {
          console.log('Failed to open admin page:', error.response.data);
          navigate('/dashboard');
        } finally {
          setAdminLoading(false);
          setUserLoading(false);
        }
      };

      func();
    }else{
      navigate('/login')
    }
  }, [user, navigate]);

  const getUsers = async () => {
    try {
      setUserLoading(true);
      const { data } = await axios.get("http://localhost:3001/", { withCredentials: true });

      if (data.error) {
        // setError(data.error);
        toast.error(data.error)
        // navigate('/dashboard');
      } else if (data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      // setError('Failed to fetch users');
      console.log("error: ", err);
      // navigate('/dashboard');
    } finally {
      setUserLoading(false);
    }
  };

   const makeAdmin = async(user:User)=>{
    try{
      if(user){
        setAdminLoading(true);
      const { data } = await axios.put(`http://localhost:3001/${user._id}/makeAdmin`, { withCredentials: true });
      if (data.error) {
        // setError(data.error);
        toast.error(data.error)
        // navigate('/dashboard');
      } else if (data.success) {
        // setUsers(data.users);
        toast.success(`${user.name} is updated to admin`);
      
        // const arr = [...users];
        
        // console.log(users);
        const userId = user._id;
        const newUsers = users.filter(user => user._id !== userId);
        setUsers(newUsers);

        // console.log(arr);
        // const User = users.find((value)=>{
        //   value._id=userId
        // })
        // console.log(newArray)
        // const array =[...adminUsers]
        // if(User)setAdminUsers([...adminUsers,User])
        // getUsers();
        // getAdminUsers();
        setAdminUsers([...adminUsers,user])
        // console.log("updated to admin")
      }
      }
      
    }catch(error){
      console.log("error: ", error);
    }finally {
      setAdminLoading(false);
    }
    
   }


   const removeAdmin = async(user:User)=>{
    try{
      if(adminUsers.length>1){
        setAdminLoading(true);
      const { data } = await axios.put(`http://localhost:3001/${user._id}/removeAdmin`, { withCredentials: true });
      if (data.error) {
        // setError(data.error);
        toast.error(data.error)
        // navigate('/dashboard');
      } else if (data.success) {
        // setUsers(data.users);
        toast.success(`${user.name} is no more Admin user`)
        // const arr = [...users];
        
        // console.log(users);
        // const newArray = users.filter(user => user._id !== userId);
        // console.log(arr);
        // const User = users.find((value)=>{
        //   value._id=userId
        // })
        // console.log(newArray)
        // setUsers(newArray)
        // const array =[...adminUsers]
        // if(User)setAdminUsers([...adminUsers,User])
        const userId = user._id;
        const newAdmins = adminUsers.filter(user => user._id !== userId);
        setAdminUsers(newAdmins)
        // const newUsers = 
        // getUsers();

        // getAdminUsers();
        
        // console.log("updated to admin")
      }
      }else{
        toast.error("no. of admins must be at least 1")
      }
      
    }catch(error){
      console.log("error: ", error);
    }finally {
      setAdminLoading(false);
    }
    
   }






   const [query, setQuery] = useState('');
  // const [suggestions, setSuggestions] = useState<User[]>([]);

  const handleSearchChange = async (e:any) => {
    try{
      const { value } = e.target;
    setQuery(value);

    if (value.length > 1) {
      setUserLoading(true);
      
      const response = await axios.get(`http://localhost:3001/api/search?query=${value}`);
      // console.log(response.data)
      setUsers(response.data);
    } else {
      setUsers([]);
    }
    }catch(error){
      console.log("error while searching users : ",error);
    }finally{
      setUserLoading(false);
    }
    
  };

  const crumbs = [
    { name: 'Home', path: '/', active: false },
    { name: 'Dashboard', path: '/dashboard', active: false },
    { name: 'Admin Page', path: '/user/admin', active: true },
  ];

  return (
    <div className='adminPage'>
    <div style={{paddingLeft:'13px' }}>
                  <Breadcrumbs crumbs={crumbs}/>
               </div>
    <Box p={5}>
      
              {/* <Navigationbar /> */}
      <Heading as="h1" size="xl" mb={5}>Admin Page</Heading>

      <h3 className='mb-2' style={{color:'green'}}>Admin Users: </h3>
      {adminLoading ? (
        <Flex justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {adminUsers.map((user) => (
              <Tr key={user._id}>
                <Td>
                  <Avatar name={user.name} src={"https://bit.ly/broken-link"} />
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button colorScheme="red" size="sm" mr={2} onClick={()=>{removeAdmin(user)}}>remove Admin</Button>
                  
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <h3 className='mb-2 mt-4' style={{color:'teal'}}>Users: </h3>
      <div className='mt-3'>
  
      <SearchInput onSearch={handleSearchChange} value= {query} placeholder = {"Search user by email or name"}/>
      
    </div>
      {/* <Button colorScheme="teal" onClick={getUsers} mb={5}>Get Users</Button> */}
      {userLoading ? (
        <Flex justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>
                  <Avatar name={user.name} src={"https://bit.ly/broken-link"} />
                </Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Button colorScheme="green" size="sm" mr={2} onClick={()=>makeAdmin(user)}>Make Admin</Button>
                  
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
    </div>
    
  );
}

export default AdminPage;
