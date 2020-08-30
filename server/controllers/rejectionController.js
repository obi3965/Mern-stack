const Registration = require('../models/Registration');

exports.rejection = async (req,res)=>{
    const { registration_id } = req.params;

        try {
            const registration = await Registration.findById(registration_id);

            registration.approved = false;

            await registration.save();

            return res.json(registration);

        } catch (error) {
            return res.status(400).json(error)
        }
}