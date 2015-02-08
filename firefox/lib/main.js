// Macaroni Firefox addon
// @description: Add your yara tags to VTMIS 
// @author: Nick Summerlin
// @web: https://macaroni-project.org

const pageMod = require("sdk/page-mod");
const preferences = require("sdk/simple-prefs");
const ss = require("sdk/simple-storage");

// update simple-storage on preference change
function onPrefChange(prefName) {
	ss.storage[prefName] = preferences.prefs[prefName];
}

// set on change listeners to preferences
preferences.on("apikey", onPrefChange);
preferences.on("api_host", onPrefChange);
preferences.on("search_results", onPrefChange);


// initialize simple storage if not set
if (!ss.storage.apikey)
    ss.storage.apikey = "YOUR_API_KEY";
if (!ss.storage.api_host)
	ss.storage.api_host = "macaroni-project.org";
if (!ss.storage.search_results)
	ss.storage.search_results = 25;

// Create a page mod
pageMod.PageMod({
	include: "https://www.virustotal.com/intelligence/search/*",
	contentScriptFile: ["./insert_tags.js", "./tag_search.js"],
	// on attach, send the options from simple storage to the content script
	onAttach: function(worker) {
		options = {"apikey": ss.storage.apikey, "api_host": ss.storage.api_host, "search_results": ss.storage.search_results}
		worker.port.emit('options', options);
	}
});