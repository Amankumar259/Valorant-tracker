function calculateKAST(rounds) {
  let contributedRounds = 0;

  rounds.forEach((round) => {
    if (round.kill || round.assist || round.survived || round.traded) {
      contributedRounds++;
    }
  });

  return (contributedRounds / rounds.length) * 100;
}

function calculateDeathsPerRound(rounds) {
  let deaths = 0;

  rounds.forEach((round) => {
    if (!round.survived) {
      deaths++;
    }
  });

  return deaths / rounds.length;
}

function calculateHeadshotPercentage(rounds) {
  let totalHeadshots = 0;
  let totalShotsHit = 0;

  rounds.forEach((round) => {
    totalHeadshots += round.headshots || 0;
    totalShotsHit += round.shotsHit || 0;
  });

  if (totalShotsHit === 0) return 0;

  return (totalHeadshots / totalShotsHit) * 100;
}

export { calculateKAST, calculateDeathsPerRound, calculateHeadshotPercentage };
