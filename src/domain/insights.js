// insights.js

function getKASTInsight(kastPercentage) {
  if (kastPercentage >= 75) {
    return "Strong team impact. You consistently contribute to rounds by playing with your teammates and surviving key moments.";
  }

  if (kastPercentage >= 65) {
    return "Inconsistent impact. You contribute in some rounds but often miss trade opportunities or take isolated fights.";
  }

  return "Low round contribution. You frequently die without impacting the round. Focus on playing closer to teammates and trading kills.";
}

function getDeathsPerRoundInsight(deathsPerRound) {
  if (deathsPerRound <= 0.6) {
    return "Good survivability. You rarely die in rounds, indicating strong positioning and patience.";
  }

  if (deathsPerRound <= 0.8) {
    return "Risky positioning. You often take fights that put you at a disadvantage. Try playing closer to cover or teammates.";
  }

  return "High death rate. You frequently die early, hurting round outcomes. Slow down, avoid dry peeks, and improve positioning.";
}

function getHeadshotInsight(headshotPercentage) {
  if (headshotPercentage >= 20) {
    return "Good precision. Your headshot percentage is solid, showing disciplined crosshair placement.";
  }

  if (headshotPercentage >= 15) {
    return "Average precision. Your aim is serviceable, but improving crosshair placement will increase consistency.";
  }

  return "Low headshot percentage. Focus on keeping your crosshair at head level and taking more controlled fights.";
}

export { getKASTInsight, getDeathsPerRoundInsight, getHeadshotInsight };
