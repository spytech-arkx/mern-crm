module.exports = (url) => {
  if (/companies/.test(url)) return 'company';
  if (/tasks/.test(url)) return 'task';
  if (/contacts/.test(url)) return 'contact';
  if (/deals/.test(url)) return 'deal';
  if (/login/.test(url)) return 'login';
  if (/users/.test(url)) return 'user';
  throw new Error('Invalid type');
};
