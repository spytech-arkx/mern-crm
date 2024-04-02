const path = require('path');

const typeMapping = {
  '/api/companies': 'company',
  '/api/tasks': 'task',
  '/api/users': 'user',
  '/api/contacts': 'contact',
  '/api/deals': 'deal',
};

module.exports = (url) => {
  const dir = path.dirname(url);
  return typeMapping[dir];
};
