
const Event = require ('../models/Event')

exports.getEventById = async (req,res) =>{
     const {eventId} = req.params
    //const eventId = req.params.eventId
    try {
        // const singleEvent = await Event.findById({_id:eventId})
        const singleEvent = await Event.findById(eventId)
        res.status(200).json({
            status:"single user is found ",
            singleEvent:singleEvent
        })
    } catch (error) {
        res.status(404).json({
            message:"user not found, do you want register instead",
            error
        })
    }
   
}

exports.getAllEvents = async (req,res)=>{
    
    try {
       const allEvents = await Event.find() 
      res.status(200).json({
           status:"all events found",
           allEvents:allEvents
       })
    } catch (error) {
        res.status(404).json({
            message:'not found all events',
            error:error
        })
    }
    

}



 //QUERY THE SPORT
exports.queryEvents = async (req,res)=>{
    const { sport } = req.params
   const query = { sport } || {}
   try {
      const queryEvents = await Event.find(query) 
        res.status(200).json({
          status:"all events found",
          queryEvents:queryEvents
      }) 
               
   } catch (error) {
       res.status(404).json({
           message:'not found all events',       
       })
   }  
}