import { useCookies } from "react-cookie";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import toast from "react-hot-toast";



export const useLogout =()=>{
    const {dispatch}:any = useAuthContext()
    const logout = async()=>{
        try{
            //remove user from storage
        const {data} = await axios.get('http://localhost:3001/logout',{withCredentials:true});
        if(data.success){
         localStorage.removeItem('user');
        dispatch({type:'LOGOUT'});
         toast.success(data.message);
        }else{
            toast.error("failed to logout");
        }
        }catch(error){
            console.log("error in loging out ",error);
             toast.error("failed to logout");
        }
        
        

    }

    return {logout}
}