module.exports = function() {
    const arguments = {}
    let Error = '';
    const argv = require('minimist')(process.argv.slice(2));
    if (!argv.hasOwnProperty('a') && !argv.hasOwnProperty('action')) {
        Error += 'action (a) '
    } 
    if (!argv.hasOwnProperty('s') && !argv.hasOwnProperty('shift')) {
        Error += 'shift (s)'
    }
    if (Error) {
        Error = `Required Arguments: ${Error}`
        process.stderr.write(Error)
        process.exit(1)
    }
    arguments.action = argv.a || argv.action;
    arguments.shift = (argv.s == 0 || argv.shift == 0) ? 0 : argv.s || argv.shift;
    arguments.input = argv.i || argv.input;
    arguments.output = argv.o || argv.output;
    return arguments;
}