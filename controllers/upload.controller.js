const multer = require('multer');

module.exports.uploadImage = multer({ storage: multer.diskStorage({
    destination: function (request, image, next) {
        next(null, './public/images');
    },
    filename: function (request, image, next) {
        if(! (image.mimetype == 'image/jpeg' || image.mimetype == 'image/png') )
            return next(new Error('this is not an image'), null);
            next(null, image.originalname);
        // next(null, Date.now()+'.jpeg');
    }
    })
});
module.exports.saveImage = (req, res, next) => {
    // console.log(req.file, req.body);
    if(!req.file){
        return res.status(500).json('Faild to upload image');
    } 
    return res.status(200).json({image: req.file.filename});
}