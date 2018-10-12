'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://192.168.9.17:9999"',
    // BASE_API: '"https://idsc.biztest.top"'
});
