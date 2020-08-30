const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.createUser = async (req,res)=>{

    const {firstName, lastName, email, password } = req.body

    try {
        const userExist = await User.findOne({email})
        const hasedPassword = await bcrypt.hash(password,10)
        if(!userExist){
            const register = new User({
            firstName,
            lastName,
            email,
            password:hasedPassword
        })
        const userSaved = await register.save()
        res.status(201).send({
        status:"user registered",
        userSaved
    })
        }else{
            return res.status(400).json({
                status:"user already registered please login now"
            })
        }
        
    
    } catch (error) {
        res.status(500).json({
            status:"user not registered please register",
            error
        })
       
    }
    
}


//get a single user by ID
exports.getUserById = async (req,res)=>{

    const { id } = req.params
    try {
        const singleUser = await User.findOne(id)
        res.status(200).json({
            status:"single user is found ",
            singleUser:singleUser
        })
    } catch (error) {
        res.status(404).json({
            status:"user not found, do you want register instead",
            error
        })
    }
}



exports.loginUser = async (req,res)=>{


try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(200).json({ message: "Required field missing!" })
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(200).json({ message: "User not found! Do you want to register instead?" })
    }

    if (user && await bcrypt.compare(password, user.password)) {
        const userResponse = {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
        return res.json(userResponse)
    } else {
        return res.status(200).json({ message: "Email or Password does not match!" })
    }


} catch (error) {
    throw Error(`Error while Authenticating a User ${error}`)
}
}
