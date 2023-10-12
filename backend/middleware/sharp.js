const sharp = require('sharp');

const OptimizeImg = (req, res, next) => {
    try {
    if(req.file) {
        console.log(req.file.path)
        sharp(req.file.path)
            .webp({ quality: 80 })
            .resize({ height: 80 })
            .toFile(req.file.path.replace(/\.jpeg|\.jpg|\.png/g, "_") + "thumbnail.webp")
    }
    next()  
    } catch (error) {
        res.status(500).json({ error })
}
}
module.exports = OptimizeImg;
