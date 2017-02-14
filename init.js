#!/usr/bin/env node --harmony

const inquirer = require('inquirer')
const program = require('commander')
const download = require('download-git-repo')
const fs = require('fs')
const co = require('co')

const ask = require('./lib/ask')
const generate = require('./lib/generate')

let config = require('./config')
let questions = config.questions

program
    .version(require('./package').version)
    .arguments('<pName>')
    .option('-u --username <username>', 'github user login')
    .option('-r --repo <repo>', 'github user repository')
    .action(pName => {
        let { username, repo } = program
        // check project if exist
        if (/(\/|\\|\s)+/.test(pName)) {
            return console.error("project name can't have '\', '/' or emty space ")
        }
        if (ifExistProject(pName)) {
            overrideExist( () => downloadNdGenerate({ username, repo, pName, questions }) )
        } else {
            // download boilerplate
            downloadNdGenerate({ username, repo, pName, questions })
        }
    })
    .parse(process.argv)


// private

function ifExistProject(name) {
    return fs.existsSync(`${process.cwd()}/${name}`)
}

// if override exist

function overrideExist(cb){
    let _question = {
        type: 'confirm',
        name: 'override',
        message: 'project already exist, override?',
    }

    let promtMsg = ask(_question, _as => {
        if (_as.override) {
            cb()
        }
    })
}

// 
function downloadNdGenerate({ username, repo, pName, questions}) {
    downloadTemplate({ username, repo }, pName)
        .then(res => {
            // questions
            ask(questions, answers => {
                answers.name = pName
                // generate package.json
                generate(pName, answers)
            })
        })
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