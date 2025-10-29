//import the express
const express = require('express')

//import jwt middleware
const jwtMiddleware = require('./middlewares/jwtMiddleware')

//import admin middleware
const jwtAdminMiddleware = require('./middlewares/jwtAdminMiddleware')


//import multerconfig
const multerConfig = require('./middlewares/multerMiddleware')

const userController = require('./controllers/userController')
const bookController = require('./controllers/bookController')
const jobController = require('./controllers/jobController')
const pdfMulterConfig = require('./middlewares/pdfMulterMiddleware')
const appController = require('./controllers/appController')



//instance creation
const route = new express.Router('./controllers/userController')

//path for register
route.post('/register',userController.registerController)

//path for login
route.post('/login',userController.loginController)

//path for google login
route.post('/google-login',userController.googleLoginController)

//path to all home  books

route.get('/all-home-books',bookController.getHomeBookController)
//---------user--------------




//path for addbooks
route.post('/add-book',jwtMiddleware,multerConfig.array('uploadedimages',3),bookController.addBookController)


//path for all book page
route.get('/all-books',jwtMiddleware,bookController.getAllBookController)


//path to view a book
route.get('/view-book/:id',bookController.getABookController)

//path to get all jobs
route.get('/all-jobs',jobController.getAllJobsController)

//path to apply job
route.post('/apply-job',jwtMiddleware,pdfMulterConfig.single("resume"),appController.addApplicationController)

//user profile update
route.put('/update-user', jwtMiddleware, multerConfig.single('profile'), userController.updateUserProfile)

//path to get all user books
route.get('/user-books', jwtMiddleware,bookController.getAllUserBookController)

//path to delete all user books
route.delete('/delete-user-books/:id', jwtMiddleware,bookController.deleteAllUserBookController)

//path to get all brought books
route.get('/user-brought-books', jwtMiddleware, bookController.getAllUserBroughtBookController)

//make payment
//console.log("makePayment type:", typeof bookController.makePayment);

route.post('/make-payment', jwtMiddleware, bookController.makePayment);



//------------admin-----------

//path for all books in admin
route.get('/admin-all-books',jwtAdminMiddleware,bookController.getAllBookAdminController)

//path to approve a book
route.put('/approve-book',jwtAdminMiddleware,bookController.approveBookController)

//path for all users in admin
route.get('/all-users',jwtAdminMiddleware,userController.getAllUserController)

//path for add new job
route.post('/add-job', jobController.addJobController)

//path to delete a job
route.get('/delete-job/:id',jobController.deleteAJobController)

//all applications
route.get('/all-application',appController.getAllPPlicationController)


//path to update admin profile
route.put('/admin-profile-update',jwtAdminMiddleware,multerConfig.single('profile'),userController.editAdminProfileController)


//routes export
module.exports = route

