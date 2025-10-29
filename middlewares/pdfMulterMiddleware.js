//import multer
const multer = require('multer')

const storage = multer.diskStorage({
    //path to store the file
    destination:(req,file,callback)=>{
        callback(null,'./pdfUploads')
    },
    filename:(req,file,callback)=>{
        const fName = `resume-${file.originalname}`
        callback(null,fName)
    }
})

const fileFilter = (req,file,callback)=>{
    //accept only pdf
    if(file.mimetype == 'application/pdf')
    {
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error('Accepts only PDF files...!'))
    }
}

//create config
const pdfMulterConfig = multer({
    storage,
    fileFilter
})

module.exports = pdfMulterConfig