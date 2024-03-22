// twitterController.js
const TwitterModel = require("../Model/twitterModel");
const { v4: uuidv4 } = require("uuid");  //Importing uuidv4 for generating unique id for tweet

class TwitterController {
  constructor() {
    this.twitterModel = new TwitterModel();
  }

  async createTweet(text) {
    try {
      const uniqueText = `${text} ${uuidv4()}`; //Appending for unique identifier
      await this.twitterModel.tweet(uniqueText);
      return uniqueText;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TwitterController;
