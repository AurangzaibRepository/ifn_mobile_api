const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');
const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

/*
function upload(folder) {
    const storage = multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName = `${file.fieldname}-${Date.now()}${ext}`;
        req.fileName = fileName;
        cb(null, `${folder}/${fileName}`);
      }
    });
  
    return multer({ storage });
  }  
*/

function upload(folder = '') {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Constructs the directory path: 'public/images' or 'public/images/<folder>'
      const uploadPath = path.join('public', 'images', folder);

      // Create the directory if it doesn't already exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${file.fieldname}-${Date.now()}${ext}`;
      
      // Keep attaching the fileName to req if your existing routes rely on it
      req.fileName = fileName; 

      cb(null, fileName);
    }
  });

  return multer({ storage });
}

exports.upload = upload;