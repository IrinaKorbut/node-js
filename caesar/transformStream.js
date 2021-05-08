const { Transform } = require('stream');

const  moduleEncodeDecode  = require('./encodeDecodeFns')
const { caesarCipher } = moduleEncodeDecode

const validationArguments = require('./validation-arguments')
const args = validationArguments()

module.exports = class CaesarTransform extends Transform {
    constructor(options) {
        super(options)
    }

    _transform(chunk, encoding, callback) {
        const chunkString = chunk.toString();
        const chunkEncodedString = caesarCipher(args.action, args.shift, chunkString);
        this.push(`${chunkEncodedString}\n`)
        return setImmediate(callback);
    }
}
