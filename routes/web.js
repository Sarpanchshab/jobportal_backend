const express = require('express')
const UserController = require('../controllers/UserController')
const route = express.Router()
const checkUserAuth = require('../middleware/auth')
const JobController = require('../controllers/JobController')
const ApplicationController = require('../controllers/ApplicationController')
const CategoryController = require('../controllers/CategoryController')



//userController
route.get('/getuser',checkUserAuth,UserController.getuser)
route.post('/registerUser',UserController.registerUser)
route.post('/login',UserController.login)
route.post('/logout',UserController.logout)

//jobController
route.post('/jobInsert',checkUserAuth,JobController.postJob)
route.get('/getalljob',JobController.getallJob)
route.get('/getMyJobs',checkUserAuth,JobController.getMyJobs)
route.post('/updateJob/:id',checkUserAuth,JobController.updateJob)
route.delete('/deleteJob/:id',checkUserAuth,JobController.deleteJob)
route.get('/getSingleJob/:id',JobController.getSingleJob)

//applicationController
route.post('/post',checkUserAuth,ApplicationController.postApplication)
route.get('/employer/getall',checkUserAuth,ApplicationController.employerGetAllApplications)
route.get("/jobseeker/getall", checkUserAuth, ApplicationController.jobseekerGetAllApplications);
route.delete("/delete/:id", checkUserAuth, ApplicationController.jobseekerDeleteApplication);

//category
route.post('/createcategory', CategoryController.createCategory);
route.get('/getallcategories', CategoryController.getAllCategories);
route.get('/getcategorybyid/:id', CategoryController.getCategoryById);
route.put('/updatecategory/:id', CategoryController.updateCategory);
route.delete('/deletecategory/:id', CategoryController.deleteCategory);
route.get("/categorylist/:name", checkUserAuth, CategoryController.Categorylist)

module.exports = route