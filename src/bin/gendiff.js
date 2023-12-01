#!/usr/bin/env node
import program from 'commander'
import gendDiff from 'index.js'
program
.version('1.0.0')
.arguments('<firstConfig>, <secondConfig>')
.option('-f,--format[type]','Output format', 'stylish')
.description('Utility for finding differences between two data structures')
.action((firstConfig,secondConfig) => {
    console.log(gendDiff(firstConfig,secondConfig,program.format))
})
parse(process.argv)
