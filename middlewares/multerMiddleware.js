//import multer
const multer = require('multer')

const storage = multer.diskStorage({
    //path to store the file
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const fName = `image-${file.originalname}`
        callback(null,fName)
    }
})

const fileFilter = (req,file,callback)=>{
    //accept only jpg,png,jpeg
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype==
        'image/jpeg'
    ){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error('Accepts only png,jpg,jpeg files...!'))
    }
}

//create config
const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig