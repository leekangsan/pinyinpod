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
 * version  : 11
 * updated  : 2015-10-16
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
var outfile_readmefile = 'README.md';

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
var cleanOutfileFlag = false;
var testFlag = false;

// arrays
var allfiles = [];
var files = [];

// processing command line arguments
process.argv.forEach(function (val, index, array) {
  if(index > 1) {
    switch(val) {
      case '--verbose':
        // shows compile info
        // TODO: add earlier detection for --verbose flag
        verboseFlag = true;
        printUpdates('Verbose mode toggled.');
        break;
      case '--pbjs':
        outfilePbjsFlag = true;
        printUpdates(outfile_pbjsfile
          + ' JavaScript library filename export toggled.');
        break;
      case '--jsonfile':
        outfileJsonFlag = true;
        printUpdates('JSON file export toggled.');
        break;
      case '--cedict':
      case '--cedictfile':
        outfileCedictFlag = true;
        printUpdates('CEDICT file export toggled.');
        break;
      case '--clean':
        cleanOutfileFlag = true;
        printUpdates('Outfile directory will be cleaned.');
        break;
      default:
        // nothing to add
        break;
    }
  }
});


// check for dist folder
if(!fs.existsSync(outfiledir)) {
  createDistFolder();
} else {

  // --clean
  if(cleanOutfileFlag) {

    var filelist = fs.readdirSync(outfiledir);

    try {
      // delete dist folder contents
      for(var id in filelist) {
        printUpdates('Deleting outfile ... ' + outfiledir + filelist[id]);
        fs.unlinkSync(outfiledir + filelist[id]);
        printUpdates('Done.');
      }

      // delete dist folder
      printUpdates('Deleting folder ... ' + outfiledir);
      fs.rmdirSync(outfiledir);
      printUpdates('Done.');
    } catch (e) {
      printUpdates('ERR: unable to clean outfile directory called ['
        + outfiledir + ']. Try closing open files.');
      printUpdates(e);
    }

    createDistFolder();
  }
}

// begin compiling dictionary data

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
  printUpdates('Done.');

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

printUpdates('');
printUpdates('Sorting pinyin by alpha ...');

var idx = JSON.parse( '[' + idxarr + ']' );
idx.sort(sortByPbash);
var idxString = JSON.stringify(idx);

printUpdates('Done.');

// default (always prints)
printUpdates('Saving pinyinbase JSON file to ' + outfilepath + '...');
output = 'var IdxCustomPinyinBase = ' + idxString + ';';
fs.writeFileSync(outfilepath, output);
printUpdates('Done.');

// --pbjs
if(outfilePbjsFlag) {
  printUpdates('');
  printUpdates('Exporting to JavaScript library file as: ' + outfile_pbjsfile);
  outfilepath = outfiledir + outfile_pbjsfile;
  output = 'var IdxCustomPinyinBase = ' + idxString + ';';
  fs.writeFileSync(outfilepath, output);
  printUpdates('Done.');
}

// --jsonfile
if(outfileJsonFlag) {
  printUpdates('');
  printUpdates('Exporting to raw JSON file as: ' + outfile_jsonfile);
  outfilepath = outfiledir + outfile_jsonfile;
  output = '' + idxString;
  fs.writeFileSync(outfilepath, output);
  printUpdates('Done.');
}

// --cedict
if(outfileCedictFlag) {
  printUpdates('');
  printUpdates('Exporting to CEDICT format dictionary as: ' + outfile_cedictfile);
  outfilepath = outfiledir + outfile_cedictfile;
  output = exportAsCedict();
  fs.writeFileSync(outfilepath, '' + output);
  printUpdates('Done.');
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

// (cheaply) validates file
function isValidFilename(item) {
  item = '' + item;

  if(item.substring(0, prefix.length) === prefix) {
    return true;
  }

  return false;
}

// --verbose
function printUpdates(str) {
  if(verboseFlag) {
    console.log(str);
  }
}

// compare function for sorting idx
function sortByPbash(a,b){
  if(a.pbash > b.pbash) {
    return 1;
  }

  if(a.pbash < b.pbash) {
    return -1;
  }

  return 0;
}

// exports JSON data into CEDICT syntax
function exportAsCedict() {
  var cedict = '';
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

  return cedict;
}

// adds hashtag comments to CEDICT export file
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

// dist README.md
function getDistReadmeContents() {
  return [
    '# dist',
    '',
    'Output files go here.'
  ].join('\n');
}

// create dist folder
function createDistFolder(){
  printUpdates('Creating folder ' + outfiledir + ' ...');
  fs.mkdirSync(outfiledir);
  fs.writeFileSync(outfiledir + outfile_readmefile,
    getDistReadmeContents());
}