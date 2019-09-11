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

// Pull Current Time on Page Loading
let currentTime = moment().format();
console.log("Time of Page Access: " + moment(currentTime).format("hh:mm"));

//Check for information to push to table on Firebase upon page load
database.ref().once("value", function(snapshot) {
  if (snapshot.exists()) {
    $(`.trainPull`).empty();
    database.ref().on("child_added", function(snapshot, prevChildKey) {
      var newPost = snapshot.val();
      console.log("***Initial Data Pulled from Firebase***");
      console.log("Train Name: " + newPost.name);
      console.log("Destination: " + newPost.destination);
      console.log("First Train: " + newPost.firstTrain);
      console.log("Frequency in minutes: " + newPost.frequency);
      console.log("Previous Post ID: " + prevChildKey);
      console.log(`-- - -- --- -- - --`);

      // First Time (pushed back 1 year to make sure it comes before current time)
      let firstTrainConverted = moment(newPost.firstTrain, "HH:mm").subtract(
        1,
        "years"
      );
      console.log(firstTrainConverted);

      // Current Time
      let currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      let diffTime = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      let tRemainder = diffTime % newPost.frequency;
      console.log(tRemainder);

      // Minute Until Train
      let tMinutesTillTrain = newPost.frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      let nextTrain = moment().add(tMinutesTillTrain, "minutes");
      let nextTrainConverted = moment(nextTrain).format("hh:mm a");

      newDiv = $(`<tr><th scope="row" class="nameData">${newPost.name}</th>
        <td scope="row" class="trainDestination">${newPost.destination}</td>
        <td class="trainFrequency">${newPost.frequency}</td>
        <td class="nextTrain">${nextTrainConverted}</td>
        <td class="minAway">${tMinutesTillTrain}</td></tr>`);
      $(`.trainPull`).prepend(newDiv);
    });
  }
});

$(`#submitButton`).click(function(event) {
  event.preventDefault();
  let currentTime = moment().format("HH:mm");
  console.log("Train added at: " + currentTime);
  const trainName = $(`#trainName`)
    .val()
    .trim();
  console.log(trainName);

  const destination = $(`#destination`)
    .val()
    .trim();
  console.log(destination);

  const firstTrain = $(`#firstTrain`)
    .val()
    .trim();
  console.log(firstTrain);

  const trainFrequency = $(`#frequency`)
    .val()
    .trim();
  console.log(trainFrequency);

  database.ref().push({
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: trainFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  $(`.trainPull`).empty();
  database.ref().on("child_added", function(snapshot, prevChildKey) {
    var newPost = snapshot.val();
    console.log("Train Name: " + newPost.name);
    console.log("Destination: " + newPost.destination);
    console.log("First Train: " + newPost.firstTrain);
    console.log("Frequency in minutes: " + newPost.frequency);
    console.log("Previous Post ID: " + prevChildKey);
    console.log(`-- - -- --- -- - --`);

    // First Time (pushed back 1 year to make sure it comes before current time)
    let firstTrainConverted = moment(newPost.firstTrain, "HH:mm").subtract(
      1,
      "years"
    );
    console.log(firstTrainConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    let diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    let tRemainder = diffTime % newPost.frequency;
    console.log(tRemainder);

    // Minute Until Train
    let tMinutesTillTrain = newPost.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    let nextTrainConverted = moment(nextTrain).format("hh:mm a");

    newDiv = $(`<tr><th scope="row" class="nameData">${newPost.name}</th>
        <td scope="row" class="trainDestination">${newPost.destination}</td>
        <td class="trainFrequency">${newPost.frequency}</td>
        <td class="nextTrain">${nextTrainConverted}</td>
        <td class="minAway">${tMinutesTillTrain}</td></tr>`);
    $(`.trainPull`).prepend(newDiv);
  });
});

//Not yet used
function writeTrainSchedule(trainName, destination, firstTrain, frequency) {
  firebase
    .database()
    .ref("/" + trainName)
    .set({
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });
}

// database.ref().once("value", function(snapshot) {
//   var newPost = snapshot.val();
//   // Difference between the times
//   let timeDiff = moment().diff(moment(newPost.firstTrain), "minutes");
//   console.log("Difference in Time: " + timeDiff);

//   // Time apart (remainder)
//   let tRemainder = timeDiff % newPost.frequency;
//   console.log(tRemainder);

//   // Minute Until Train
//   let minTilTrain = newPost.frequency - tRemainder;
//   console.log("Minutes until Next Train: " + minTilTrain);

//   // Next Train
//   let nextTrain = moment().add(minTilTrain, "minutes");
//   console.log("Next Train: " + moment(nextTrain).format("hh:mm"));
// });
