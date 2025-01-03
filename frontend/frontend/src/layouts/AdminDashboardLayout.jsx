import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useUserContext } from "../context/Context";
import AuthentificationApi from "../services/Api/AuthentificationApi";
import { LOGIN_ROUTE, redirectToDashboard } from "../routes";
import AdminLayout from "./AdminLayout";
export default function AdminDashboardLayout(){
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(true)
    const { authenticated , setUser , setAuthenticated ,  logout: contextLogout} = useUserContext()
    useEffect( () => {
        if(authenticated === true){
            setIsLoading(false)
            AuthentificationApi.getUser().then( ({data}) => {
                if(data.role !== 'admin'){
                    navigate(redirectToDashboard(data.role))
                }
                setUser(data)
                setAuthenticated(true)
               
            }).catch((reason) => {//reason
                contextLogout()
            })
        }else{
            navigate(LOGIN_ROUTE)
        }

    }, [authenticated]);
    if(isLoading){
        return <>
        </>
    }
    return <>
        <AdminLayout/>
    </>
}














