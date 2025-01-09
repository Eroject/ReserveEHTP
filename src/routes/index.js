import { createBrowserRouter } from "react-router-dom";
import ClubLayout from "../layout/ClubLayout";
import SendRequest from "../pages/SendRequest";
import RequestsList from "../pages/RequestsList";
export const CLUB_DEFAULT_ROUTE = '/';
export const CLUB_DASHBOARD_ROUTE = '/club';
export const CLUB_VIEW_RESERVATION = '/view-reservation';
export const CLUB_SEND_REQUEST_ROUTE = '/send-request';
export const CLUB_REQUEST_HISTORY_ROUTE = '/requests-list';






const router = createBrowserRouter([

    {
        path: CLUB_DEFAULT_ROUTE,
        element: <ClubLayout />,
        children:[
            {
                path: CLUB_SEND_REQUEST_ROUTE ,
                element:<SendRequest/>
            },
            {
                path: CLUB_REQUEST_HISTORY_ROUTE ,
                element:<RequestsList/>
            }
            
        ]

    },
    


]);
export default router;

