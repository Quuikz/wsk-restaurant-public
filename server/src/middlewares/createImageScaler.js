'use strict';

//imports
import sharp from 'sharp';



/**
 * Middleware factory.
 * The middleware creates image from file if specified in request.file
 * Sets path to file to request.body.image
 * Saves images to outputPath directory with a _image suffix
 * @param width width of output image
 * @param height height of output image
 * @param outputPath path to uploads directory
 * @param suffix string added to filename
 * @param fileType image file type 'png' / 'jpg'
 * @return {(function(*, *, *): Promise<void>)|*}
 * Returns a middleware that resizes images to resolution specified in arguments.
 */

const createImageScaler = (width, height, outputPath, suffix, fileType) => {
   return async (req, res, next) => {
       try {
        //if no file
        if (!req.file) {
            console.log('No file uploaded');
            next();
            return;
        }

        //if file
        console.log('File uploaded: ',req.file.path);
        const inputName = req.file.filename;
        const outputName = inputName + suffix +'.' + fileType;
        const imagePath = outputPath +'/' + outputName;
        console.log('image path', imagePath);

        //add image name to request
        req.body.image = inputName + suffix +'.' + fileType;

        //function sharp(sharp.SharpInput, sharp.SharpOptions)
        await sharp(req.file.path)
            .resize(width, height)
            .toFormat(fileType)
            .toFile(imagePath)
            .then(
                (outputInfo) => {
                    console.log('image created');
                    console.log(outputInfo);
                },
                (error) => {
                    console.log('error resizing image');
                    console.log(error);
                }
            );

        next();

       } catch (error) {
           console.log('error in imageScaler')
           console.log(error);
           next();
       }
    };
}

export default createImageScaler ;
