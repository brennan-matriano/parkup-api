const express = require('express');
const router = express.Router();
const uploadPath = '/upload';

const uploader = require('../../services/image-upload');

const uploadOne = uploader.single('image');


router.post('/image', function(req, res) {
    uploadOne(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
    }

    return res.json({'imageUrl': req.file.location});
  });
});

export default {router, uploadPath}