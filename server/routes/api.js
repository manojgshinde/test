const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../routes/models/video');

// connect to DB
mongoose.connect('mongodb://localhost:27017/videoplayer', { useNewUrlParser: true }, (err) => {

  if (!err) { console.log('mongoDB connection succesed..!') }
  else {
    console.log('Error in DB connection :' + err)
  }
});


// get all video list

router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos)
  } catch (error) {
    res.json({
      message: error
    })
  }
});



//Get single video
router.get('/videos/:id', function (req, res) {
  console.log("get request for a single video");
  Video.findById(req.params.id)
    .exec(function (err, video) {
      if (err) {
        console.log("Error retriving video");
      } else {
        res.json(video);
      }
    });
});


// post video in the database
router.post('/video', function (req, res) {
  console.log('post a video');

  var newVideo = new Video();

  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function (err, insertedVideo) {
    if (err) {
      console.log('Error saving video');
    } else {
      Res.json(insertedVideo);
    }
  });
});


// video update
router.put('/video/:id', function (req, res) {
  console.log('update a video');
  Video.findByIdAndUpdate(req.params.id,
    {
      $set: { title: req.body.title, url: req.body.url, description: req.body.description }
    },
    {
      new: true
    },
    function (err, updatedVideo) {
      if (err) {
        res.send('Error updating video');
      } else {
        res.json(updatedVideo)
      }
    }

  );
});

router.delete('/video/:id', function (req, res) {
  console.log('deleting video');
  Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
    if (err) {
      res.send('Error deleting video');
    } else {
      res.json(deletedVideo);
    }

  });
});
module.exports = router;

