const expressJWT = require("express-jwt");

const isSignedIn = expressJWT({
  secret: "Shhh",
  userProperty: "auth",
});

module.exports = { isSignedIn };
