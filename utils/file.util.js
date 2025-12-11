const multer = require('multer');
const path = require('path');

function upload(folder) {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `public/images/${folder}`)
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now();
            const ext = path.extname(file.originalname);
            const fileName = file.fieldname + '-' + uniqueSuffix + ext;
            req.fileName = fileName;
            cb(null, fileName);
        }
    });

    return multer({ storage });
}

exports.upload = upload;