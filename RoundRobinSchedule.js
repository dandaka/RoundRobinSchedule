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
    for (let game = 0; game < gamesPerRound; game++) {
      // Calculate the index for the home and away teams
      const homeIndex = (round + game) % teamsCount;
      const awayIndex = (teamsCount - 1 - game + round) % teamsCount;
      // Ensure that we don't match a team with itself or repeat a matchup
      if (homeIndex !== awayIndex) {
        const matchup = `${teamsArray[homeIndex]} vs ${teamsArray[awayIndex]}`;
        const reverseMatchup = `${teamsArray[awayIndex]} vs ${teamsArray[homeIndex]}`;
        if (!previousMatchups.has(matchup) && !previousMatchups.has(reverseMatchup)) {
          games.push([teamsArray[homeIndex], teamsArray[awayIndex]]);
          previousMatchups.add(matchup);
        }
      }
    }
    // If we couldn't find enough unique games, throw an error
    if (games.length !== gamesPerRound) {
      throw new Error("Not enough unique games can be scheduled.");
    }
    rounds.push(games);
  }
  let gameNumber = 1;
  var flattenedRounds = rounds.flatMap((games, roundIndex) =>
    games.map((game) => [gameNumber++, roundIndex + 1, game[0], game[1]])
  );
  return flattenedRounds;
}

console.log(ROUNDROBINSCHEDULE(["A", "B", "C", "D", "E", "F"]));
