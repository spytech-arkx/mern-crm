const { logger } = require('../utils/logger');

module.exports = (url) => {
  if (/companies/.test(url)) return 'company';
  if (/tasks/.test(url)) return 'task';
  if (/contacts/.test(url)) return 'contact';
  if (/deals/.test(url)) return 'deal';
  if (/login/.test(url)) return 'login';
  if (/users/.test(url)) return 'user';
  if (/leads/.test(url)) return 'lead';
  logger.log('error', "grave: Couldn't parse type from url");
  throw new Error('Invalid type');
};
