import express from "express";
import multer from "multer";


/**
 * Middleware factory.
 * Retruns a Multer based middleware that uploads request.file to the path given as a parameter.
 * File has to be uploaded in request.file. Only one file is allowed.
 * @param uploadPath path to upload directory
 * @return {*}
 */
const createMulterUploader = (uploadPath) => {

    //multer storage settins
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath)
        },
        filename: function (req, file, cb) {
            const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, prefix + '-' + file.originalname)
        }
    });

    //get multer with settings
    const multerUpload = multer({  storage: storage });

    //return single file up
    return multerUpload.single('file')

}

export default createMulterUploader;