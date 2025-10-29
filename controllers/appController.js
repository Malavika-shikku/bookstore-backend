const applications = require('../model/appModel');




//add application
exports.addApplicationController = async(req,res)=>{
    const{fullname, jobTitle, qualification,email,
    phone,coverLetter}=req.body

    const resume = req.file.filename
    console.log(resume);

    try{
        const existingApplication = await applications.findOne({jobTitle,email})

        if(existingApplication){
            res.status(400).json("Already applied to this post....")
        }else{
            const newApplication = new applications({
                fullname,jobTitle,qualification,email,phone,coverLetter,resume
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    }catch(err){
        res.status(500).json(err)
    }
    

}
//get all application controller
exports.getAllPPlicationController =async(req,res)=>{
    try{
        const allApplications = await applications.find()
        res.status(200).json(allApplications)

    }catch(err){
        res.status(500).json(err)
    }
}