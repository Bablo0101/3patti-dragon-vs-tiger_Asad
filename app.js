
let entries = [];
let feedbackLog = [];

function addEntry(type) {
  if (entries.length >= 300) entries.shift();
  entries.push(type);
  updateDisplay();
  predict();
}

function updateDisplay() {
  const history = document.getElementById("historyList");
  history.innerHTML = "";
  let d = 0, t = 0, tie = 0;
  entries.forEach((e, i) => {
    const div = document.createElement("div");
    div.textContent = (i + 1) + ". " + e;
    history.appendChild(div);
    if (e === "Dragon") d++;
    else if (e === "Tiger") t++;
    else tie++;
  });
  document.getElementById("totalEntries").textContent = entries.length;
  document.getElementById("dragonCount").textContent = d;
  document.getElementById("tigerCount").textContent = t;
  document.getElementById("tieCount").textContent = tie;
  drawGraph();
}

function predict() {
  if (entries.length === 0) {
    document.getElementById("predictionResult").textContent = "Waiting...";
    return;
  }
  let last = entries.slice(-5);
  let prediction = "Tiger";
  let dragonCount = last.filter(x => x === "Dragon").length;
  let tigerCount = last.filter(x => x === "Tiger").length;
  let tieCount = last.filter(x => x === "Tie").length;

  if (dragonCount > tigerCount) prediction = "Tiger";
  else if (tigerCount > dragonCount) prediction = "Dragon";
  else prediction = "Tie";

  document.getElementById("predictionResult").textContent = prediction;
}

function feedback(type) {
  feedbackLog.push({ entries: [...entries], result: type });
  alert("Feedback saved: " + type);
}

function resetData() {
  if (confirm("Are you sure you want to reset all data?")) {
    entries = [];
    feedbackLog = [];
    updateDisplay();
    document.getElementById("predictionResult").textContent = "Waiting...";
  }
}

function drawGraph() {
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let w = canvas.width / 300;
  entries.forEach((e, i) => {
    ctx.fillStyle = e === "Dragon" ? "#00bcd4" : e === "Tiger" ? "#ff5722" : "#9c27b0";
    ctx.fillRect(i * w, 100 - 20, w - 1, 20);
  });
}

function openChat() {
  document.getElementById("chatBox").style.display = "block";
}
function closeChat() {
  document.getElementById("chatBox").style.display = "none";
}
function sendMessage() {
  alert("Message sent! (Simulation)");
  closeChat();
}
