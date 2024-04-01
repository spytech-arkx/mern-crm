// A helper function to avoid duplicate code in controllers,
// The typical CRUD erros are enumerable :
// - E11000 Dupe
// - CastError: in case validation fails for some reason (ValidObjectId)
// - ValidationError : same, (ValidBodyData)
// - Not found : handled using bulkWrite result count! etc...

function handleError(error, response) {
  switch (error.name) {
    case 'CastError':
      return response.status(400).json({
        type: 'CastError',
        message: 'Invalid data format.',
        error,
      });

    case 'ValidationError':
      return response.status(400).json({
        type: 'ValidationError',
        message: 'Validation failed:',
        errors: error.errors.map((err) => err.message),
      });

    case 'MongoError':
      if (error.code === 11000) {
        return response.status(400).json({
          type: 'DuplicateKeyError',
          message: 'Duplicate key error: This field must be unique.',
          error,
        });
      }
      // Handle other MongoWriteError cases (e.g., validation errors on the server)
      return response.status(400).json({
        type: 'MongoWriteError',
        message: 'Write operation failed.',
        error,
      });

    case 'MongoServerSelectionError':
      return response.status(503).json({
        type: 'DatabaseError',
        message: 'Service Unavailable: Database error occurred.',
        error,
      });

    default:
      // Handle unexpected errors
      return response.status(500).json({
        type: 'UnknownError',
        message: 'An unknown error occurred.',
        error,
      });
  }
}

module.exports = handleError;
