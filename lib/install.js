const fs = require('fs')
require('shelljs/global')

module.exports = pathname => {
    cd(`${process.cwd()}/${pathname}`)
    exec(`npm install`)
}