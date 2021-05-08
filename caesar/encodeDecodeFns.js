function caesarCipher(action, number, string) {
  switch (action) {
    case "encode":
      return encodeDecode(number, string);
      break;
    case "decode":
      return encodeDecode(-number, string);
      break;
    default:
      process.stderr.write('action (a) should be "encode" or "decode"');
      process.exit(1);
  }
}

function encodeDecode(number, string) {
  const shift = number % 26;
  const arrFromString = string.split("");
  const newArr = arrFromString.map((char, index) => {
    const currentCode = string.charCodeAt(index);
    const futureCode = getFutureCode(currentCode, shift);
    return String.fromCharCode(futureCode);
  });
  return newArr.join("");
}

function getFutureCode(currentCode, number) {
  let futureCode = currentCode + number;
  if (currentCode >= 65 && currentCode <= 90) {
    if (futureCode > 90) {
      futureCode = futureCode - 90 + 65 - 1;
    }
    if (futureCode < 65) {
      futureCode = futureCode - 65 + 90 + 1;
    }
    return futureCode;
  }
  if (currentCode >= 97 && currentCode <= 122) {
    if (futureCode > 122) {
      futureCode = futureCode - 122 + 97 - 1;
    }
    if (futureCode < 97) {
      futureCode = futureCode - 97 + 122 + 1;
    }
    return futureCode;
  }
  return currentCode;
}

module.exports.caesarCipher = caesarCipher;