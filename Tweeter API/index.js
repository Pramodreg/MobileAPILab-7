// app.js

const express = require("express");
const TwitterController = require("./Controller/twitterController");
const { v4: uuidv4 } = require("uuid");  //Importing uuidv4 for generating unique id for tweet


const app = express();
const PORT = 800;

const twitterController = new TwitterController();

// Handle the route for creating a tweet
app.get("/tweet", async (req, res) => {
  try {
    const uniqueText = `${uuidv4()}`; //Appending for unique identifier
    const tweetResult = await twitterController.createTweet(`Second tweet is created ${uniqueText}`);
    res.send(tweetResult);
  } catch (error) {
    res.status(500).send("Error creating tweet");
  }
});

// Start your server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
