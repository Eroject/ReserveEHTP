import { Outlet, useNavigate} from "react-router-dom";
import { useUserContext } from "../context/Context";
import { useEffect } from "react";
import {  redirectToDashboard } from "../routes";
import AuthentificationApi from "../service-authentification/AuthentificationApi";
export default function VisiteurLayout(){
    const navigate = useNavigate()
    const context = useUserContext()

    useEffect( () => {
        if (context.authenticated) {
            AuthentificationApi.getUser().then( ({data}) => {
                 navigate(redirectToDashboard(data.role))  
            })
        }
        
    },[]);
    return <>
        <Outlet />
    </>
}
