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

//startVideo("typiQaelXD4", "0");

function pullVideoData() {
    var currentTime = (new Date).getTime(); //toTimeString().slice(0, 8);
    var roomName = document.getElementById("roomToJoin").value;
    return firebase.database().ref(roomName).once('value').then(function(snapshot) {
        var timeVideoStarted = snapshot.val().startTime;
        var playingVideoId = snapshot.val().videoLink;
        var timeIntoVideo = Math.ceil((currentTime - timeVideoStarted) / (1000));
        sessionStorage.setItem('timeIntoVideo', timeIntoVideo);
        sessionStorage.setItem('playingVideoId', playingVideoId);
        window.location.href = 'index.html'
            //  document.getElementById("player").src = "http://www.youtube.com/embed/" + playingVideoId + "?start=" + difTimes + "&autoplay=1&controls=0&showinfo=1&disablekb=1"
    });

}

function createRoom() {
    var videoID = document.getElementById("videoid").value;
    var roomName = document.getElementById("roomname").value;
    var startTime = (new Date).getTime();
    const promise = firebase.database().ref(roomName).set({
        videoLink: videoID,
        startTime: startTime
    })
    promise.then(function() { window.location.href = 'index.html' }, function() { console.log("fail") });
}

function showBox(elementId) {
    document.getElementById(elementId).style.display = 'block';
}
var playingVideoId = sessionStorage.getItem('playingVideoId');
var timeIntoVideo = sessionStorage.getItem('timeIntoVideo');

function loadVideo() {
    document.getElementById("player").src = "http://www.youtube.com/embed/" + playingVideoId + "?start=" + timeIntoVideo + "&autoplay=1&controls=0&showinfo=1&disablekb=1"
}