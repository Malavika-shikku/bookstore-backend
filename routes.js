const express = require('express');
const jwtMiddleware = require('./middlewares/jwtMiddleware');
const jwtAdminMiddleware = require('./middlewares/jwtAdminMiddleware');
const multerConfig = require('./middlewares/multerMiddleware');
const pdfMulterConfig = require('./middlewares/pdfMulterMiddleware');

const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const jobController = require('./controllers/jobController');
const appController = require('./controllers/appController');

const route = express.Router();

// ---------- USER ROUTES ----------
route.post('/register', userController.registerController);
route.post('/login', userController.loginController);
route.post('/google-login', userController.googleLoginController);
route.get('/all-home-books', bookController.getHomeBookController);

route.post('/add-book', jwtMiddleware, multerConfig.array('uploadedimages', 3), bookController.addBookController);
route.get('/all-books', jwtMiddleware, bookController.getAllBookController);
route.get('/view-book/:id', bookController.getABookController);

route.get('/all-jobs', jobController.getAllJobsController);
route.post('/apply-job', jwtMiddleware, pdfMulterConfig.single('resume'), appController.addApplicationController);
route.put('/update-user', jwtMiddleware, multerConfig.single('profile'), userController.updateUserProfile);
route.get('/user-books', jwtMiddleware, bookController.getAllUserBookController);
route.delete('/delete-user-books/:id', jwtMiddleware, bookController.deleteAllUserBookController);
route.get('/user-brought-books', jwtMiddleware, bookController.getAllUserBroughtBookController);
route.post('/make-payment', jwtMiddleware, bookController.makePayment);

// ---------- ADMIN ROUTES ----------
route.get('/admin-all-books', jwtAdminMiddleware, bookController.getAllBookAdminController);
route.put('/approve-book', jwtAdminMiddleware, bookController.approveBookController);
route.get('/all-users', jwtAdminMiddleware, userController.getAllUserController);
route.post('/add-job', jobController.addJobController);
route.get('/delete-job/:id', jobController.deleteAJobController);
route.get('/all-application', appController.getAllPPlicationController);
route.put('/admin-profile-update', jwtAdminMiddleware, multerConfig.single('profile'), userController.editAdminProfileController);

module.exports = route;
