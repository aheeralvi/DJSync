// Initialize Firebase if not already initialized
var config = {
    apiKey: "AIzaSyAH7CQ-JuB5KFJqFGrQXIF_NxMp-glz6PY",
    authDomain: "music-sync-8212d.firebaseapp.com",
    databaseURL: "https://music-sync-8212d.firebaseio.com",
    projectId: "music-sync-8212d",
    storageBucket: "music-sync-8212d.appspot.com",
    messagingSenderId: "317967865570"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}



// obtain username, the signin and logout buttons
// not all pages may contain each element
const txtemail = document.getElementById('txtemail');
const signin = document.getElementById('signin');
const logout = document.getElementById('logout');

// add event listener for logout
logout.addEventListener('click', e => {
    firebase.auth().signOut();
});

//add event listener for login
signin.addEventListener('click', e => {

    const auth = firebase.auth();
    //sign in
    const promise = auth.signInAnonymously().catch(function(error) {
        console.log(error.message);
    })
});

// realtime listener that waits for authentication state to change
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        //logout.style.display = 'inline-block'
        var user = firebase.auth().currentUser;
        window.location.href = "home.html";
    } else {
        console.log("Signin Failed");
    }
});