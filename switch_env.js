const fse = require('node-fs-extra')
const ENV = process.env.APP_ENV || 'development'

fse.copySync('./webpack.' + ENV + '.config.js', './webpack.config.js')
fse.copySync('./src/config/aws-config.' + ENV + '.js', './src/config/index.js')