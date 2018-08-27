const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = {
  HtmlTemplate: path.resolve(PROJECT_ROOT, 'public/index.html'),
  Source: path.resolve(PROJECT_ROOT, 'src'),
  Build: path.resolve('..', 'dist'),
  Root: PROJECT_ROOT,
};
