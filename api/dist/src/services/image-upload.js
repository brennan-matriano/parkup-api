const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID
});
const s3 = new aws.S3({
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    Bucket: 'parkup-filestore'
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};
const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: 'parkup-filestore',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "testing", contentType: file.mimetype.slice(5) });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
const singleUpload = upload.single('image');
module.exports = upload;
