function startVideo(Videoid, startTime) {
    var currentTime = (new Date).toTimeString().slice(0, 8);
    var videoLink = ("http://www.youtube.com/embed/" + Videoid + "?start=" + startTime + "&autoplay=1&controls=0&showinfo=1&disablekb=1")
        // alert(videoLink);
    document.getElementById('player').src = videoLink;

    firebase.database().ref('VideoStates' + currentTime).set({
        startTimeStamp: currentTime,
        videoUniqueID: Videoid
    });

    return;
}

startVideo("vW4tyQ5XD_Q", "60");


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
        logout.style.display = 'inline-block'
        var user = firebase.auth().currentUser;
        alert(user.uid);
    } else {
        console.log('not logged in');
        logout.style.display = 'none'
    }
});