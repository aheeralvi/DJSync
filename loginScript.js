// Initialize Firebase
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
//firebase.initializeApp(config);


// sign in stuff
const txtemail = document.getElementById('txtemail');
const txtpassword = document.getElementById('txtpassword');
const signup = document.getElementById('signup');
const signin = document.getElementById('signin');
const logout = document.getElementById('logout');

logout.addEventListener('click', e => {
    firebase.auth().signOut();
});

//add sign in event
signin.addEventListener('click', e => {
    //get email and password
    const email = txtemail.value;
    const password = txtpassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.catch(e => console.log(e.message));
});

//add sign up event
signup.addEventListener('click', e => {
    //get email and password
    const email = txtemail.value;
    const password = txtpassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
});

//add realtime authentication listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        //logout.style.display = 'inline-block'
        var user = firebase.auth().currentUser;
        window.location.href = "index.html";
    } else {
        console.log('not logged in');
        //logout.style.display = 'none'
    }
});