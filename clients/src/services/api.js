import Axios from 'axios';



//To Initialize our Axios
const api = Axios.create({
    baseURL:'http://localhost:3040'
})

export default api