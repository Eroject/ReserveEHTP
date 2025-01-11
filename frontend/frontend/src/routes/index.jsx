import { createBrowserRouter } from "react-router-dom";
import LoginComponent from "../components/Login/LoginComponent";
import ClientDashboard from "../components/Client/ClientDashboard";
import VisiteurLayout from "../layouts/VisiteurLayout";
import ClientDashboardLayout from "../layouts/ClientDashboardLayout";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import ClubDashboardLayout from "../layouts/ClubDashboardLayout";
import AdminCalendrier from "../components/Admin/AdminCalendrier";
import AdminDashboard from "../components/Admin/AdminDashboard";
import ClubDashboard from "../components/Club/ClubDashboard";
import AdminClub from "../components/Admin/AdminClub";
export const LOGIN_ROUTE ='/';
export const CLIENT_DASHBOARD_ROUTE ='/client';
export const ADMIN_DASHBOARD_ROUTE ='/admin';
export const ADMIN_DASHBOARD_EVENT_ROUTE ='/admin/event';
export const ADMIN_CALENDRIER_ROUTE ='/admin/calendrier';
export const ADMIN_CLUB_ROUTE ='/admin/club';
export const CLUB_DASHBOARD_ROUTE ='/club';


export const redirectToDashboard = (roleType) => {
    switch (roleType) {
        case 'client':
            return(CLIENT_DASHBOARD_ROUTE);
        case 'admin':
            return(ADMIN_DASHBOARD_ROUTE);
        case 'club' :
            return(CLUB_DASHBOARD_ROUTE);

    }
}

export const router = createBrowserRouter([

    {
        element: <VisiteurLayout/>,
        children: [
            {
                path: LOGIN_ROUTE,
                element: <LoginComponent/>
            },
        ]
    },
    {
        element: <ClientDashboardLayout/>,
        children: [
            {
                path: CLIENT_DASHBOARD_ROUTE,
                element: <ClientDashboard/>
            }
        ]
    },
    {
        element: <AdminDashboardLayout/>,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <AdminDashboard/>
            }, 
            {
                path: ADMIN_CALENDRIER_ROUTE,
                element: <AdminCalendrier/>
            }, 
            {
                path: ADMIN_CLUB_ROUTE,
                element: <AdminClub/>
            }

        ]
    },
    {
      element: <ClubDashboardLayout/>,
      children: [
        {
          path: CLUB_DASHBOARD_ROUTE,
          element: <ClubDashboard/>
        }
      ]
    }

]);
