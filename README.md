![alt tag](https://raw.githubusercontent.com/PBRT/findCat/master/find-cat.png)

#FIND YOUR CAT
Little node js software for simulating owners and cat try for find each others in the hell of TFL ;)

##Installation
Simply fetch this repository and run ```node run.js {NUMBER_OF_CATS_AND_OWNERS}``` where ```{NUMBER_OF_CATS_AND_OWNERS}```is an positive integer.

There is no dependencies, only for launching tests with Chai, Mocha, Underscore and for linting (eslint). Not needed if you only want to run it.

## Note
- I didn't used any external dependencies (ImmutableJS, underscore) for keeping the software as simple as possible.
- The approach is functionnal. There is a main model of the app, modified by pure functions for preventing unexpected mutations and prevent board effects.
- It's a REDUX-kind of architecture (actions modifying stores updated in reducers).
-Thanks [XMISSION](https://user.xmission.com/~emailbox/ascii_cats.htm) for the ASCII Art ;)
