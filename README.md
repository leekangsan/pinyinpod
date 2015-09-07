# pinyinpod
Compiles glossaries to Pinyinbase JSON files. Requires [Node.js][nodejs_page].


### Quick Start

**Install Node.js with a package manager.**
+ [Learn more.][gh_getnode]
+ On Mac? `$ brew install node`

**Clone this repo.**
+ `$ git clone https://github.com/pffy/pinyinpod`

**Build a new Pinyinbase.**
+ From the `pinyinpod` repo root directory, type `$ node pod.js`
+ Outfile (pinyinbase) appears in the `dist` folder.


### Command Line Parameters

  + `node pod.js`
  	+ Compiles Pinyinbase JSON file.
  	+ Outfile name is `pinyinbase-outfile-{unix-timestamp}.js`.

  + `node pod.js --pbjs`
  	+ Outfile name is `pb.js`. Overwrites file, if exists.

  + `node pod.js --verbose`
  	+ Verbose mode. Too much information.

  + Exempli Gratia...
  	+ `node pod.js --verbose --pbjs`
  	  + verbose mode toggled
  	  + outfile name is `pb.js`


### Slow Down, Turbo

> **NOTE:** Please keep in mind that the PRODUCT is [PINYINBASE][gh_pinyinbase] -- not PINYINPOD -- and certainly not any simple demo that may be included for your reference. So, please do not expect fancy, advanced dictionary management tools. For now, please expect a simple compile of dictionary source files to a JSON file, then a simple demo of that JSON file in use. Feel free to build your own dictionary clients, converters, and exporters. Thank you.


[gh_getnode]: https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager
[nodejs_page]: https://nodejs.org/en/download/
[gh_pinyinbase]: https://github.com/pffy/pinyinbase