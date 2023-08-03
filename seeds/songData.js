const { Feed } = require("../models");

const songData = [
  {
    title: "Blackout",
    creator: "Turnstile",
    dateCreated:"August 2, 2023",
    audioFile: "/dumbydata/audio/blackout.mp3", 
    coverImage: "/dumbydata/images/blackoutcover.jpg", 
  },
  {
    title: "Hurricane",
    creator: "Koastle",
    dateCreated:"August 2, 2023",
    audioFile: "/dumbydata/audio/hurricane.mp3", 
    coverImage: "/dumbydata/images/hurricanecover.jpg", 
  },
  {
    title: "Something in the Orange",
    creator: "Zach Bryan",
    dateCreated:"August 2, 2023",
    audioFile: "/dumbydata/audio/blackout.mp3", 
    coverImage: "/dumbydata/images/someethingintheorange.jpg", 
  },
];

const seedFeed = () => Feed.bulkCreate(songData);

module.exports = seedFeed;