import { axiosClientPython } from "../../api/axiosPython"


const DemandeApi = {
    getDemande: async () => {
        return await axiosClientPython.get('/admin/all')
    },
    refuser: async (id) => {
        return await axiosClientPython.delete('/admin/${id}')
    },
    accepter: async (id) => {
        return await axiosClientPython.delete('/admin/${id}')
    },
    
}
export default DemandeApi
