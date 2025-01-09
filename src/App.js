
import './App.css';
import CalendarReservation from './components/CalendarReservation';
import RequestForm from './components/RequestForm';
import RoomsDropDown from "./components/RoomsDropDown";
import TimeReservation from './components/TimeReservation';
import router from "./routes/index"
import { RouterProvider } from 'react-router-dom';



function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
    
    
  );
}

export default App;
