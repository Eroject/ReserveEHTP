import RequestForm from "../components/RequestForm";
import './../styles/SendRequest.css';


export default function SendRequest(){
    return(
        <div style={{ marginTop: '0px' }}>
        <h2 style={{ marginTop: '0px' }}>Demande de réservation</h2>
        <RequestForm/>
        

        </div>
    );
}