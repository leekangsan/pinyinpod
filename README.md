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

### `pod.js`

  + `$ node pod.js`
    + Outputs a JavaScript file with a Pinyinbase object.
  	+ Pinyinbase object is called `IdxCustomPinyinBase`.
  	+ You can search this object.
    + Entries sorted alphabetically by pinyin.
  	+ Outfile name is `pinyinbase-outfile-{unix-timestamp}.js`.
  	+ Outfile created in `dist` folder.

### `--clean`

  + `$ node pod.js --clean`
  + Cleans `dist` outfile folder.
    + Deletes all files in `dist` folder.
    + Deletes `dist` folder.
    + Creates fresh `dist` folder with a new README file.
  + Outputs a JavaScript file with a Pinyinbase object.
  + Pinyinbase object is called `IdxCustomPinyinBase`.
  + You can search this object.
  + Entries sorted alphabetically by pinyin.
  + Outfile name is `pinyinbase-outfile-{unix-timestamp}.js`.
  + Outfile created in `dist` folder.

### `--cedictfile`

  + `$ node pod.js --cedictfile`
  + Outputs a [CEDICT-formatted][cedict_syntax] dictionary file.
    + Works with legacy Chinese dictionary and learning software.
    + You can distribute your own custom-branded dictionary in a single file.
  + Entries sorted alphabetically by pinyin.
  + Outfile name is `pb-cedict-ts-u8.txt`. Overwrites file, if exists.
  + Outfile created in `dist` folder.

### `--jsonfile`

  + `$ node pod.js --jsonfile`
  + Outputs a raw [JSON][json_home] file.
    + You can [parse the JSON][json_parse] file contents in JavaScript.
    + You can [decode the JSON][json_decode] file contents in PHP.
    + You can [process the JSON][json_android] file contents in Android.
  + Entries sorted alphabetically by pinyin.
	+ Outfile name is `pb.json`. Overwrites file, if exists.
  + Outfile created in `dist` folder.

### `--pbjs`

  + `$ node pod.js --pbjs`
  + Outputs a JavaScript file with a Pinyinbase object.
  + Pinyinbase object is called `IdxCustomPinyinBase`.
  + You can search this object.
  + Entries sorted alphabetically by pinyin.
	+ Outfile name is `pb.js`. Overwrites file, if exists.
  + Outfile created in `dist` folder.

### `--verbose`

  + `$ node pod.js --verbose`
  	+ Verbose mode. Too much information.

#### Command Line Examples

+ `node pod.js --verbose --pbjs`
  + Generates default JavaScript library.
  + Generates JavaScript library named `pb.js`.
  + Displays dictionary compile info.

+ `node pod.js --cedictfile --jsonfile`
  + Generates default JavaScript library.
  + Generates CEDICT export file.
  + Generates JSON export file.
  + Does all this, quietly.

+ `node pod.js --verbose --jsonfile >> foo.txt`
  + Generates default JavaScript library.
  + Appends compile info to a file named `foo.txt`
  + Generates JSON export file.
  + No output to screen.

+ `node pod.js --verbose --cedictfile > log.txt`
  + Generates default JavaScript library.
  + Creates (or overwrites) compile info to a file named `log.txt`
  + Generates CEDICT export file.
  + No output to screen.

### Slow Down, Turbo

> **NOTE:** Please keep in mind that the PRODUCT is [PINYINBASE][gh_pinyinbase] -- not PINYINPOD -- and certainly not any simple demo that may be included for your reference. So, please do not expect fancy, advanced dictionary management tools. For now, please expect a simple compile of dictionary source files to a JSON file, then a simple demo of that JSON file in use. Feel free to build your own dictionary clients, converters, and exporters. Thank you.

### Compiling CC-CEDICT

**Using a CC-CEDICT dictionary source file is possible, but NEVER recommended for [several reasons][gh_casestudy].**

If you really need to use CC-CEDICT dictionary data (e.g., as a customer deliverable), you should rename the dictionary file from `cedict_ts.u8` to something like `vocab-cmn-cedict-data.txt` (anything with the `vocab-cmn-` prefix will do); then, move it to the `pinyinbase` folder.

**The Pinyinbase schema is pinyin-optimized for JSON or NoSQL search.** However, you may be looking for something else.

An alternative to the Pinyinbase schema is **[PFFYDICT][gh_pffydict]** schema, which is pinyin-optimized for relational database search. So, are you using SQLite? MySQL? MariaDB?

Then, try out PFFYDICT:

  + [PFFYDICT Dictionary Schema][gh_pffydict]
    + SQLite
      + https://github.com/pffy/php-cedict2sqlite (Build)
      + https://github.com/pffy/java-pffydict-sqlite (Query)
    + MariaDB/MySQL
      + https://github.com/pffy/php-cedict2mysql (Build)
      + https://github.com/pffy/java-pffydict-mysql (Query)



[cedict_syntax]: http://cc-cedict.org/wiki/format:syntax
[gh_casestudy]: https://github.com/pffy/pinyinbase#case-studies
[gh_getnode]: https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager
[gh_pffydict]: https://github.com/pffy/pffydict
[gh_pinyinbase]: https://github.com/pffy/pinyinbase
[json_android]: http://developer.android.com/reference/org/json/JSONObject.html
[json_api]: http://jsonapi.org/
[json_decode]: http://php.net/manual/en/function.json-decode.php
[json_home]: http://www.json.org/
[json_java]: https://github.com/douglascrockford/JSON-java
[json_parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[nodejs_page]: https://nodejs.org/en/download/
