const fs = require('fs')
const path = require('path')
const { pipeline } = require('stream')

const validationArguments = require('./validation-arguments')
const args = validationArguments()
console.log(args)

const CaesarTransform = require('./transformStream');

const inputFilePath = args.input ? path.resolve(__dirname, args.input) : args.input
const outputFilePath = args.output ? path.resolve(__dirname, args.output) : args.output

let existenceError = '';

if (inputFilePath) {
    try {
        fs.accessSync(inputFilePath, fs.constants.F_OK);
    } catch (err) {
        existenceError += args.input
    }
}

if (outputFilePath) {
    try {
        fs.accessSync(outputFilePath, fs.constants.F_OK);
    } catch (err) {
        existenceError += existenceError ? `, ${args.output}` : args.output
    }
}

if (existenceError) {
    existenceError = `No such file in directory (${existenceError}). Please enter another filepath/filename.`
    process.stderr.write(existenceError)
    process.exit(1)
}

const fileRead = inputFilePath ? fs.createReadStream(inputFilePath) : process.stdin
const caesarTransform = new CaesarTransform();
const fileWriter = outputFilePath ? fs.createWriteStream(outputFilePath, { flags: 'a' }) : process.stdout

fileWriter.on('finish', () => {
    process.exit(0);
});

pipeline(
    fileRead,
    caesarTransform,
    fileWriter,
    (error) => {
        if (error) {
            process.stderr.write('Something go wrong. Please, try again =)\n Error: ', error)
            process.exit(1)
        }
    }
)