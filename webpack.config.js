const merge = require('webpack-merge');
const Environments = require('./webpack/envs');

const configPathPrefix = './webpack/webpack.config';

module.exports = (env) => {
  const commonConfig = require(`${configPathPrefix}.common`);
  const envConfig = env === Environments.Production
    ? require(`${configPathPrefix}.prod`)
    : require(`${configPathPrefix}.dev`);

  return merge(commonConfig, envConfig, { mode: env });
};
