import { useEffect, useState } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import { useUserContext } from "../../context/Context";
import { LOGIN_ROUTE, redirectToDashboard } from "../../routes";
import ClientLayout from "./ClientLayout";
import AuthentificationApi from "../../service-authentification/AuthentificationApi";
export default function ClientDashboardLayout(){
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = useState(true)
    const { authenticated , setUser , setAuthenticated ,  logout: contextLogout} = useUserContext()
    useEffect( () => {
        if(authenticated === true){
            setIsLoading(false)
            AuthentificationApi.getUser().then( ({data}) => {
                
                setUser(data)
                setAuthenticated(true)
                if(data.role !== 'client'){
                    navigate(redirectToDashboard(data.role))
                }
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
        <ClientLayout />
    </>
}
