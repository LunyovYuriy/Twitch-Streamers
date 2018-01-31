var streamers = ["Doomkradik", "Jamclub", "Raythis", "Snailkicktm", "Twinker_", "Orkpod", "Hellyeahplay"];
var channels = document.querySelector("#channels");
var onlineBtn = document.getElementById("show-online");
var offlineBtn = document.getElementById("show-offline");
var allBtn = document.getElementById("show-all");
function getStreamInfo() {
    
    streamers.forEach(function(streamer){
        function createUrl(type, name) {
            return "https://wind-bow.glitch.me/twitch-api/" + type + "/" + name;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', createUrl("streams", streamer), true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                alert('error: ' + (xhr.status ? xhr.statusText : "Query failed"));
            }
            else {
                try {
                    var streamsJSON = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    alert ("Некорректный ответ " + e.message);
                }
                var game, status;
                if (streamsJSON.stream === null) {
                    game = "offline";
                    status = "offline";
                }
                else {
                    game = streamsJSON.stream.game;
                    status = "online";
                }
                getUser(createUrl, streamer, game, status);
            }
        }

        xhr.send();



    });
}

function getUser(urlFunction, streamer, game) {
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', urlFunction("users", streamer), true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState != 4) return;

        if (xhr2.status != 200) {
            alert('error: ' + (xhr2.status ? xhr2.statusText : "Query failed"));
        }
        else {
            try {
                var usersJSON = JSON.parse(xhr2.responseText);
            }
            catch (e) {
                alert("Некорректный ответ " + e.message);
            }
            var userDiv = document.createElement("div");
            userDiv.className = "user-div";
            userDiv.innerHTML = "<a href='https://twitch.tv/" + usersJSON.name + "'" + "><img src=" + usersJSON.logo + " class='user-logo'><span class='user-name'>" + streamer + "</span> <span class='user-status'>" + game + "</span></a>";
            channels.appendChild(userDiv);
            if (game === "offline") {
                userDiv.className += " offline";
            }
            else {
                userDiv.className += " online";
            }
        }
    }
    xhr2.send();
}

getStreamInfo();

onlineBtn.onclick = function() {
    var offlineStreamer = document.getElementsByClassName("offline");
    clearClass(document.getElementsByClassName("user-div"), document.getElementsByClassName("navbtn"));
    onlineBtn.classList.add("active");
    for(var i = 0; i < offlineStreamer.length; i++) {
        offlineStreamer[i].classList.add("hidden");
    }
}
offlineBtn.onclick = function() {
    var onlineStreamer = document.getElementsByClassName("online");
    clearClass(document.getElementsByClassName("user-div"), document.getElementsByClassName("navbtn"));
    offlineBtn.classList.add("active");
    for(var i = 0; i < onlineStreamer.length; i++) {
        onlineStreamer[i].classList.add("hidden");
    }
}
allBtn.onclick = function() {
    clearClass(document.getElementsByClassName("user-div"), document.getElementsByClassName("navbtn"));
    allBtn.classList.add("active");
}

function clearClass(element, buttonclass) {
    for (var i = 0; i < element.length; i++) {
        element[i].classList.remove("hidden");
    }
    for (var j = 0; j < buttonclass.length; j++) {
        buttonclass[j].classList.remove("active");
    }  
}