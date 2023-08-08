const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Feed } = require('../../models');

cloudinary.config({
  cloud_name: 'dkojehsq2', // can fill in later with actual credentials
  api_key: '625644292477375',
  api_secret: 'TF6SX2V1-a3lNr54bN4UYJSwrgI',
});

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/', upload.single('audioFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log("UPLOADING");

  // Upload the audio file to Cloudinary
  cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Error uploading file to Cloudinary' });
      }
      console.log("UPLOADED BY " + req.session.username);

      // Success, return the Cloudinary URL of the uploaded file
      // CREATE TRACK or SONG
      // THEN REDIRECT
        try {
          const dbFeedData = Feed.create({
            title: req.file.originalname.split('.')[0],
            audioFile: result.secure_url, 
            coverImage: "/images/blackcover.png", 
            creator: req.session.username,
            dateCreated:"August 8, 2023",
          });
          console.log("THE USER IS: " + req.session.username);
        } catch (err) {
          console.log(err);
        }
      res.redirect('/feed');
    }
  ).end(req.file.buffer);
});


module.exports = router;