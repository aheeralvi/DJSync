function startVideo(Videoid, startTime) {
    var videoLink = ("http://www.youtube.com/embed/" + Videoid + "?start=" + startTime + "&autoplay=1&controls=0&showinfo=1&disablekb=1")
        // alert(videoLink);
    document.getElementById('player').src = videoLink;
    return;
}

startVideo("vW4tyQ5XD_Q", "60");

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
    } else {
        console.log('not logged in');
        logout.style.display = 'none'
    }
});