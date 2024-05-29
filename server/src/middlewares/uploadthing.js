/* eslint-disable function-paren-newline */
const { createUploadthing } = require("uploadthing/express");
const { logger } = require("../utils/logger");

const f = createUploadthing();

const uploadRouter = {
  multiUploader: f([
    "pdf",
    "image",
    "text",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  ])
    .onUploadError((err) =>
      logger.log("error", "[uploadthing] Error uploading data", err),
    )
    .onUploadComplete((data) => {
      logger.log("info", "[uploadthing] upload completed", data);
    }),
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 20,
    },
  })
    .onUploadError((err) =>
      logger.log("error", "[uploadthing] Error uploading data", err),
    )
    .onUploadComplete((data) => {
      logger.log("info", "[uploadthing] upload completed", data);
    }),
};

module.exports = uploadRouter;
