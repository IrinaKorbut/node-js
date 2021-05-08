const fs = require('fs')
const path = require('path')
const { pipeline } = require('stream')

const validationArguments = require('./validation-arguments')
const args = validationArguments()
console.log(args)

const CaesarTransform = require('./transformStream');

const inputFilePath = path.resolve(__dirname, args.input)
const outputFilePath = path.resolve(__dirname, args.output)

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
            process.stderr.write(error)
            process.exit(1)
        }
    }
)