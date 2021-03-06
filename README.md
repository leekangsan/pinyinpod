# pinyinpod

+ Requires [Node.js][nodejs_page].
+ Compiles [Pinyinbase glossaries][gh_pinyinbase] to a single JSON file.
+ Sorts all entries by pinyin, alphabetically.
+ (Optionally) Export as raw JSON or CEDICT text files.

### Quick Start

**Install Node.js with a package manager.**
+ [Learn more.][gh_getnode]
+ On Mac? `$ brew install node`

**Clone this repo.**
+ `$ git clone --recursive https://github.com/pffy/pinyinpod`

**Need to update repo?**
+ In `pinyinpod` repo root, type: `$ git submodule update --remote --recursive`

**Ooops! Need to remove a submodule?**
+ [Removing a git submodule][so_deletesub] should be done carefully.

**Build a new Pinyinbase.**
+ From the `pinyinpod` repo root directory, type `$ node pod.js`
+ Outfile (pinyinbase) appears in the `dist` folder.


### Command Line Parameters

### `pod.js`

+ `$ node pod.js`
+ Performs DEFAULT ACTIONS.
  + Entries sorted alphabetically by pinyin.
  + Outputs a JavaScript file with a Pinyinbase object.
  + Outfile name is `pinyinbase-outfile-{unix-timestamp}.js`.
  + Pinyinbase object (an array of [Pinyinbase objects][gh_js_pinyinbase]) is called `IdxCustomPinyinBase`.
  + You can search this object.
  + Outfile created in `dist` folder.

### `--clean`

+ `$ node pod.js --clean`
+ Cleans `dist` outfile folder.
  + Deletes all files in `dist` folder.
  + Deletes `dist` folder.
  + Creates fresh `dist` folder with a new README file.
+ Performs [default actions][gh_podjs].

### `--clean-only`

+ `$ node pod.js --clean-only`
+ Toggles **clean-only mode.**
+ Performs [cleaning actions][gh_clean].
+ Promptly exits when cleaning is done.
  + Does not perform [default actions][gh_podjs].
  + Exports nothing.
  + When used, all other flags (except `--verbose`) are ignored.

### `--cedictfile`

+ `$ node pod.js --cedictfile`
+ Performs [default actions][gh_podjs].
+ Outputs a [CEDICT-formatted][cedict_syntax] dictionary file.
  + Works with legacy Chinese dictionary and learning software.
  + You can distribute your own custom-branded dictionary in a single file.
  + Outfile name is `pb-cedict-ts-u8.txt`. Overwrites file, if exists.
  + Outfile created in `dist` folder.

### `--jsonfile`

+ `$ node pod.js --jsonfile`
+ Performs [default actions][gh_podjs].
+ Outputs a raw [JSON][json_home] file.
  + You can [parse the JSON][json_parse] file contents in JavaScript.
  + You can [decode the JSON][json_decode] file contents in PHP.
  + You can [process the JSON][json_android] file contents in Android.
  + Outfile name is `pb.json`. Overwrites file, if exists.
  + Outfile created in `dist` folder.

### `--pbjs`

+ `$ node pod.js --pbjs`
+ Performs [default actions][gh_podjs].
+ Outputs copy of default file with convenience filename.
  + Outfile name is `pb.js`. Overwrites file, if exists.
  + Outfile created in `dist` folder.

### `--verbose`

+ `$ node pod.js --verbose`
+ Toggles **verbose mode.**
  + Prints compile information to screen.
+ Performs [default actions][gh_podjs].


#### Command Line Examples

+ `$ node pod.js --cedictfile --clean --verbose --jsonfile`
  + Performs [cleaning actions][gh_clean].
  + Performs [default actions][gh_podjs].
  + Exports to CEDICT file.
  + Exports to JSON file.
  + Prints program info to screen.

+ `$ node pod.js --jsonfile --clean-only`
  + Performs [cleaning actions][gh_clean].
  + Does not perform [default actions][gh_podjs].
  + Exports nothing.
  + No output to screen.

