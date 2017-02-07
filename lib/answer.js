const inquirer = require('inquirer')


module.exports = (questions, cb) => {
    inquirer.prompt(questions).then(answers => {
        cb(answers)
    })
}
