/**
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

/**
 * name     : pod.js
 * version  : 1
 * updated  : 2015-08-31
 * license  : http://unlicense.org/ The Unlicense
 * git      : https://github.com/pffy/pinyinpod
 *
 */
var fs = require('fs');
var Pinyinbase = require('./obj/node-pinyinbase.js');

var pb = new Pinyinbase();


var timestamp = Date.now();
var prefix = 'vocab-cmn-';
var outfile = 'pinyinbase-outfile-' + timestamp + '.js';
var opts = { encoding: 'utf-8' };
var filedir = './pinyinbase/';

var output = '';
var idxarr = [];
var testFlag = false;

var allfiles = [];
var files = [];

// processing command line arguments
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    switch(val) {
      case '--test':
        testFlag = true;
        console.log('test flag toggled.');
        // todo: toggle more output formats
        break;
      default:
        // nothing to add
        break;
    }
  }
});


allfiles = fs.readdirSync(filedir);
files = allfiles.filter(isValidFilename);
console.log(files);

if(!files.length) {
  console.log('No valid files found.');
  console.log('Exiting...');
  process.exit(1); // exit
}

var contents = '';
console.log('loading files..');

for(var i in files) {

  filepath = filedir + files[i];
  console.log('');

  console.log('loading ' + filepath + ' ...');
  contents = fs.readFileSync('' + filepath, opts);
  console.log('..done.');

  if(!contents) {
    console.log(filepath + ' is empty. Moving file...');
    continue;
  }

  var lines = contents.split('\n');
  var hasEntries = false;

  for(var x in lines) {

    // skip the comment lines
    if(lines[x].charCodeAt(0) === 35) {
      continue;
    }

    hasEntries = true;

    var sourcelinekey = files[i] + '-' + x;
    console.log('source-line-key: ' + sourcelinekey + ': ' + lines[x]);

    var entry = '' + pb.setInput(lines[x], files[i]);

    idxarr.push(entry);
    console.log('done with ' + filepath + ' ...');
  }

  if(!hasEntries) {
   console.log('No entries found. Moving along...');
  }

  console.log('');
}

console.log('..done with files.');
//console.log(idxarr);

console.log('saving pinyinbase file ' + outfile + '...');
fs.writeFileSync(outfile,
  'var IdxCustomPinyinBase = [\n' + idxarr.join(',\n') + '\n];');
console.log('done.');

console.log('');
console.log('exiting...');


// helpers

function isValidFilename(item) {
  item = '' + item;
  if(item.substring(0, prefix.length) === prefix) {
    return true;
  }
  return false;
}

