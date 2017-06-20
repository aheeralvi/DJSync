function startVideo(Videoid, startTime) {
    var videoLink = ("http://www.youtube.com/embed/" + Videoid + "?start=" + startTime + "&autoplay=1&controls=0&showinfo=1&disablekb=1")
        // alert(videoLink);
    document.getElementById('player').src = videoLink;
    return;
}

startVideo("vW4tyQ5XD_Q", "60");


function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
}