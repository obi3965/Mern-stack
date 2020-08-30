const express = require('express')
const multer = require('multer')
const UserController = require('../controllers/userController')
const EventController = require('../controllers/eventsController')
const DashboardController = require('../controllers/dashboardController')
const LoginController = require('../controllers/loginController')
const RegistrationController = require('../controllers/registrationController')
const ApprovalController = require('../controllers/approvalController')
const RejectionController = require('../controllers/rejectionController')


const routes = express.Router();
const uploadFile = require('../uploads/upload') 
const upload = multer(uploadFile)

routes.get('/status', (req, res) => {
    res.send({ status: 200 })
})

//Registration
routes.post('/registration/:eventId', RegistrationController.create)
routes.get('/registration/:registration_id', RegistrationController.getRegistration)
routes.post('/registration/:registration_id/approvals', ApprovalController.approval)
routes.post('/registration/:registration_id/rejections', RejectionController.rejection)

//Login
routes.post('/login', LoginController.store)

//Dashboard
routes.get('/dashboard/:sport', DashboardController.queryEvents)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/event/:eventId', DashboardController.getEventById)

//Events
routes.post('/event', upload.single("thumbnail"), EventController.create)
routes.delete('/event/:eventId', EventController.delete)

//User
 routes.post('/user/register', UserController.createUser)
 routes.get('/user/:userId', UserController.getUserById)

module.exports = routes;