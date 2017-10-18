// Function that is called when the button is clicked
function shufflePlayers() {
    changeButtonText();
    let text = "";
    // Gets all players from the fieldset as an array
    let players = document.getElementsByClassName('player');
    var checkedPlayers = [];
    // Loop through the players array to check if their button is checked
    for (let i = 1; i <= players.length; i++) {
        if (document.getElementById('Player ' + i).checked) {
            // Add player to the checkedPlayers array
            checkedPlayers.push(document.getElementById('Player ' + i).value);
        }
    }
    // Must be at least 3 players checked
    if (checkedPlayers.length < 3) {
        document.getElementById("team1").innerHTML = "No use in shuffeling 2 or fewer playerz....";
        changeButtonText();
    }
    else {
        printTeams(checkedPlayers);
    }
}

// Prints the teams in a "loop" that has a timeout value that increases each time the teams are printed to
// simulate a shuffeling effect
function printTeams(checkedPlayers) {
    let i = 1;
    let timeOutValue = 15;
    function myLoop() {
        setTimeout(function () {
            // Makes a copy of the checkePlayers array to not manipulate the original array                                                    
            let playerz = checkedPlayers.slice(0);
            let createdTeams = createTeams(playerz);
            i++;
            timeOutValue += 5;
            if (i < 50) {
                document.getElementById("team1").innerHTML = createdTeams[0];
                document.getElementById("team2").innerHTML = createdTeams[1];
                myLoop();
            }
            else {
                changeButtonText();
            }
        }, timeOutValue)
    }
    myLoop();
}

function createTeams(playerz) {
    let team1 = "";
    let team2 = "";
    let teamArray = [];
    let originalLength = playerz.length;
    while (playerz.length > (originalLength / 2)) {
        // Find a random player in the playerz array
        let rand = playerz[Math.floor(Math.random() * playerz.length)];
        team1 += `${rand}<br/>`;
        // Removes the player from the playerz array
        playerz.splice(playerz.indexOf(rand), 1);
    }
    // Creates team 2 from the remaining players in the playerz array
    for (let i = 0; i < playerz.length; i++) {
        team2 += `${playerz[i]}<br/>`;
    }
    teamArray.push(team1);
    teamArray.push(team2);
    return teamArray;
}


function changeButtonText() {
    let elem = document.getElementById("shuffleButton");
    if (elem.value == "Shuffle")
        elem.value = "Shuffeling";
    else elem.value = "Shuffle";
}