#!/usr/bin/env node --harmony

const inquirer = require('inquirer')
const program = require('commander')
const download = require('download-git-repo')
const fs = require('fs')

const answer = require('./lib/answer')
const generate = require('./lib/generate')

let config = require('./config')
let questions = config.questions

program
    .version(require('./package').version)
    .arguments('<pName>')
    .option('-u --username <username>', 'github user login')
    .option('-r --repo <repo>', 'github user repository')
    .action(pName => {
        // check project if exist
        if (/(\/|\\|\s)+/.test(pName)) {
            return console.error("project name can't have '\', '/' or emty space ")
        }
        if (ifExistProject(pName)) {
            console.error('project already exist')
            // return 
        }

        // download boilerplate
        downloadTemplate({ username: program.username, repo: program.repo }, pName)
            .then(res => {
                // questions
                answer(questions, answers => {
                    answers.name = pName
                    // generate package.json
                    generate(pName, answers)
                })
            })

        
    })
    .parse(process.argv)


// private

function ifExistProject(name) {
    return fs.existsSync(`${process.cwd()}/${name}`)
}

function downloadTemplate({ username=config.username, repo=config.repo }, pathName) {
    console.log('downloading from', username, '/', repo, '...')
    return new Promise((resolve, reject) => {
        download(`${username}/${repo}`, pathName, function(err){
            if (err) return console.error(err)
            console.log('downloading done.')
            resolve(true)
        })
    });
}