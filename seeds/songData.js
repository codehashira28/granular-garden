const { Feed } = require("../models");

const songData = [
  {
    title: "Blackout",
    audioFile: "/audio/blackout.mp3", 
    coverImage: "/images/blackoutcover.jpg", 
    creator: "Turnstile",
    dateCreated:"August 2, 2023",
  },
  {
    title: "Hurricane",
    audioFile: "/audio/hurricane.mp3", 
    coverImage: "/images/hurricanecover.jpeg", 
    creator: "Koastle",
    dateCreated:"August 2, 2023",
  },
  {
    title: "Something in the Orange",
    audioFile: "/audio/somethingintheorange.mp3", 
    coverImage: "/images/somethingintheorangecover.png", 
    creator: "Zach Bryan",
    dateCreated:"August 2, 2023",
  },
];

const seedFeed = () => Feed.bulkCreate(songData);

module.exports = seedFeed;