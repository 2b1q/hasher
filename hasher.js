// dependencies
const crypto = require('crypto'),
      fs = require('fs');
const file = process.argv[2];

// colorize console
const c = {
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  white: "\x1b[37m"
};
// Usage
const usage = (ok) => {
  const algs = ()=> console.log(`${c.white}hash algorithms: ${c.yellow}'sha1', 'md5', 'sha256', 'sha512',...${c.white}\ndefault '${c.yellow}md5${c.white}'`)
  const fileNotPassed = ()=> {
    console.log(`\n${c.red}File not passed\n\n${c.white}Usage: ${c.green}$ ${c.magenta}node hasher.js ${c.green}file ${c.yellow}algorithm`);
    algs()
    process.exit(0)
  }
  typeof ok === 'undefined' ? fileNotPassed() : algs()
}
// if file passed make digest
if(typeof file === 'undefined') usage()
else {
  let algorithm = typeof process.argv[3] === 'undefined' ? 'md5' : process.argv[3];
  // use hashType sync err handler
  try {
    var hashSum = crypto.createHash(algorithm);
  } catch (e) {
    console.log(`\n${c.red}Bad hash algorithm\n${c.white}`);
    usage(true)
    process.exit(1)
  }
  // read file
  const input = fs.ReadStream(file);
  // read file error handler
  input.on('error', err => {
    console.error('Bad file!\n',err);
    process.exit(1)
  })
  // Updating hashSum with file content
  input.on('data', data =>  hashSum.update(data))
  // making digest
  input.on('end', ()=> {
    console.log(`${c.white}File "${c.yellow}${file}${c.white}"\nhashType: "${c.yellow}${algorithm}${c.white}"\nHash: ${c.yellow}${hashSum.digest('hex')}${c.white}`)
    usage(true)
  })
}
