const fs = require('fs')
const config = require('../config')

module.exports = (pathName, options) => {
    let packagePath = `${process.cwd()}/${pathName}/`
    let packageJson = require(packagePath + 'package.json')

    Object.keys(options).map(key => {
        packageJson[key] = options[key]
    })
    // generate package.json
    console.log('create new package.json file...')
    fs.writeFileSync(packagePath + 'package.json', JSON.stringify(packageJson, null, 4),'utf8')
    console.log('done.')
    fs.writeFileSync(packagePath + '.gitignore', config.gitignore, 'utf-8')
}