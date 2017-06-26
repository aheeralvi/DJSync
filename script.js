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

// function pulls data from Firebase and uses session storage to keep it
function pullVideoData() {
    var currentTime = (new Date).getTime(); //toTimeString().slice(0, 8);
    var roomName = document.getElementById("roomToJoin").value;
    sessionStorage.setItem('roomName', roomName);
    return firebase.database().ref(roomName).once('value').then(function(snapshot) {
        var timeVideoStarted = snapshot.val().startTime;
        var playingVideoId = snapshot.val().videoLink;
        var timeIntoVideo = Math.ceil((currentTime - timeVideoStarted) / (1000));
        sessionStorage.setItem('timeIntoVideo', timeIntoVideo);
        sessionStorage.setItem('playingVideoId', playingVideoId);
        window.location.href = 'index.html'
    });

}

// the Sync Room button reloads the video based on what the time should be
function syncRoom() {
    var roomName = sessionStorage.getItem('roomName');
    return firebase.database().ref(roomName).once('value').then(function(snapshot) {

        var currentTime = (new Date).getTime(); //toTimeString().slice(0, 8);

        var timeVideoStarted = snapshot.val().startTime;
        var playingVideoId = snapshot.val().videoLink;
        var timeIntoVideo = Math.ceil((currentTime - timeVideoStarted) / (1000));
        sessionStorage.setItem('timeIntoVideo', timeIntoVideo);
        sessionStorage.setItem('playingVideoId', playingVideoId);
        window.location.href = 'index.html'
        document.getElementById("player").src = "http://www.youtube.com/embed/" + playingVideoId + "?start=" + difTimes + "&autoplay=1&controls=0&showinfo=1&disablekb=1";
    });
}

//sends data up to Firebase, creates a room with a videoID and name
function createRoom() {
    var videoID = document.getElementById("videoid").value;
    var roomName = document.getElementById("roomname").value;
    var startTime = (new Date).getTime();
    const promise = firebase.database().ref(roomName).set({
        videoLink: videoID,
        startTime: startTime
    })
    sessionStorage.setItem('timeIntoVideo', 0);
    sessionStorage.setItem('playingVideoId', videoID);
    promise.then(function() { window.location.href = 'index.html' }, function() { console.log("fail") });
}

// shows and hides the dialogue boxes for join and create room buttons
// takes the id of the element to be shown as the argument
function showBox(elementId) {
    document.getElementById(elementId).style.display = 'block';
    if (elementId == 'roomdialogue') {
        document.getElementById('joindialogue').style.display = 'none';
    } else {
        document.getElementById('roomdialogue').style.display = 'none';
    }
}

// called onload by index.html, starts the video automatically
function loadVideo() {
    var playingVideoId = sessionStorage.getItem('playingVideoId');
    var timeIntoVideo = sessionStorage.getItem('timeIntoVideo');
    console.log(timeIntoVideo);
    document.getElementById("player").src = "http://www.youtube.com/embed/" + playingVideoId + "?start=" + timeIntoVideo + "&autoplay=1&controls=0&showinfo=1&disablekb=1"
}