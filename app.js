
// Dummy JS for demonstration - basic navigation and layout
const app = document.getElementById('app');
app.innerHTML = `
<header>
  <h1>Haji Hanif & Sons - Office Management</h1>
</header>
<nav>
  <button onclick="showSection('dashboard')">Dashboard</button>
  <button onclick="showSection('admin')">Admin</button>
  <button onclick="showSection('finance')">Finance</button>
  <button onclick="showSection('hr')">HR</button>
  <button onclick="showSection('logistics')">Logistics</button>
  <button onclick="showSection('reception')">Reception</button>
  <button onclick="showSection('store')">Store</button>
  <button onclick="showSection('workers')">Workers</button>
</nav>
<div id="content" class="section">Welcome to the system!</div>
`;

function showSection(name) {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>' + name.charAt(0).toUpperCase() + name.slice(1) + ' Section</h2><p>Details and management for ' + name + ' will be here.</p>';
}
