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
 * name     : pinyinbase.js
 * version  : 2
 * updated  : 2015-10-11
 * license  : http://unlicense.org/ The Unlicense
 * git      : https://github.com/pffy/javascript-pinyinbase
 *
 */
module.exports = function() {

  const P_START = '[';
  const P_END = ']';
  const D_SLASH = '/';
  const SINGLE_SPACE = ' ';
  const EMPTY_STRING = '';
  const DEFAULT_SOURCE = 'none';

  var _input,
    _output;

  var _t, _s, _p, _d,
    _pmash, _pbash, _psmash, _phash,
    _dmash, _src;

  // EXPERIMENTAL. and EXPENSIVE.
  // var _dbash;

  function setInputLine(str, src) {
    str = str.trim();
    str = '' + str;

    if(!str) {
      return false;
    }

    _input = str;

    src = src.trim();
    src = '' + src;
    _src = src ? src : DEFAULT_SOURCE;

    convert();
  }

  function convert() {

    // converts input line into JSON string

    var _pos1 = 0,
      _pos2 = 0,
      _pos3 = 0,
      _pos4 = 0,
      _tsarr = [];

    _pos1 = _input.indexOf(P_START) + 1;
    _pos2 = _input.indexOf(P_END);
    _pos3 = _input.indexOf(D_SLASH) + 1;
    _pos4 = _input.lastIndexOf(D_SLASH);

    _tsarr = _input.substring(0,_pos1).split(SINGLE_SPACE);

    // save class vars

    _t = _tsarr[0];
    _s = _tsarr[1];
    _p = _input.substring(_pos1, _pos2);
    _d = _input.substring(_pos3, _pos4);

    _pmash = pmash(_p);
    _pbash = pbash(_p);
    _psmash = psmash(_p);
    _phash = phash(_p);

    // EXPERIMENTAL. and EXPENSIVE.
    // _dbash = dbash(_d); 
    
    _dmash = dmash(_d);

    _output = JSON.stringify({

      t: _t,
      s: _s,
      p: _p,
      d: _d,

      pmash: _pmash,
      pbash: _pbash,
      psmash: _psmash,
      phash: _phash,

      src: _src,

      // dbash: _dbash,
      dmash: _dmash
    });
  }

  function pmash(str) {
    return alphanum(lower(nospaces(nopunct(str))));
  }

  function pbash(str) {
    return alphaonly(lower(nospaces(nopunct(str))));
  }

  function psmash(str) {
    str = onespace(lower(nopunct(str))); // pre-process

    var arr = [];
    var result = '';

    // split string of words into an array
    arr = str.split(' ');

    // add each initial to the result string
    for(var x in arr) {
      result += '' + arr[x].charAt(0);
    }

    return result;
  }

  function phash(str) {
    return array_unique(pbash(str).split('')).join('');
  }

  function dmash(str) {
    return nopunct(nodigits(nospaces(lower(str))));
  }

  function dbash(str) {
    return nodigits(nodiacritics(str));
  }

  // helpers

  function airtight(str) {
    return str.replace(new RegExp('\\s{1,}', 'gi'), '');
  }

  function array_unique(arr) {
    if((typeof arr === 'object') && arr.length) {

      var obj = {};
      arr.sort();

      for(var x in arr) {
        obj[arr[x]] = 'derp';
      }

      return Object.keys(obj);

    } else {
      return false;
    }
  }

  function alphaonly(str) {
    return str.replace(new RegExp('[^a-z]', 'gi'), '');
  }

  function alphanum(str) {
    return str.replace(new RegExp('[^a-z0-9]', 'gi'), '');
  }

  function asciionly(str) {
    // code solution found here:
    // http://www.catonmat.net/blog/my-favorite-regex/
    return str.replace(new RegExp('[^ -~]', 'gi'), '');
  }

  function lower(str) {
    return str.toLowerCase();
  }

  function noalpha(str) {
    return str.replace(new RegExp('[a-z]', 'gi'), '');
  }

  // EXPERIMENTAL. and EXPENSIVE.
  function nodiacritics(str) {

    str = airtight(lower(str));

    var source = str,
      alphas = [],
      diacritics = [];

    // a very simple range from 'a' to 'z'
    for(var i = 97; i < 123; i++){
      alphas.push(String.fromCharCode(i));
    }

    diacritics = array_unique(noalpha(source).split(''));

    for(var d in diacritics) {
      for(var a in alphas) {

        // compares the diacritics to its canoncial base letters
        // result that equals '0' is a match
        var result = diacritics[d].localeCompare(alphas[a], 'derp', {
          sensitivity: 'base'
        });

        if(!result) {
          str = str.replace(new RegExp(diacritics[d], 'gi'), alphas[a]);
          continue; // found, no need to search further
        }
      }
    }

    // remove punctuation AFTER removing diacritics
    str = nopunct(str);
    str = str.trim();

    return str;
  }

  function nodigits(str) {
    return str.replace(new RegExp('\\d', 'gi'), '');
  }

  function nospaces(str) {
    return str.replace(new RegExp('[^\\S\\n]{1,}', 'gi'), '');
  }

  function nopunct(str) {
    return str.replace(new RegExp('[^\\w\\d\\s]', 'gi'), '');
  }

  function onespace(str) {
    return str.replace(new RegExp('[^\\S\\n]{2,}', 'gi'), ' ');
  }

  return {

    toString: function() {
      return _output;
    },

    getInput: function() {
      return _input;
    },

    setInput: function(str, src) {
      setInputLine(str, src);
      return this;
    }
  };
};
