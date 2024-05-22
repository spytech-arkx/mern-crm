// A helper function to avoid duplicate code in controllers,
// It's mainly experimental since I'm just learning the type of codes models and
// The typical CRUD erros are enumerable :
// - E11000 Dupe
// - CastError: in case validation fails for some reason (ValidObjectId)
// - ValidationError : same, (ValidBodyData)
// - Not found : handled using bulkWrite result count! etc...

const { logger } = require("../utils/logger");

function handleError(error, response) {
  logger.log("error", "Error caught by handler: ", error);
  if (!Array.isArray(error)) {
    switch (error.name) {
      case "CastError":
        return response.status(400).json({
          type: "CastError",
          message: "Invalid data format.",
          error,
        });

      case "ValidationError":
        return response.status(400).json({
          type: "ValidationError",
          message: "Validation failed :/",
          error,
        });

      case "MongoBulkWriteError":
        if (error.code === 11000) {
          return response.status(400).json({
            type: "DuplicateKeyError",
            message: "Duplicate key error: This field must be unique.",
            error,
          });
        }
        // Handle other MongoWriteError cases (e.g., validation errors on the server)
        return response.status(400).json({
          type: "MongoWriteError",
          message: "Write operation failed.",
          error,
        });

      case "MongoServerError":
        if (error.code === 11000) {
          return response.status(409).json({
            type: "DuplicateKeyError",
            message: "Duplicate key error: This field must be unique.",
            error,
          });
        }
        // Handle other MongoWriteError cases (e.g., validation errors on the server)
        return response.status(400).json({
          type: "MongoWriteError",
          message: "Write operation failed.",
          error,
        });

      case "MongoServerSelectionError":
        return response.status(503).json({
          type: "DatabaseError",
          message: "Service Unavailable: Database error occurred.",
          error,
        });

      case "TypeError":
        return response.status(500).json({
          type: "TypeError",
          message: "Internal Server Error",
          error,
        });

      case "TokenExpiredError":
        logger.log("error", "Error verifiying api_key:", error);
        return response.status(403).json({ msg: "Invalid credentials." });

      case "JsonWebTokenError":
        logger.log("error", "Error verifiying api_key:", error);
        return response.status(400).json({ msg: "Invalid credentials." });

      default:
        // Handle unexpected errors
        return response.status(500).json({
          type: "UnknownError",
          message: "Internal Server Error.",
          error,
        });
    }
  }

  const errors = error.details.map((detail) => ({
    field: detail.path.join("."),
    message: detail.message,
  }));

  return response.status(400).json({
    type: "ValidationError",
    errors,
  });
}

module.exports = handleError;
