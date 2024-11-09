const multer = require('multer');
const {v4 : uuidv4} = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

//creating a middleware
const fileUpload = multer({
    limit: 500000, //500kb
    storage: multer.diskStorage({
        //configuration for path
        destination: (req,file,cb)=>{
            cb(null, 'uploads/images')
        },
        //configuration for filename
        filename: (req,file,cb)=>{
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null,uuidv4()+'.'+ext)
        }
    }),
    //to validate that we are not getting a invalid file 
    //adding wrong file should not be possible
    fileFilter: (req,file,cb)=>{
        const isValid = !!MIME_TYPE_MAP[file.mimetype]; //!!means converting to true or false
        let error = isValid ? null: new Error('Invalid mime type');
        cb(error, isValid);
    }
})

//export the middleware
module.exports = fileUpload;