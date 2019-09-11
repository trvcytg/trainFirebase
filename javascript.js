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

$(`#submitButton`).click(function(event) {
  event.preventDefault();
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

    newDiv = $(`<tr><th scope="row" class="nameData">${newPost.name}</th>
        <td scope="row" class="trainDestination">${newPost.destination}</td>
        <td class="trainFrequency">${newPost.frequency}</td>
        <td class="nextTrain">change to NextArrivalTime</td>
        <td class="minAway">change to MinutesUntilNextTrain</td></tr>`);
    $(`.trainPull`).prepend(newDiv);
  });
});

