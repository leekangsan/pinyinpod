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
 * version  : 7
 * updated  : 2015-10-12
 * license  : http://unlicense.org/ The Unlicense
 * git      : https://github.com/pffy/pinyinpod
 *
 */
var fs = require('fs');
var Pinyinbase = require('./obj/node-pinyinbase.js');

var pb = new Pinyinbase();

var timestamp = Date.now();
var prefix = 'vocab-cmn-';

var opts = {
  encoding: 'utf-8'
};

var outfile_defaultfile = 'pinyinbase-outfile-' + timestamp + '.js';
var outfile_jsonfile = 'pb.json';
var outfile_pbjsfile = 'pb.js';
var outfile_cedictfile = 'pb-cedict-ts-u8.txt';

var infiledir = './pinyinbase/';
var outfiledir = './dist/';
var outfilepath = outfiledir + outfile_defaultfile;

var output = '';
var idxarr = [];

// flags
var verboseFlag = false;
var outfileJsonFlag = false;
var outfilePbjsFlag = false;
var outfileCedictFlag = false;
var testFlag = false;

// arrays
var allfiles = [];
var files = [];

// check for dist folder
if(!fs.existsSync(outfiledir)) {
  fs.mkdirSync(outfiledir);
}

// processing command line arguments
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    switch(val) {
      case '--verbose':
      case '-v':
        // shows steps and stuff
        verboseFlag = true;
        printUpdates('Verbose mode toggled.');
        break;
      case '--pbjs':
        outfilePbjsFlag = true;
        printUpdates('Outfile name set to: ' + outfile_pbjsfile);
        break;
      case '--jsonfile':
        // output json data file
        outfileJsonFlag = true;
        printUpdates('Outfile name set to: ' + outfile_jsonfile);
        break;
      case '--cedict':
        // output cedict dictionary file
        outfileCedictFlag = true;
        printUpdates('Outfile name set to: ' + outfile_cedictfile);
        break;
      default:
        // nothing to add
        break;
    }
  }
});

allfiles = fs.readdirSync(infiledir);
files = allfiles.filter(isValidFilename);

if(!files.length) {

  printUpdates('No valid files found.');
  printUpdates('Exiting...');

  process.exit(1); // exit
}

var contents = '';
printUpdates('Loading files...');

for(var i in files) {

  filepath = infiledir + files[i];

  printUpdates('');
  printUpdates('Loading ' + filepath + ' ...');

  contents = fs.readFileSync('' + filepath, opts);

  printUpdates('');
  printUpdates('... done.');

  if(!contents) {
    printUpdates('');
    printUpdates(filepath + ' is empty. Moving file...');
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
    printUpdates('Building source-line-key: ' + sourcelinekey + ': ' + lines[x]);

    var entry = '' + pb.setInput(lines[x], files[i]);
    printUpdates('Reading entry: ' + lines[x]);

    idxarr.push(entry);
    printUpdates('Done with ' + filepath + ' ...');

  }

  if(!hasEntries) {
    printUpdates('No entries found. Moving along...');
  }

  printUpdates('');
}

printUpdates('... done with files.');
printUpdates('Saving pinyinbase JSON file to ' + outfilepath + '...');

// default (always prints)
output = 'var IdxCustomPinyinBase = [\n' + idxarr.join(',\n') + '\n];';
fs.writeFileSync(outfilepath, output);

// --pbjs
if(outfilePbjsFlag) {
  outfilepath = outfiledir + outfile_pbjsfile;
  output = 'var IdxCustomPinyinBase = [\n' + idxarr.join(',\n') + '\n];';
  fs.writeFileSync(outfilepath, output);
}

// --jsonfile
if(outfileJsonFlag) {
  outfilepath = outfiledir + outfile_jsonfile;
  output = '[\n' + idxarr.join(',\n') + '\n]';
  fs.writeFileSync(outfilepath, output);
}

// --cedict
if(outfileCedictFlag) {
  outfilepath = outfiledir + outfile_cedictfile;
  output = exportAsCedict();
  fs.writeFileSync(outfilepath, '' + output);
}


printUpdates('');
printUpdates('Done.');

printUpdates('');
printUpdates('Total entries added: ' + idxarr.length);

printUpdates('');
printUpdates('Exiting...');

printUpdates('');

// all good things
process.exit(0);


// helper functions
// ----------------

function isValidFilename(item) {
  item = '' + item;

  if(item.substring(0, prefix.length) === prefix) {
    return true;
  }

  return false;
}

function printUpdates(str) {
  if(verboseFlag) {
    console.log(str);
  }
}

function exportAsCedict() {
  var cedict = '';

  printUpdates('Exporting as CEDICT file ... ');

  idx = JSON.parse( '[' + idxarr + ']' );

  idx.sort(sortByPbash);

  function sortByPbash(a,b){
    if(a.pbash > b.pbash) {
      return 1;
    }

    if(a.pbash < b.pbash) {
      return -1;
    }

    return 0;
  }

  var lines = [];
  var entry = '';

  for(var i in idx) {
    entry = idx[i]['t'] + ' ' + idx[i]['s']
      + ' [' + idx[i]['p'] + ']' + ' /' + idx[i]['d'] + '/';
    lines.push(entry);

    printUpdates('Added to CEDICT export ... ' + entry);
  }

  cedict = '' + lines.join('\n');
  cedict = '' + getComments() + '\n' + cedict.trim();

  printUpdates('');
  printUpdates('...done.');
  return cedict;
}

function getComments() {
  return [
    '# Your Custom CEDICT-formatted dictionary.',
    '#',
    '# Compiled by Pinyinpod.',
    '# https://github.com/pffy/pinyinpod/',
    '#',
    '# Powered by Pinyinbase.',
    '# https://github.com/pffy/pinyinbase',
    '#'
  ].join('\n');
}
