function startVideo(Videoid, startTime) {
    var videoLink = ("http://www.youtube.com/embed/" + Videoid + "?start=" + startTime + "&autoplay=1&controls=0&showinfo=1&disablekb=1")
        // alert(videoLink);
    document.getElementById('player').src = videoLink;
    return;
}

startVideo("vW4tyQ5XD_Q", "60");