import { createBrowserRouter } from "react-router-dom";
import ClubDashboardLayout from "../club/layout/ClubDashboardLayout";
import AdminDashboardLayout from "../admin/layout/AdminDashboardLayout";
import VisiteurLayout from "../loginLayout/VisiteurLayout";
import ClientDashboardLayout from "../client/layout/ClientDashboardLayout";
import AdminDashboard from "../admin/components/AdminDashboard";
import AdminCalendrier from "../admin/components/AdminCalendrier";
import AdminClub from "../admin/components/AdminClub";
import LoginComponent from "../loginLayout/LoginComponent";
import ClientDashboard from "../client/components/ClientDashboard";
import ClubDashboard from "../club/components/ClubDashboard";
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
