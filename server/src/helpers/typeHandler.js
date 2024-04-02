module.exports = (url) => {
  if (/companies/.test(url)) return 'company';
  if (/tasks/.test(url)) return 'task';
  if (/users/.test(url)) return 'user';
  if (/contacts/.test(url)) return 'contact';
  if (/deals/.test(url)) return 'deal';
  throw new Error('Invalid type');
};
