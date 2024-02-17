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
    let teamsToRotate = roundTeams.slice(1);
    if (round === 0) {
      roundTeams = teamsToRotate;
    } else {
      const firstPart = teamsToRotate.slice(0, round);
      const secondPart = teamsToRotate.slice(round);
      roundTeams = [...secondPart, ...firstPart];
    }

    let roundTeamsSorted = [teamsArray[0], ...roundTeams];

    const half = Math.ceil(roundTeamsSorted.length / 2);
    const firstHalf = roundTeamsSorted.slice(0, half);
    const secondHalf = roundTeamsSorted.slice(half).reverse();
    roundTeamsSorted = [...firstHalf, ...secondHalf];

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

  

  // Optionally call the function with flattenedRounds as parameter
  // calculatePairFrequency(flattenedRounds);

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

function calculatePairFrequency(matches) {
  const pairFrequency = {};

  matches.forEach(match => {
    const pair = `${match[3]} vs ${match[4]}`;
    if (pairFrequency[pair]) {
      pairFrequency[pair] += 1;
    } else {
      pairFrequency[pair] = 1;
    }
  });

  const uniquePairs = Object.keys(pairFrequency).length;
  const totalPairs = matches.length;
  const duplicates = Object.values(pairFrequency).some(count => count > 1);

  if (duplicates) {
    console.log("There are pairs that play more than once.");
  } else {
    console.log("All pairs are unique.");
  }

  console.log(`Total unique pairs: ${uniquePairs}, Total pairs: ${totalPairs}`);
  console.log("Frequency of each pair:", pairFrequency);
}