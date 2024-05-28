const { createUploadthing } = require("uploadthing/express");
const { logger } = require("../utils/logger");

const f = createUploadthing();

const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 20,
    },
  }).onUploadComplete((data) => {
    logger.log("info", "upload completed", data);
  }),
};

module.exports = uploadRouter;
