// twitterModel.js
const { TwitterApi } = require("twitter-api-v2");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");  //Importing uuidv4 for generating unique id for tweet

class TwitterModel {
  constructor() {
    this.client = new TwitterApi({
      appKey: "Olg9EoIksle3XeCZUxfLgvEX2",
      appSecret: "e0Le1SJFIUi7ywcPNljQq2c9pIfRSrCgeC6H3geCqBNKR4ygUE",
      accessToken: "1768703939480793088-JIw3XFqVyZHVBkuKCM2Vnxld0fatl7",
      accessSecret: "oLjbvTmjqrNnmTPvJPj7qo3nyGLke4Or9wgJ2iy20EcHK",
      bearerToken: "AAAAAAAAAAAAAAAAAAAAALE7swEAAAAAM0lAB2dwE7JP%2FmMF0IDnsI8bAlg%3DTerdRFdxj23nC8uZeR2IO6Herey6bqdIK6QYg0jBOyu2LoNS9z",
    });

    this.rwClient = this.client.readWrite;
  }

  async tweet(text) {
    try {
      const uniqueText = `${text} - ${uuidv4()}`; //Appending for unique identifier
      await this.rwClient.v2.tweet(
        uniqueText
      );
      console.log("Tweet created successfully:", uniqueText);
      return { message: "Tweet created", uniqueText };
    } catch (error) {
      console.error("Error creating tweet:", error);
      throw error;
    }
  }

}

module.exports = TwitterModel;
