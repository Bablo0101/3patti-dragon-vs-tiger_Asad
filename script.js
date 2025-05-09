
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
  if (results.length < 3) {
    predictionEl.textContent = 'Waiting...';
    return;
  }

  const last2 = results.slice(-2).join(',');

  const freqMap = { Dragon: 0, Tiger: 0, Tie: 0 };
  for (let i = 0; i < results.length - 2; i++) {
    const seq = results[i] + ',' + results[i + 1];
    const next = results[i + 2];
    if (seq === last2) {
      freqMap[next]++;
    }
  }

  let max = Math.max(freqMap.Dragon, freqMap.Tiger, freqMap.Tie);
  let prediction = Object.keys(freqMap).find(k => freqMap[k] === max && max > 0);

  predictionEl.textContent = prediction || 'No clear pattern';
}

renderHistory();
updatePrediction();
