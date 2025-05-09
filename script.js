
let results = JSON.parse(localStorage.getItem('results') || '[]');
const historyList = document.getElementById('historyList');
const predictionEl = document.getElementById('prediction');

function addResult(result) {
  if (results.length >= 100) {
    results.shift();
  }
  results.push(result);
  localStorage.setItem('results', JSON.stringify(results));
  renderHistory();
  updatePrediction();
}

function clearData() {
  results = [];
  localStorage.removeItem('results');
  renderHistory();
  updatePrediction();
}

function renderHistory() {
  historyList.innerHTML = '';
  results.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    historyList.appendChild(li);
  });
}

function updatePrediction() {
  if (results.length === 0) {
    predictionEl.textContent = 'Waiting...';
    return;
  }

  // Use all 100 results for prediction
  let count = { Dragon: 0, Tiger: 0, Tie: 0 };
  results.forEach(item => {
    count[item]++;
  });

  // Find the most frequent result
  let max = Math.max(count.Dragon, count.Tiger, count.Tie);
  let prediction = Object.keys(count).find(key => count[key] === max);

  predictionEl.textContent = prediction;
}

renderHistory();
updatePrediction();
