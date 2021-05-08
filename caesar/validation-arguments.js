module.exports = function() {
    const arguments = {}
    let Error = '';
    const argv = require('minimist')(process.argv.slice(2));
    if (!argv.hasOwnProperty('a') && !argv.hasOwnProperty('action')) {
        Error += 'action (a) is required argument\n'
    } 
    if (!argv.hasOwnProperty('s') && !argv.hasOwnProperty('shift')) {
        Error += 'shift (s) is required argument\n'
    }

    arguments.action = argv.a || argv.action;
    arguments.shift = (argv.s == 0 || argv.shift == 0) ? 0 : argv.s || argv.shift;
    arguments.input = argv.i || argv.input;
    arguments.output = argv.o || argv.output;

    if (typeof arguments.shift !== 'number') {
        Error += 'arguments shift (s) should be integer number\n'
    }
    if (arguments.action !== 'encode' && arguments.action !== 'decode') {
        Error += 'argument action (a) should be string "encode" or "decode" \n'
    }
    if (Error) {
        process.stderr.write(Error)
        process.exit(1)
    }
    return arguments;
}