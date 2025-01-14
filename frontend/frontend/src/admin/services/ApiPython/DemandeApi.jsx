import { axiosClientPython } from "../../../api/axiosPython"


const DemandeApi = {
    getDemande: async () => {
        return await axiosClientPython.get('/api/demandes/')
    },
    refuser: async (id) => {
        return await axiosClientPython.delete(`/api/demandes/${id}/`)
    },
    accepter: async (id) => {
        return await axiosClientPython.delete('/admin/${id}')
    },
    
}
export default DemandeApi
