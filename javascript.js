// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyClu67DVDZFdKt0MGp8Fd4TlZM8WR1-MHk",
  authDomain: "projectevergreen-e6084.firebaseapp.com",
  databaseURL: "https://projectevergreen-e6084.firebaseio.com",
  projectId: "projectevergreen-e6084",
  storageBucket: "projectevergreen-e6084.appspot.com"
};
// Initialize Firebase
firebase.initializeApp(config);
const database = firebase.database();

//Check for information to push to table on Firebase upon page load
database.ref().once("value", function(snapshot) {
  if (snapshot.exists()) {
    $(`.trainPull`).empty();
    database.ref().on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      console.log("***From Initial Pull***");
      console.log(`Train Name: ${newPost.name} to ${newPost.destination}`);
      console.log(" ");
      //Convert firstTrain to guarenteed past date
      let firstTrainConverted = moment(newPost.firstTrain, "HH:mm").subtract(
        1,
        "years"
      );
      // Difference between firstTrain and now
      let timeDifference = moment().diff(
        moment(firstTrainConverted),
        "minutes"
      );
      // Finds the Remainder time between last arrival and now
      let timeRemainder = timeDifference % newPost.frequency;
      // Minute Until Train by subtracting remainder found above from the frequency in minutes
      let minutesUntilNextTrain = newPost.frequency - timeRemainder;
      // Time next train is scheduled to arrive
      let nextTrain = moment().add(minutesUntilNextTrain, "minutes");
      // Converts Time to 'xx:xx xm' format
      let nextTrainConverted = moment(nextTrain).format("hh:mm a");
      //  Create html elements to add information to table
      newDiv = $(`
        <tr>
          <th scope="row" class="nameData">${newPost.name}</th>
          <td scope="row" class="trainDestination">${newPost.destination}</td>
          <td class="trainFrequency">${newPost.frequency}</td>
          <td class="nextTrain">${nextTrainConverted}</td>
          <td class="minAway">${minutesUntilNextTrain}</td>
        </tr>
        `);
      $(`.trainPull`).prepend(newDiv);
    });
  }
});

// Adds user input to Firebase application and pulls all stored information into the proper
// receptacle -- ".trainPull" on clicking submit button
$(`#submitButton`).click(function(event) {
  event.preventDefault();
  const trainName = $(`#trainName`)
    .val()
    .trim();
  const destination = $(`#destination`)
    .val()
    .trim();
  const firstTrain = $(`#firstTrain`)
    .val()
    .trim();
  const trainFrequency = $(`#frequency`)
    .val()
    .trim();
  database.ref().push({
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: trainFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  // Empty table element
  $(`.trainPull`).empty();
  // Pull information from FireBase
  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    console.log(`Train Name: ${newPost.name} to ${newPost.destination}`);
    console.log(" ");
    //Convert firstTrain to guarenteed past date
    let firstTrainConverted = moment(newPost.firstTrain, "HH:mm").subtract(
      1,
      "years"
    );
    // Difference between firstTrain and now
    let timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
    // Finds the Remainder time between last arrival and now
    let timeRemainder = timeDifference % newPost.frequency;
    // Minute Until Train by subtracting remainder found above from the frequency in minutes
    let minutesUntilNextTrain = newPost.frequency - timeRemainder;
    // Time next train is scheduled to arrive
    let nextTrain = moment().add(minutesUntilNextTrain, "minutes");
    // Converts Time to 'xx:xx xm' format
    let nextTrainConverted = moment(nextTrain).format("hh:mm a");
    //  Create html elements to add information to table
    newDiv = $(`
    <tr>
      <th scope="row" class="nameData">${newPost.name}</th>
      <td scope="row" class="trainDestination">${newPost.destination}</td>
      <td class="trainFrequency">${newPost.frequency}</td>
      <td class="nextTrain">${nextTrainConverted}</td>
      <td class="minAway">${minutesUntilNextTrain}</td>
    </tr>
    `);
    $(`.trainPull`).prepend(newDiv);
  });
});

// Update the table every **1** second
setInterval(function() {
  database.ref().once("value", function(snapshot) {
    if (snapshot.exists()) {
      $(`.trainPull`).empty();
      database.ref().on("child_added", function(snapshot, prevChildKey) {
        var newPost = snapshot.val();
        //Convert firstTrain to guarenteed past date
        let firstTrainConverted = moment(newPost.firstTrain, "HH:mm").subtract(
          1,
          "years"
        );
        // Difference between firstTrain and now
        let timeDifference = moment().diff(
          moment(firstTrainConverted),
          "minutes"
        );
        // Finds the Remainder time between last arrival and now
        let timeRemainder = timeDifference % newPost.frequency;
        // Minute Until Train by subtracting remainder found above from the frequency in minutes
        let minutesUntilNextTrain = newPost.frequency - timeRemainder;
        // Time next train is scheduled to arrive
        let nextTrain = moment().add(minutesUntilNextTrain, "minutes");
        // Converts Time to 'xx:xx xm' format
        let nextTrainConverted = moment(nextTrain).format("hh:mm a");
        //  Create html elements to add information to table
        newDiv = $(`
        <tr>
          <th scope="row" class="nameData">${newPost.name}</th>
          <td scope="row" class="trainDestination">${newPost.destination}</td>
          <td class="trainFrequency">${newPost.frequency}</td>
          <td class="nextTrain">${nextTrainConverted}</td>
          <td class="minAway">${minutesUntilNextTrain}</td>
        </tr>
        `);
        $(`.trainPull`).prepend(newDiv);
      });
    }
  });
}, 30000);
