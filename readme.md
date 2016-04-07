# requirebin

create programs in the browser using modules from NPM

[![js-standard-style](https://raw.githubusercontent.com/feross/standard/master/badge.png)](https://github.com/feross/standard)

[![Build Status](https://travis-ci.org/danleavitt0/requirebin.svg?branch=master)](https://travis-ci.org/danleavitt0/requirebin)


## getting it to run locally

by default `config.js` is set to use `http://wzrd.in` as the browserify-cdn endpoint

### set up gatekeeper (only if you want to publish gists in dev mode)

1. make a new github oauth application and set the app URL and callback URL to `http://localhost:5000`
2. [follow these instructions](https://github.com/prose/gatekeeper#setup-your-gatekeeper) to install and start gatekeeper on port 9999

### edit `config.js` to point to your endpoints

```
npm install
npm run dev
open http://localhost:5000
```

## license

BSD
