// Store
var model = require('./model/model.js');

// Actions
var modelActions = require('./actions/model.js');

// Initial State
var appModel = {
  stations: [],
  connections: [],
  actors: [],
};

var actorNumber = 0;


// Init model and check
function init() {
  actorNumber = process.argv[2];

  if (!process.argv[2]) {
    console.log('Please pass the value of OWNER/CAT you want to release in London as first parameter.');
    console.log('Example: node app.js 10');
    process.exit(1);
  }

  // Init Model
  appModel = model(modelActions.initModel(actorNumber), appModel);

};


// Iterations
function run() {

  var iterator = 0;
  var condition = true;

  // Initialize the app
  init();

  // Run
  while(condition) {

    // First do the actor moves and then update the stations/connections/actors
    appModel = model(modelActions.updateModel(), model(modelActions.moveModel(), appModel));
    iterator ++;

    // Check the condition
    condition = ((iterator < 100000) && (appModel.actors.catFound < actorNumber));

    // Write the execution percentage
    process.stdout.write((iterator/1000).toFixed(2) + '%\r');
  }


  // Statistics
  console.log('\n\n');
  console.log('Total number of cats: ' + actorNumber);
  console.log('Number of cats found: ' + appModel.actors.catFound);
  console.log('Average number of movements required to find a cat: ' + parseInt(iterator/actorNumber));
  console.log('\n');

  const topFiveStations = appModel.stations
    .sort((first, second) => first.visited > second.visited ? -1 : first.visited < second.visited ? 1 : 0)
    .filter((station, index) => index < 5)
    .reduce((prev, item, index) =>
      prev + (index + 1) + ': ' + item.name + ' (Number of visits: ' + item.visited + ')' +'\n',
      'TOP FIVE VISITED STATIONS \n');

  console.log(topFiveStations);
};

// Display ASCII Art and run the program
require('child_process').exec('cat ascii-art', (error, stdout) => {
  console.log('\n\n');
  console.log(stdout);
  run();
});

