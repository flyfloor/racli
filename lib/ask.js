const inquirer = require('inquirer')

module.exports = function (questions, cb) {
    inquirer.prompt(questions).then(answers => {
        cb(answers)
    })
}
