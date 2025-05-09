let results = JSON.parse(localStorage.getItem("results")) || [];

function saveAndRender() {
  if (results.length > 100) {
    results = results.slice(results.length - 100);
  }
  localStorage.setItem("results", JSON.stringify(results));
  renderHistory();
  predictNext();
}

function addResult(result) {
  results.push(result);
  saveAndRender();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  results.slice().reverse().forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${results.length - index}: ${item}`;
    list.appendChild(li);
  });
}

function clearData() {
  results = [];
  localStorage.removeItem("results");
  renderHistory();
  document.getElementById("prediction").textContent = "Waiting...";
}

function predictNext() {
  if (results.length < 5) {
    document.getElementById("prediction").textContent = "Need more data...";
    return;
  }

  let counts = { Dragon: 0, Tiger: 0, Tie: 0 };
  results.slice(-20).forEach((r) => counts[r]++);

  let max = Math.max(counts.Dragon, counts.Tiger, counts.Tie);
  let prediction =
    Object.keys(counts).find((key) => counts[key] === max) || "Unknown";

  document.getElementById("prediction").textContent = prediction;
}

saveAndRender();