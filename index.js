const customInput = document.getElementById("custom-input");

function fetchData() {
    var gameData;
    let date = new Date();

    if (customInput.value != "" && customInput.value != null) {
        fetch(customInput.value)
            .then(response => response.json())
            .then(data => addGames(data))
            .catch(err => console.error(err));

        return;
    }

    console.log(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        .then(response => response.json())
        .then(data => addGames(data))
        .catch(err => console.error(err));
}

function addGames(data) {
    let games = data.dates[0].games;

    let pkOutput = document.createElement("div");
    pkOutput.className = "output";

    let homeTeamOutput = document.createElement("div");
    homeTeamOutput.className = "output";

    let awayTeamOutput = document.createElement("div");
    awayTeamOutput.className = "output";

    pkOutput.innerText = "var game_ids = [";
    homeTeamOutput.innerText = "var home_teams = [";
    awayTeamOutput.innerText = "var away_teams = [";

    let num = games.length
    games.forEach(element => {
        num--;
        console.log(element.gamePk);
        pkOutput.innerText = pkOutput.innerText + String(element.gamePk);
        homeTeamOutput.innerText = homeTeamOutput.innerText + String(element.teams.home.team.id);
        awayTeamOutput.innerText = awayTeamOutput.innerText + String(element.teams.away.team.id);
        if (num != 0) {
            pkOutput.innerText = pkOutput.innerText + ", ";
            homeTeamOutput.innerText = homeTeamOutput.innerText + ", ";
            awayTeamOutput.innerText = awayTeamOutput.innerText + ", ";
        }
    });

    pkOutput.innerText = pkOutput.innerText + "]";
    homeTeamOutput.innerText = homeTeamOutput.innerText + "]";
    awayTeamOutput.innerText = awayTeamOutput.innerText + "]";

    document.body.appendChild(pkOutput);
    document.body.appendChild(homeTeamOutput);
    document.body.appendChild(awayTeamOutput);
}