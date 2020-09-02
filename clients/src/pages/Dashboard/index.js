import React, {useEffect, useState} from 'react'
import api from '../../services/api'

//the dashboard will show all the events
export default function Dashboard(){
    const [ events, setEvents ] = useState([])
    const user_id =localStorage.getItem('user');

    const getEvents = async () =>{
        const request = await api.get('/dashboard')
    }
    console.log(user_id)
    return(
        
        <div>
      <h2>sports app</h2>
        </div>
    )
}