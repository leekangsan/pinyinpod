# pinyinpod
Compiles glossaries to Pinyinbase JSON files. Requires [Node.js][nodejs_page].


### Quick Start

**Install Node.js with a package manager.**
+ [Learn more.][gh_getnode]
+ On Mac? `$ brew install node`

**Clone this repo.**
+ `$ git clone https://github.com/pffy/pinyinpod`

**Need to update repo?**
+ In `pinyinpod` repo root, type: `$ git submodule update --remote --recursive`

**Build a new Pinyinbase.**
+ From the `pinyinpod` repo root directory, type `$ node pod.js`
+ Outfile (pinyinbase) appears in the `dist` folder.


### Command Line Parameters

  + `node pod.js`
    + Outputs a JavaScript file with a Pinyinbase object.
  	+ Pinyinbase object is called `IdxCustomPinyinBase`.
  	+ You can search this object.
  	+ Outfile name is `pinyinbase-outfile-{unix-timestamp}.js`.

  + `node pod.js --jsonfile`
    + Outputs a raw [JSON][json_home] file.
    + You can [parse the JSON][json_parse] file contents in JavaScript.
    + You can [decode the JSON][json_decode] file contents in PHP.
    + You can [process the JSON][json_android] file contents in Android.
  	+ Outfile name is `pb.json`. Overwrites file, if exists.

  + `node pod.js --pbjs`
    + Outputs a JavaScript file with a Pinyinbase object.
    + Pinyinbase object is called `IdxCustomPinyinBase`.
    + You can search this object.
  	+ Outfile name is `pb.js`. Overwrites file, if exists.

  + `node pod.js --verbose`
  	+ Verbose mode. Too much information.

  + Exempli Gratia...
  	+ `node pod.js --verbose --pbjs`
  	  + verbose mode toggled
  	  + outfile name is `pb.js`


### Slow Down, Turbo

> **NOTE:** Please keep in mind that the PRODUCT is [PINYINBASE][gh_pinyinbase] -- not PINYINPOD -- and certainly not any simple demo that may be included for your reference. So, please do not expect fancy, advanced dictionary management tools. For now, please expect a simple compile of dictionary source files to a JSON file, then a simple demo of that JSON file in use. Feel free to build your own dictionary clients, converters, and exporters. Thank you.

### Compiling CC-CEDICT

**Using a CC-CEDICT dictioanry source file is possible, but never recommended for [several reasons][gh_casestudy].**

If you really need to use CC-CEDICT dictionary data (e.g., as a customer deliverable), you should rename the dictionary file from `cedict_ts.u8` to something like `vocab-cmn-cedict-data.txt` (anything with the `vocab-cmn-` prefix will do); then, move it to the `pinyinbase` folder.

**The Pinyinbase schema is pinyin-optimized for JSON or NoSQL search.** However, you may be looking for something elese.

An alternative to the Pinyinbase schema is **[PFFYDICT][gh_pffydict]** schema, which is pinyin-optimized for relational database search. So, are you using SQLite? MySQL? MariaDB? Then, try out PFFYDICT:

  + [PFFYDICT Dictionary Schema][gh_pffydict]
    + SQLite
      + https://github.com/pffy/php-cedict2sqlite (Build)
      + https://github.com/pffy/java-pffydict-sqlite (Query)
    + MariaDB/MySQL
      + https://github.com/pffy/php-cedict2mysql (Build) 
      + https://github.com/pffy/java-pffydict-mysql (Query)



[gh_pffydict]: https://github.com/pffy/pffydict
[gh_getnode]: https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager
[nodejs_page]: https://nodejs.org/en/download/
[gh_pinyinbase]: https://github.com/pffy/pinyinbase
[gh_casestudy]: https://github.com/pffy/pinyinbase#case-studies
[json_home]: http://www.json.org/
[json_decode]: http://php.net/manual/en/function.json-decode.php
[json_parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[json_java]: https://github.com/douglascrockford/JSON-java
[json_api]: http://jsonapi.org/
[json_android]: http://developer.android.com/reference/org/json/JSONObject.html
