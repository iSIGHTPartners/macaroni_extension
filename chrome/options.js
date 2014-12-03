// Saves options to chrome.storage
function save_options() {
  var apikey = document.getElementById('apikey').value;
  var api_host = document.getElementById('api_host').value;
  var search_results = document.getElementById('search_results').value;
  chrome.storage.sync.set({
    apikey: apikey,
    api_host: api_host,
    search_results: search_results
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    apikey: 'your_key_here',
    api_host: 'localhost:5000',
    search_results: 25
  }, function(items) {
    document.getElementById('apikey').value = items.apikey;
    document.getElementById('api_host').value = items.api_host;
    document.getElementById('search_results').value = items.search_results;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);