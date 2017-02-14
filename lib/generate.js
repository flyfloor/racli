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
    
    let {name, description, homepage} = packageJson
    let text = generateReadMe({ name, description, homepage })
    fs.writeFileSync(packagePath + 'README.md', text,'utf8')
    console.log('done.')

    fs.writeFileSync(packagePath + '.gitignore', config.gitignore, 'utf-8')
}

function generateReadMe({name, description, homepage}){
    name = name || config.projectName
    description = description || config.description

    let text = `# ${name}\n\n### ${description}`
    if (homepage) {
        text = `${text} [home page](${homepage})`
    }
    return text
}