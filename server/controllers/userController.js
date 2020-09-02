const User = require('../models/User')
const bcrypt = require('bcrypt')


exports.createUser = async (req,res)=>{

    try {
        const { email, firstName, lastName, password } = req.body
        const existentUser = await User.findOne({ email })

        if (!existentUser) {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = await User.create({
                email,
                firstName,
                lastName,
                password: hashPassword,
            })
            return res.json(user)
        }
        return res.status(400).json({
            message:
                'email already exist!  do you want to login instead? ',
        })
    } catch (err) {
        throw Error(`Error while Registering new user :  ${err}`)
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
