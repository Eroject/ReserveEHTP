import { useEffect, useState } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import { LOGIN_ROUTE, redirectToDashboard } from "../../routes";
import { useUserContext } from "../../context/Context";
import ClubLayout from "./ClubLayout";
import AuthentificationApi from "../../service-authentification/AuthentificationApi";
export default function ClubDashboardLayout(){
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(true)
    const { authenticated , setUser , setAuthenticated ,  logout: contextLogout } = useUserContext()
    useEffect( () => {
        if(authenticated === true){
            setIsLoading(false)
            AuthentificationApi.getUser().then( ({data}) => {
                
                if(data.role !== 'club'){
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
        return <></>
    }
    return <>
        <ClubLayout />
    </>
}
