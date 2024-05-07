const jwt = require("jsonwebtoken");
const url = require("url");
require("dotenv").config();

exports.issueToken = (payload, options, callback) =>
  jwt.sign(payload, process.env.SECRET_KEY, options, callback);

exports.verifyToken = (token, options, callback) =>
  jwt.verify(token, process.env.SECRET_KEY, options, callback);

exports.extractfromUrlQueryParameter = (request) => {
  let token = null;
  const parsedUrl = url.parse(request.url, true);
  if (parsedUrl.query && Object.hasOwnProperty.call(parsedUrl.query, "token")) {
    token = parsedUrl.query.token;
  }
  return token;
};

exports.extractFromAuthHeaderWithScheme = (request) => {
  let token = null;
  if (request.headers.authentication) {
    const authParams = this.parse(request.headers.authentication);
    console.log(authParams);
    if (authParams && authParams.scheme.toLowerCase() === "bearer") {
      token = authParams.value;
    }
  }
  return token;
};

exports.parse = (authHeader) => {
  if (typeof authHeader !== "string") return null;
  const schemaSpaceToken = authHeader.match(/^(Bearer)\s(\S+\.\S+\.\S+)$/);
  console.log(schemaSpaceToken)
  return (
    schemaSpaceToken && {
      scheme: schemaSpaceToken[1],
      value: schemaSpaceToken[2],
    }
  );
};
