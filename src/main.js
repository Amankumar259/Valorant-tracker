import { analyzePlayer } from "./domain/analyzer.js";

const rounds = [];

const statsDiv = document.getElementById("stats");
const insightDiv = document.getElementById("primary-insight");
const form = document.getElementById("round-form");

const errorEl = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const shotsHit = Number(document.getElementById("shotsHit").value);
  const headshots = Number(document.getElementById("headshots").value);

  // ❌ Validation 1: negative numbers
  if (shotsHit < 0 || headshots < 0) {
    errorEl.textContent = "Shots and headshots cannot be negative.";
    return;
  }

  // ❌ Validation 2: headshots > shots
  if (headshots > shotsHit) {
    errorEl.textContent = "Headshots cannot be greater than shots hit.";
    return;
  }

  // ❌ Validation 3: empty round
  const hasAction =
    document.getElementById("kill").checked ||
    document.getElementById("assist").checked ||
    document.getElementById("survived").checked ||
    document.getElementById("traded").checked ||
    shotsHit > 0;

  if (!hasAction) {
    errorEl.textContent = "Round must contain at least one action.";
    return;
  }

  const round = {
    kill: document.getElementById("kill").checked,
    assist: document.getElementById("assist").checked,
    survived: document.getElementById("survived").checked,
    traded: document.getElementById("traded").checked,
    shotsHit,
    headshots,
  };

  rounds.push(round);

  const analysis = analyzePlayer(rounds);
  renderResults(analysis);
  renderTable();
  form.reset();
});

function renderResults(analysis) {
  if (rounds.length === 0) {
    statsDiv.innerHTML = "<p>No rounds added yet.</p>";
    insightDiv.innerHTML = "";
    return;
  }

  statsDiv.innerHTML = `
    <h2>Stats</h2>
    <p>Total Rounds: ${rounds.length}</p>
    <p>KAST: ${analysis.kastPercentage.toFixed(1)}%</p>
    <p>Deaths per Round: ${analysis.deathsPerRound.toFixed(2)}</p>
    <p>Headshot %: ${analysis.headshotPercentage.toFixed(1)}%</p>
  `;

  insightDiv.innerHTML = `
    <h2>Main Coaching Insight</h2>
    <p>${analysis.primaryInsight}</p>
  `;
}

function renderTable() {
  const tbody = document.querySelector("#round-table tbody");
  tbody.innerHTML = "";

  rounds.forEach((round, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${round.kill ? "✔️" : "❌"}</td>
      <td>${round.assist ? "✔️" : "❌"}</td>
      <td>${round.survived ? "✔️" : "❌"}</td>
      <td>${round.traded ? "✔️" : "❌"}</td>
      <td>${round.shotsHit}</td>
      <td>${round.headshots}</td>
      <td><button data-index="${index}">Delete</button></td>
    `;

    tbody.appendChild(row);
  });

  attachDeleteHandlers();
}

function attachDeleteHandlers() {
  const buttons = document.querySelectorAll("#round-table button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      rounds.splice(index, 1); // ❌ remove round

      if (rounds.length === 0) {
        statsDiv.innerHTML = "<p>No rounds added yet.</p>";
        insightDiv.innerHTML = "";
        renderTable();
        return;
      }

      const analysis = analyzePlayer(rounds);
      renderResults(analysis);
      renderTable();
    });
  });
}
