
const Event = require('../models/Event');
const User = require("../models/User");


exports.create = async (req, res) => {
        const { title, description, price, sport } = req.body;
        const { user_id } = req.headers;
        const { filename } = req.file
        
        try {
          const user = await User.findById(user_id)

        if (!user) {
            return res.status(400).json({ message: 'User does not exist!' })
        }  
        const event = await Event.create({
            title,
            description,
            price: parseFloat(price),
            user: user_id,
            sport,
            thumbnail: filename
        })
        return res.status(201).json({
            event:event
        });
        } catch (error) {
            res.status(500).json({
                status:'not user created'
            })
        }       
};







exports.delete = async (req,res) =>{
    const { eventId } = req.params;
        try {
          const deleteEvent =  await Event.findByIdAndDelete(eventId)
             res.status(200).json({
                status:'event is deleted',
                deleteEvent
            })

        } catch (error) {
            return res.status(400).json({ message: 'We do have any event with the ID' })
        }
    }

