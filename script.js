$(".thrower").hide();
$(".gameContainer").hide();
var playerCount;
var playerName;
var playerPoint;
var names = [];
var gameContainer = document.getElementById("gameContainer");
var playerNames = [];
var playerPoints = [];
var randomFirst = 0;
var next = 0;
var totals = [];

$("#btnStart").click(function () {
    playerName = $("#name").val();
    playerCount = $("#count").val();
    playerPoint = parseInt($("#point").val());
    $("#name").text("");
    $("#name").text("");
    $("#name").text("");
    if (playerCount > 10) {
        window.alert("Player count can not be more than 10.");
        return;
    }
    else if (playerCount < 1) {
        window.alert("Player count can not be less than 1.");
        return;
    }
    else if (playerPoint > 10) {
        window.alert("Player point can not be more than 10.");
        return;
    }
    else if (playerPoint < 1) {
        window.alert("Player point can not be less than 1.");
        return;
    }
    else {
        $(".playerInfos").hide();

        playerNames.push(playerName);
        playerPoints.push(playerPoint);
    }

    gameContainer.innerHTML += `<div id="players" class="players active">
        <span class="playerName" id="playerName">${playerName}</span>
        <span style="font-size:18px" class="playerPoint" id="playerPoint">${playerPoint} point</span>
        <div class="imageContainer">
                <img id="dice" class="dice" src="./dices.jpg" alt="">
                <img id="dice2" class="dice" src="./dices.jpg" alt="" style="display:none">
            </div>
        <button class="throwDice" id="throwDice">Throw Dice</button>
        </div>`;

    for (var i = 1; i < playerCount; i++) {
        var name = window.prompt(`What is the name of ${i + 1}. player?`);
        var point = parseInt(window.prompt(`What is the point of ${i + 1}. player?`));

        var sayi = i;
        if (isNaN(point)) {
            window.alert("Player point can not contain word");
            i--;
        }
        else if (point > 10) {
            window.alert("Player point can not be more than 10.");
            i--;
        }
        else if (point < 1) {
            window.alert("Player point can not be less than 1.");
            i--;
        }
        else {
            playerNames.push(name);
            playerPoints.push(point);
            gameContainer.innerHTML += `<div id="players" class="players active">
                <span class="playerName" id="playerName">${name}</span>
                <span style="font-size:18px" class="playerPoint" id="playerPoint">${point} point</span>
                <div class="imageContainer">
                        <img id="dice" class="dice" src="./dices.jpg" alt="">
                        <img id="dice2" class="dice" src="./dices.jpg" alt="" style="display:none">
                    </div>
                <button class="throwDice" id="throwDice">Throw Dice</button>
                </div>`;
        }
    }

    randomFirst = Math.floor(Math.random() * playerCount);
    next = randomFirst;

    $("#playerWhoThrow").text(playerNames[randomFirst] + " is throwing!");

    var throwButtons = document.querySelectorAll(".throwDice");

    for (var i = 0; i < throwButtons.length; i++) {
        if (i != randomFirst) {
            throwButtons[i].disabled = true;
        }
    }

    for (const btn of throwButtons) {
        btn.addEventListener("click", throwDice);
    }


    $(".thrower").show();
    $(".gameContainer").show();
});

function throwDice() {
    var random = Math.floor(Math.random() * 6) + 1;
    var randomSecond = Math.floor(Math.random() * 6) + 1;
    var total = random + randomSecond;

    totals.push(total);

    var images = document.querySelectorAll("#dice");
    var selectedImage = images[next];
    var images2 = document.querySelectorAll("#dice2");
    var selectedImage2 = images2[next];
    selectedImage2.style.display = "block";

    for (var i = 1; i <= 6; i++) {
        if (i == random) {
            selectedImage.className = "twoDiceImg";
            selectedImage.src = i + ".png";
        }
    }

    for (var i = 1; i <= 6; i++) {
        if (i == randomSecond) {
            selectedImage2.className = "twoDiceImg";
            selectedImage2.setAttribute("src", `${i}.png`);
        }
    }

    var points = document.querySelectorAll(".playerPoint");
    var selectedPoint = points[next];

    if (total == 7) {
        console.log("HEY1");
        var point = selectedPoint.textContent.substring(0, 2);
        point = parseInt(point);
        point++;
        selectedPoint.textContent = point + " point";
    }
    else if (total == 11) {
        if (totals.length > 1) {
            if (totals[totals.length - 2] != 4 || totals[totals.length - 2] != 5 || totals[totals.length - 2] != 6 || totals[totals.length - 2] != 8 || totals[totals.length - 2] != 9 || totals[totals.length - 2] != 10) {
                var point = selectedPoint.textContent.substring(0, 2);
                point = parseInt(point);
                point++;
                selectedPoint.textContent = point + " point";
            }
        }
        else {
            var point = selectedPoint.textContent.substring(0, 2);
            point = parseInt(point);
            point++;
            selectedPoint.textContent = point + " point";
            console.log("HEY2");
        }
    }
    else if (total == 2 || total == 3 || total == 12) {
        var point = selectedPoint.textContent.substring(0, 2);
        point = parseInt(point);
        point--;
        if (point == 0) {
            var containers = document.querySelectorAll("#players");
            var selectedContainer = containers[next];
            selectedContainer.style.opacity = "0.5";
            selectedContainer.className = "players passive";
        }
        selectedPoint.textContent = point + " point";

        next++;
        if (next > playerCount - 1) {
            next = 0;
        }

        var activePlayers = document.querySelectorAll("#players");
        var activePlayer = activePlayers[next];
        if (activePlayer.className == "players passive") {
            next++;
        }

        if (next > playerCount - 1) {
            next = 0;
        }
        while (activePlayers[next].className != "players active") {
            next++;
            if (next > playerCount - 1) {
                $("#playerWhoThrow").text("GAME OVER!");
                var throwButtons = document.querySelectorAll(".throwDice");
                for (var i = 0; i < throwButtons.length; i++) {
                    throwButtons[i].disabled = true;
                }
            }
        }

        $("#playerWhoThrow").text(playerNames[next] + " is throwing!");

        var throwButtons = document.querySelectorAll(".throwDice");

        for (var i = 0; i < throwButtons.length; i++) {
            if (i != next) {
                throwButtons[i].disabled = true;
            }
            else if (i == next) {
                throwButtons[i].disabled = false;
            }
        }
    }
    else {
        if (totals.length > 1) {
            if (totals[totals.length - 1] == totals[totals.length - 2]) {
                console.log("HEY3");
                var points = document.querySelectorAll(".playerPoint");
                var selectedPoint = points[next];
                var point = selectedPoint.textContent.substring(0, 2);
                point = parseInt(point);
                point++;
                selectedPoint.textContent = point + " point";
            }
        }
    }
}