const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your_cloud_name', // can fill in later with actual credentials
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

const path = require('path');

const filePath = 'path_to_your_image.jpg'; // Replace with the path to user image file or any other media types

cloudinary.uploader.upload(filePath, { tags: 'sample_upload' })
  .then((result) => {
    console.log('Upload success:');
    console.log(result);
  })
  .catch((error) => {
    console.error('Upload error:');
    console.error(error);
  });
