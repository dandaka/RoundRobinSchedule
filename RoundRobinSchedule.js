function ROUNDROBINSCHEDULE(teamsArray, courtsArray) {
  if (!Array.isArray(teamsArray)) {
    throw new Error("Input must be an array");
  }
  // Flatten the array in case of nested single-element arrays
  teamsArray = teamsArray.flat().filter((team) => team.length > 0);
  courtsArray = courtsArray
    .flat()
    .map(String)
    .filter((court) => court.length > 0);

  if (teamsArray.length % 2 !== 0) {
    throw new Error("Number of teams must be divisible by 2");
  }

  const gamesPerRound = teamsArray.length / 2;
  const roundsCount = teamsArray.length - 1;

  if (courtsArray) {
    courtsArray = courtsArray.slice(0, gamesPerRound);
  } else {
    courtsArray = Array.from({ length: gamesPerRound }, (_, i) => i + 1);
  }

  let rounds = [];

  for (let round = 0; round < roundsCount; round++) {
    let games = [];
    let roundTeams = [...teamsArray];
    console.log(roundTeams);
    let teamsToRotate = roundTeams.slice(1);
    if (round === 0) {
      roundTeams = teamsToRotate;
    } else {
      const firstPart = teamsToRotate.slice(0, round);
      const secondPart = teamsToRotate.slice(round);
      roundTeams = [...secondPart, ...firstPart];
    }

    let roundTeamsSorted = [teamsArray[0], ...roundTeams];

    const step = roundTeamsSorted.length / 2;
    for (let i = 0; i < step; i++) {
      const team1 = roundTeamsSorted[i];
      const team2 = roundTeamsSorted[i + step];
      games.push([team1, team2]);
    }
    // console.log(games);
    rounds.push(games);
  }
  let gameNumber = 1;
  var flattenedRounds = rounds.flatMap((games, roundIndex) =>
    games.map((game) => {
      const match = [
        gameNumber++,
        roundIndex + 1,
        courtsArray[(gameNumber + 1) % gamesPerRound],
        game[0],
        game[1],
      ];

      return match;
    })
  );

  return flattenedRounds;
}

var a = ROUNDROBINSCHEDULE(
  [
    "T1 Boris / Mark",
    "T2 Dov / Nuno VP",
    "T3 Seya / Jj",
    "T4 Vlad / Afonso",
    "T5 Cesar / Nacho",
    "T6 Shirish / Mono",
  ],
  ["C7", "C6", "C5"]
);

console.log(a);