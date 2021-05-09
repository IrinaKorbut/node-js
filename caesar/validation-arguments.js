const { program } = require("commander");

program
  .option("-s, --shift <number>", "shift")
  .option("-i, --input <path>", "input path")
  .option("-o, --output <path>", "output path")
  .option("-a, --action <type>", "encode / decode");
program.parse(process.argv);

module.exports = function () {
  const arguments = {};
  let Error = "";
  const argv = program.opts();

  if (!argv.hasOwnProperty("a") && !argv.hasOwnProperty("action")) {
    Error += "action (a) is required argument\n";
  }
  if (!argv.hasOwnProperty("s") && !argv.hasOwnProperty("shift")) {
    Error += "shift (s) is required argument\n";
  }

  arguments.action = argv.a || argv.action;
  arguments.shift = argv.s == 0 || argv.shift == 0 ? 0 : argv.s || argv.shift;
  arguments.shift = Number(arguments.shift)
    ? Number(arguments.shift)
    : undefined;
  arguments.input = argv.i || argv.input;
  arguments.output = argv.o || argv.output;

  if (
    typeof arguments.shift !== "number" ||
    arguments.shift === undefined ||
    arguments.shift % 1 !== 0
  ) {
    Error += "arguments shift (s) should be integer number\n";
  }
  if (arguments.action !== "encode" && arguments.action !== "decode") {
    Error += 'argument action (a) should be string "encode" or "decode" \n';
  }
  if (Error) {
    process.stderr.write(Error);
    process.exit(1);
  }
  return arguments;
};
