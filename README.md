![alt tag](https://raw.githubusercontent.com/PBRT/findCat/master/find-cat.png)

#FIND YOUR CAT
Little node js software for simulating owners and cat try for find each others in the hell of TFL ;)

##Installation
Simply fetch this repository and run ```node run.js {NUMBER_OF_CATS_AND_OWNERS}``` where ```{NUMBER_OF_CATS_AND_OWNERS}```is an positive integer.

There is no dependencies, only for launching tests with Chai, Mocha, Underscore and for linting (eslint). Not needed if you only want to run it.

## Note

- There is no external librairies for keeping the software simple and light for the user. I think one of the improvements should be the use ImmutableJS for the main model (or underscoreJS at least).

- The architecture of this project is [REDUX-like](https://redux.js.org) where the main model is immutable, updated by pure functions for avoiding mutations, interacting by actions, describing how the model should be updated. The main difference is there is no UI to update. It's an unidirectional data-flow, the model is modified in the run loop only.

- The external librairies used are only for testing purpose and not needed for execute the software (I used Mocha/Chai, Underscore and ESLINT).

- I noticed most of the time cats and owners get blocked and won't find each others after 10% (10000 iterations). One of the improvement should be to log when they're blocked and mark them for avoiding long loop (block detection algorithm with the previous position of owners).

- For running the app, simply clone the project and hit ```node run.js 10``` for 10 owners and cats

- For running the test you'll need the dependencies :```npm install``` ```npm run test```. It will run the tests and the linting.

- Thanks [XMISSION](https://user.xmission.com/~emailbox/ascii_cats.htm) for the ASCII Art ;)
