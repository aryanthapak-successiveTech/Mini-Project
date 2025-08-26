import { useRef } from "react";
import BASE_URL from "../utils/Constant";

const ForgotPassword=()=>{
    const inputRef=useRef();
    const forgotPasswordHandler=async()=>{
        const response=await fetch(`${BASE_URL}/api/v1/user/forgot`,{
            method:"POST",
            body:JSON.stringify({email:inputRef.current.value}),
            headers:{
                "Content-Type":"application/json"
            }
        })

        
    }
}

export default ForgotPassword;