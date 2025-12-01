'use strict';

//imports
import sharp from 'sharp';

import dotenv from "dotenv";
dotenv.config({path: '../../../.env'});


/**
 * Middleware factory.
 * The middleware creates image from file if specified in request.file
 * Sets path to file to request.file.imagePath
 * Saves images to outputPath directory with a _image suffix
 * @param width width of output image
 * @param height height of output image
 * @param outputPath path to uploads directory
 * @return {(function(*, *, *): Promise<void>)|*}
 * Returns a middleware that resizes images to resolution specified in arguments.
 */

const createImageUploader = (width, height, outputPath) => {
   return async (req, res, next) => {
        //if no file
        if (!req.file) {
            console.log('No file uploaded');
            next();
            return;
        }

        //if file
        console.log(req.file.path);
        const inputName = req.file.filename;
        const imagePath = outputPath + inputName + '_image';
        console.log('image path', imagePath);

        //add path to request
        req.file.imagePath = imagePath;

        //function sharp(sharp.SharpInput, sharp.SharpOptions)
        await sharp(req.file.path)
            .resize(width, height)
            .toFile(imagePath)
            .then(
                (outputInfo) => {
                    console.log('thumbnail created');
                    console.log(outputInfo);
                },
                (error) => {
                    console.log('error resizing image');
                    console.log(error);
                }
            );

        next();
    };
}

export { createImageUploader };