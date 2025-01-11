import { useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/Context"
import { LOGIN_ROUTE } from "../../routes"
import AuthentificationApi from "../../services/Api/AuthentificationApi"

export default function ClientDashboard(){
    const {logout: contextLogout } = useUserContext()
    const navigate = useNavigate()
    const logout = async () => {
        AuthentificationApi.logout().then( () => {
            contextLogout()
            navigate(LOGIN_ROUTE)
        })
    }
    return <>
        <button
  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
  onClick={logout}
>
  Logout
</button>

        Salam c'est client
    </>
}