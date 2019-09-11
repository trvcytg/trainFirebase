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
