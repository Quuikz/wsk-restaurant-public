'use strict';

//imports
import sharp from 'sharp';



/**
 * Middleware.
 * Creates thumbnail from file if specified in request.file
 * Sets path to file to request.file.thumbnailPath
 * Saves thumbnails to ./uploads/
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const createThumbnail = async (req, res, next) => {
    //if no file
    if (!req.file) {
        next();
        return;
    }

    //if file
    console.log(req.file.path);
    const inputName = req.file.filename;
    const outputPath = './uploads/'+inputName+'_thumb';
    console.log('thumbnail path', outputPath);

    //add path to request
    req.file.thumbnailPath = outputPath;

    //function sharp(sharp.SharpInput, sharp.SharpOptions)
    await sharp(req.file.path)
        .resize(160, 160)
        .toFile(outputPath)
        .then(
            (output) => {
                console.log('thumbnail created');
                console.log(output);
            },
            (err) => {
                console.log('error resizing image');
                console.log(err);
            }
        );

    next();
};

export default { createThumbnail };