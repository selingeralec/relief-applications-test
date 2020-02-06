//SELECTORS
var videoInput = document.querySelector(".video-input");
var videoPlayer = document.querySelector("#video-player");
var videoSource = videoPlayer.src;
var historyContainer = document.querySelector(".history");
var bookmarkButton = document.querySelector(".bookmark");
var bookmarkToggle = document.querySelector(".bookmark-display");
var bookmarkContainer = document.querySelector(".bookmark-list");
var bookmarkCounter = document.querySelector("#bookmark-storage-count");
var toggleIcon = document.querySelector("#toggle-icon");
var toggleText = document.querySelector("#toggle-text");

//loads URL on "enter"
videoInput.addEventListener("keydown", (e)=>{
    if(e.keyCode == 13){
        loadVideo(videoInput.value);
        videoInput.blur();
    }
});
//clears input onFocus
videoInput.addEventListener("click", ()=>{
    videoInput.value = "";
})

//parses youtube link and changes iframe src
function loadVideo(videoURL){
    //split youtube url and get ID 
    var videoID = videoURL.split("v=")[1];
    //change iframe src
    videoSource = `https://www.youtube.com/embed/${videoID}`;
    videoPlayer.src = videoSource;
    logHistory(videoSource)
}

//create div element
function logHistory(videoSource){
    var newHistory = document.createElement("li");
    newHistory.classList.add("history-item");
    newHistory.innerText = videoSource;
    historyContainer.appendChild(newHistory);
    //store element in localStorage
    var historyCount = historyContainer.children.length;
    localStorage.setItem("History item "+historyCount, videoInput.value)
}

//load history link in video player
document.addEventListener("click", (event)=>{
    if(event.target.className == "history-item"){
        videoPlayer.src = event.target.innerText;
    }
});
//create bookmark with original URL
document.addEventListener("click", (event)=>{
    if(event.target == bookmarkButton && videoInput.value != ""){
    //create bookmark
    var newBookmark = document.createElement("li");
    newBookmark.classList.add("bookmark-item");
    newBookmark.innerText = videoInput.value;
    //append bookmark
    bookmarkContainer.appendChild(newBookmark);
    //store bookmark in localStorage
    var bookmarkCount = bookmarkContainer.children.length;
    window.localStorage.setItem("Bookmark item "+bookmarkCount, videoInput.value);
    }
    storageCount();
});
//load bookmark link in video player
document.addEventListener("click", (event)=>{
    if(event.target.className == "bookmark-item"){
        loadVideo(event.target.innerText);
    }
});
//toggle display of all bookmarks 
document.addEventListener("click", (event)=>{
    //include span so it won't block click event
    if(event.target == bookmarkToggle || event.target == toggleText){
        if(event.target.value == "Toggle All"){
            bookmarkContainer.classList.add("hide-bookmarks");
            event.target.value = "Untoggle All";
            toggleText.innerText = "Show Bookmarks";
            //change toggle icon
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        }else{
            toggleText.innerText = "Hide Bookmarks";
            bookmarkContainer.classList.remove("hide-bookmarks");
            event.target.value = "Toggle All";
            //change toggle icon
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        }
    }
});

/*YT TEST LINKS
https://www.youtube.com/watch?v=3GiJiMhuY4k
https://www.youtube.com/watch?v=jdCoausXiGU
https://www.youtube.com/watch?v=ZVq7CyhfRA8
*/

function storageCount(){
    var keyArray = [];
    for(var i=0; i<localStorage.length; i++) {
        //get name of localStorage item
        var keyName = window.localStorage.key(i);
        if(keyName.charAt(0)==="B"){
            keyArray.push(window.localStorage.key(i));
        }
    }    
    //update bookmark counter label
    bookmarkCounter.innerText = keyArray.length;
}
//update bookmark count on page load
window.onchange = storageCount();
window.onload = storageCount();