+ `$ node pod.js --verbose --clean-only`
  + Performs [cleaning actions][gh_clean].
  + Does not perform [default actions][gh_podjs].
  + Exports nothing.
  + Prints program info to screen.

+ `$ node pod.js --verbose --pbjs`
  + Performs [default actions][gh_podjs].
  + Exports JavaScript library file named `pb.js`.
  + Prints program info to screen.

+ `$ node pod.js --cedictfile --jsonfile`
  + Performs [default actions][gh_podjs].
  + Generates CEDICT export file.
  + Generates JSON export file.
  + No output to screen.

+ `$ node pod.js --verbose --jsonfile >> foo.txt`
  + Performs [default actions][gh_podjs].
  + Generates JSON export file.
  + Appends compile info to a file named `foo.txt`
  + No output to screen.

+ `$ node pod.js --verbose --cedictfile > log.txt`
  + Performs [default actions][gh_podjs].
  + Generates CEDICT export file.
  + Creates (or overwrites) compile info to a file named `log.txt`
  + No output to screen.


### Using Pinyinpod

  + Pinyinpod is [free software][web_freesw] released to the PUBLIC DOMAIN.

> **NOTE:** Please keep in mind that **Pinyinpod** is not the product. The product is [Pinyinbase][gh_pinyinbase]. **Pinyinpod** is an example of the many ways you may compile Pinyinbase glossaries into a single, searchable Pinyinbase JSON document. While this JSON document can be used in solutions, such as Firebase, MongoDB, Cassandra, or HBase (just to name a few NoSQL options), **Pinyinpod** and its output files are simply reference implementations. If you have better solutions, feel free to add them to your version of **Pinyinpod.**

### Git.io Short URL
+ https://git.io/pinyinpod

### Compiling CC-CEDICT

**Using a CC-CEDICT dictionary source file is possible, but NEVER recommended for [several reasons][gh_casestudy].**

If you really need to use CC-CEDICT dictionary data (e.g., as a customer deliverable), you should rename the dictionary file from `cedict_ts.u8` to something like `vocab-cmn-cedict-data.txt` (anything with the `vocab-cmn-` prefix will do); then, move it to the `pinyinbase` folder.

**The [Pinyinbase schema][schema_pb] is pinyin-optimized for JSON or NoSQL search.** However, you may be looking for something else.

An alternative to the Pinyinbase schema is **[PFFYDICT][gh_pffydict]** schema, which is pinyin-optimized for relational database search. So, are you using SQLite? MySQL? MariaDB?

Then, try out PFFYDICT:

  + [PFFYDICT Dictionary Schema][gh_pffydict]
    + SQLite
      + https://github.com/pffy/php-cedict2sqlite (Build)
      + https://github.com/pffy/java-pffydict-sqlite (Query)
    + MariaDB/MySQL
      + https://github.com/pffy/php-cedict2mysql (Build)
      + https://github.com/pffy/java-pffydict-mysql (Query)

[so_deletesub]: http://stackoverflow.com/a/16162000
[web_freesw]: http://www.gnu.org/philosophy/free-sw.en.html
[cedict_syntax]: http://cc-cedict.org/wiki/format:syntax
[gh_casestudy]: https://github.com/pffy/pinyinbase#case-studies
[gh_clean]:https://github.com/pffy/pinyinpod/blob/master/README.md#--clean
[gh_getnode]: https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager
[gh_js_pinyinbase]: https://github.com/pffy/javascript-pinyinbase
[gh_pffydict]: https://github.com/pffy/pffydict
[gh_pinyinbase]: https://github.com/pffy/pinyinbase
[gh_podjs]: https://github.com/pffy/pinyinpod/blob/master/README.md#podjs
[json_android]: http://developer.android.com/reference/org/json/JSONObject.html
[json_api]: http://jsonapi.org/
[json_decode]: http://php.net/manual/en/function.json-decode.php
[json_home]: http://www.json.org/
[json_java]: https://github.com/douglascrockford/JSON-java
[json_parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[nodejs_page]: https://nodejs.org/en/download/
[schema_pb]: https://github.com/pffy/pinyinbase/blob/master/README.md#pinyinbase-schema
