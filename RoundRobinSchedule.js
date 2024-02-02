function ROUNDROBINSCHEDULE(teamsArray) {
  if (!Array.isArray(teamsArray)) {
    throw new Error("Input must be an array");
  }
  // Flatten the array in case of nested single-element arrays
  teamsArray = teamsArray.flat();
  if (teamsArray.length % 2 !== 0) {
    throw new Error("Number of entries in the array must be divisible by 2");
  }

  const gamesPerRound = teamsArray.length / 2;
  const teamsCount = teamsArray.length;
  const roundsCount = teamsArray.length - 1;

  let rounds = [];
  let previousMatchups = new Set();

  for (let round = 0; round < roundsCount; round++) {
    let games = [];
    let roundTeams = [...teamsArray];
    let teamsToRotate = roundTeams.slice(1);
    // Perform the rotation in place without using the external SHIFTROTATE function
    if (round === 0) {
      roundTeams = teamsToRotate;
    } else {
      const firstPart = teamsToRotate.slice(0, round);
      const secondPart = teamsToRotate.slice(round);
      roundTeams = [...secondPart, ...firstPart];
    }

    // console.log(roundTeams);

    let roundTeamsSorted = [teamsArray[0], ...roundTeams];

    // console.log(roundTeamsSorted);

    const step = roundTeamsSorted.length / 2;
    for (let i = 0; i < step; i++) {
      const team1 = roundTeamsSorted[i];
      const team2 = roundTeamsSorted[i + step];
      games.push([team1, team2]);
    }
    console.log(games);

  }
  let gameNumber = 1;
  var flattenedRounds = rounds.flatMap((games, roundIndex) =>
    games.map((game) => [gameNumber++, roundIndex + 1, game[0], game[1]])
  );
  return flattenedRounds;
}

ROUNDROBINSCHEDULE(["A", "B", "C", "D", "E", "F"]);
