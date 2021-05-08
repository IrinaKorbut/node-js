const fs = require('fs')
const path = require('path')
const { pipeline } = require('stream')

const validationArguments = require('./validation-arguments')
const args = validationArguments()
// console.log(args)

const CaesarTransform = require('./transformStream');

const inputFilePath = path.resolve(__dirname, args.input)
const outputFilePath = path.resolve(__dirname, args.output)

let existenceError = '';
try {
    fs.accessSync(inputFilePath, fs.constants.F_OK);
} catch (err) {
    existenceError += args.input
}

try {
    fs.accessSync(outputFilePath, fs.constants.F_OK);
} catch (err) {
    existenceError += existenceError ? `, ${args.output}` : args.output
}

if (existenceError) {
    existenceError = `No such file in directory (${existenceError}). Please enter another filepath/filename.`
    process.stderr.write(existenceError)
    process.exit(1)
}

const fileRead = fs.createReadStream(inputFilePath)
const caesarTransform = new CaesarTransform();
const fileWriter = fs.createWriteStream(outputFilePath, { flags: 'a' })

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