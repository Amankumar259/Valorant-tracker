// analyzer.js
import {
  calculateKAST,
  calculateDeathsPerRound,
  calculateHeadshotPercentage,
} from "../domain/stats.js";
import {
  getKASTInsight,
  getDeathsPerRoundInsight,
  getHeadshotInsight,
} from "../domain/insights.js";

export function analyzePlayer(rounds) {
  const kastPercentage = calculateKAST(rounds);
  const kastInsight = getKASTInsight(kastPercentage);

  const deathsPerRound = calculateDeathsPerRound(rounds);
  const deathsInsight = getDeathsPerRoundInsight(deathsPerRound);

  const headshotPercentage = calculateHeadshotPercentage(rounds);
  const headshotInsight = getHeadshotInsight(headshotPercentage);

  const primaryInsight = getPrimaryInsight({
    kastPercentage,
    deathsPerRound,
    headshotPercentage,
    kastInsight,
    deathsInsight,
    headshotInsight,
  });

  return {
    kastPercentage,
    deathsPerRound,
    headshotPercentage,
    kastInsight,
    deathsInsight,
    headshotInsight,
    primaryInsight,
  };
}

function getDeathsSeverity(deathsPerRound) {
  if (deathsPerRound > 0.8) return 3; // critical
  if (deathsPerRound > 0.6) return 2; // moderate
  return 0; // fine
}

function getKASTSeverity(kastPercentage) {
  if (kastPercentage < 65) return 3; // critical
  if (kastPercentage < 75) return 2; // moderate
  return 0; // fine
}

function getHeadshotSeverity(headshotPercentage) {
  if (headshotPercentage < 15) return 1; // minor issue
  return 0; // fine
}

function getPrimaryInsight(analysis) {
  const deathsSeverity = getDeathsSeverity(analysis.deathsPerRound);
  const kastSeverity = getKASTSeverity(analysis.kastPercentage);
  const headshotSeverity = getHeadshotSeverity(analysis.headshotPercentage);

  if (deathsSeverity > 0) {
    return analysis.deathsInsight;
  }

  if (kastSeverity > 0) {
    return analysis.kastInsight;
  }

  if (headshotSeverity > 0) {
    return analysis.headshotInsight;
  }

  return "Overall good performance. You are contributing well to rounds. Keep playing disciplined and consistent.";
}
