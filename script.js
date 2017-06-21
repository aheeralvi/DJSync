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

function startVideo(Videoid, startTime) {
    var currentTime = (new Date).getTime(); //toTimeString().slice(0, 8);
    var videoLink = ("http://www.youtube.com/embed/" + Videoid + "?start=" + startTime + "&autoplay=1&controls=0&showinfo=1&disablekb=1")
        // alert(videoLink);
    document.getElementById('player').src = videoLink;

    firebase.database().ref('VideoStates').set({
        startTimeStamp: currentTime,
        videoUniqueID: Videoid
    });

    return;
}

startVideo("typiQaelXD4", "0");

function pullVideoData() {
    var currentTime = (new Date).getTime(); //toTimeString().slice(0, 8);
    // var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref("/VideoStates/").once('value').then(function(snapshot) {
        var timeVideoStarted = snapshot.val().startTimeStamp;
        var playingVideoId = snapshot.val().videoUniqueID;
        var difTimes = Math.ceil((currentTime - timeVideoStarted) / (1000));
        console.log(difTimes);
        document.getElementById("player").src = "http://www.youtube.com/embed/" + playingVideoId + "?start=" + difTimes + "&autoplay=1&controls=0&showinfo=1&disablekb=1"

    });

}