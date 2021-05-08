# Caesar cipher cli

This is a command line application. It encrypts and decrypts text with Caesar cipher. The application encrypts and decrypts only letters of the Latin alphabet. All other characters, including letters from the other languages, numbers, punctuation marks, etc. remain unchanged.

---

## How to install

To install this application you must perform the following steps:
1. Download it from repository.
2. Run the cpmmand line and go to the application folder.
3. Enter the command line "npm install" or "npm i" and wait for the dependency installation process to complete.
4. The application is ready to go!

---

## How to use

After installation completed to start the application, in the folder with the application, enter the following into the command line: "node caesar/caesar [options]", where options are command line parameters that determine the operation of the application (short alias and full name):
* -s, --shift: a shift
* -i, --input: an input file
* -o, --output: an output file
* -a, --action: an action encode/decode


The **action** option can take the values of **encode** and **decode** and indicates what needs to be done with the incoming text: **encrypt** or **decrypt**.

The **shift** option must be a positive integer. It denote a **shift** of letters for encryption and decryption.

**Action** and **shift** options are **mandatory**: if one of then absent, there will be an **error**. **Input** and **output** options must be relative or absolute path to file or even filename if file is in application root folder (**input** is the path to the file from which the text is read; **output** is the path to the file where the text will be written).

If the file on any of the paths **doesn't exist** or the path is **incorrect**, there will be an **error**.

If the **input** and/or **output** options are absent, then **reading** and/or **writing** will be carried out from/to the **command line**. To **interrupt** the process, in this case, press **Ctrl+C**.

---

## Example to use

### Encryption with shorthand names of the options

```terminal
$ node caesar/caesar -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

Before:
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> *empty*

After:
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
 
 ### Decryption with full names of the options

```terminal
$ node caesar/caesar --action decode --shift 7 --input output.txt --output decoded.txt
```

Before:
> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> decoded.txt
> *empty*

After:
> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> decoded.txt
> `This is secret. Message about "_" symbol!`