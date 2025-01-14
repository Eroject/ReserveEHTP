import { axiosClientPython } from "../../../api/axiosPython"


const ReservationApi = {
    add: async () => {
        return await axiosClientPython.post('/api/reservation')
    },
    all: async () => {
        return await axiosClientPython.get('api/reservation')
    }
    
}
export default ReservationApi
