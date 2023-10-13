const sharp = require('sharp');

const OptimizeImg = async (req, res, next) => {
    try {
    if(req.file) {
        console.log(req.file.path)
        sharp(req.file.path)
            .webp({ quality: 80 })
            .resize({ height: 400 })
            .toFile(req.file.path.replace(/\.jpeg|\.jpg|\.png/g, "_") + "thumbnail.webp")
    }
    next()  
    } catch (err) {
        res.status(500).json({ err })
}
}
module.exports = OptimizeImg;

