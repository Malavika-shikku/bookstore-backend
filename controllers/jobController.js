const jobs = require('../model/jobModel')

exports.addJobController = async(req,res)=>{
    const{title,location,JType,salary,qualification,experience,description} = req.body
        console.log(title,location,JType,salary,qualification,experience,description);

        try{
            const existingJob = await jobs.findOne({title,location})

            if(existingJob){
                res.status(400).json("job already exist....")
            }else{
                const newJob = new jobs({title,location,JType,salary,qualification,experience,description})
                await newJob.save()
                res.status(200).json(newJob)
            }
        }catch(err){
            res.status(500).json(err)
        }

    
        
    
}

//get all jobs
exports.getAllJobsController = async(req,res)=>{
    const searchKey = req.query.search
    try{
        const allJobs = await jobs.find({title:{$regex:searchKey,$options:'i'}})
        res.status(200).json(allJobs)
    }catch(err){
        res.status(500).json(err)

    }
}

//delete a job
exports.deleteAJobController = async(req,res)=>{
    const {id} = req.params


    try{
        await jobs.findByIdAndDelete({_id:id})
        res.status(200).json("Deleted successfully...")

    }catch(err){
        res.status(500).json(err)
    }
}