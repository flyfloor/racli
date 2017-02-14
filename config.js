module.exports = {
    questions: [
        {
            type: 'input',
            name: 'version',
            message: 'project version',
            validate: function(input){
                return /^([0-9]{1,3}\.){2}[0-9]{1,3}$/.test(input)
            },
            default: '0.0.1'
        }, {
            type: 'input',
            name: 'author',
            message: 'author'
        }, {
            type: 'input',
            name: 'description',
            message: 'description'
        }, {
            type: 'input',
            name: 'homepage',
            message: 'project home page(e.g. https://www.google.com)'
        }, {
            type: 'input',
            name: 'keywords',
            message: 'keywords(e.g. react git)',
            default: 'react',
        }
    ],
    username: 'jerryshew',
    repo: 'react-boilerplate',
    gitignore: '.DS_Store\nnode_modules\n/temp\n/tmp\n.log',
    description: 'Content is automatically generated',
    projectName: 'Hello App',
}