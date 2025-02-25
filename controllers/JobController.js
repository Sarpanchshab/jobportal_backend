const JobModel = require('../models/Job')

class JobController {

    static getallJob = async (req, res) => {
        try {
            //expired false me job dikhegi true me nahi dikhegi 
            const jobs = await JobModel.find({ expired: false })
            res.status(200).json({
                success: true,
                jobs
            })
        } catch (error) {
            console.log(error)
        }
    }

    static postJob = async (req, res) => {
        try {
            // console.log(req.body)
            const { role } = req.userdata;
            if (role == "Job Seeker")
                res.status(400).json({
                    status: "failed",
                    message: "Job Seeker not allowed to access this resourse"
                });
            const {
                title,
                description,
                category,
                country,
                city,
                location,
                fixedSalary,
                salaryFrom,
                salaryTo,
            } = req.body
            // console.log(req.body)

            if (
                !title ||
                !description ||
                !category ||
                !country ||
                !city ||
                !location
            ) {
                res.status(400).json({
                    status: "failed",
                    message: "please provide full job details"
                })
            }

            // if ((!salaryFrom || !salaryTo || !fixedSalary)) {
            //     res.status(400).json({
            //         status: "failed",
            //         message: "Please either provied fixed salary or ranged"
            //     })
            // }

            const postedBy = req.userdata._id;
            //console.log(req.userdata)
            const job = await JobModel.create({
                title,
                description,
                category,
                country,
                city,
                location,
                fixedSalary,
                salaryFrom,
                salaryTo,
                postedBy
            })
            res.status(200).json({
                success: true,
                message: "Job Posted Sucessfully",
                job
            })
        } catch (error) {
            console.log(error)
        }
    }

    static getMyJobs = async(req,res) =>{
        try {
            const {role} = req.userdata;
            if(role == "Job Seeker"){
                res.status(400).json({
                    status: "failed",
                    message: "Job Seeker not allowed to access this resource"
                })
            }
            const myJobs = await JobModel.find({ postedBy: req.userdata._id})
            res.status(200).json({
                success: true,
                myJobs,
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    static updateJob = async(req,res)=>{
        try {
            const {role} = req.userdata;
        if(role == "Job Seeker"){
            res.status(400).json({
                status:"failed",
                message:"Job Seeker is not allowed to access this resource"
            })
        }
        //req.params id me bhai id uth ke aayegi jisse change krna hai
        const {id} = req.params;
        // console.log(id)
        let job = await JobModel.findById(id);
        // console.log(job)
        if(!job){
            res.status(400).json({
                status:"failed",
                message: "OOPS! Job not found"
            })
        }
       // console.log(req.body)
        job = await JobModel.findByIdAndUpdate(id, req.body,{
            new:true,
            runValidators:true,
            useFindAndModify: false,
        })
        res.status(200).json({
            success:true,
            message:"Job Updated"
        })
        } catch (error) {
            console.log(error)
        }
    }

    static deleteJob = async(req,res)=>{
        try {
            const {role} = req.userdata
            if(role == "Job Seeker"){
                res.status(400).json({
                    status:"failed",
                    message:"Job Seeker is not allowed to access this resource"
                })
            }
            await JobModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success:true,
                message: "Job Deleted"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleJob = async(req,res)=>{
        try {
            const {id} = req.params;
            let job = await JobModel.findById(id);
            if(!job){
                res.status(400).json({
                    status:"failed",
                    message:"OOPS! Job not found"
                })
            }
            res.status(200).json({
                success:true,
                job
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = JobController; 