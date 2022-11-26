const SocialPost = require("social-post-api"); // Install "npm i social-post-api"
const social = new SocialPost("VJS1K0G-XD74KYV-JAMQ0WW-FZ6TX8P");

const AddPost = async (postContent) => {
  const post = await social
    .post({
      post: postContent,
      platforms: ["facebook"],
    })
    .catch(console.error);
};
module.exports = { AddPost };
