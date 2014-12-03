var options = {};

// retrieve API server options (api_host, apikey, search_results)
function retrieve_options() {
    chrome.storage.sync.get(null, function(items) {
        // TODO: add warning if options haven't been set
        options = items;
    });
}

// collect all MD5 hashes into an array
function collect_hashes(node_list) {
    var hash_array = [];
    for (var i = 0; i < node_list.length; i++) {
        if (node_list[i].nodeName == "TR") {
            hash_array.push(node_list[i].getElementsByClassName("sample-details")[1].text);
        }
    }
    return JSON.stringify(hash_array);
}

// search datastore for tags
function fetch_tags(node_list) {
    var xhr = new XMLHttpRequest();
    var url = "https://" + options.api_host + "/api/tag_list/";
    url += "?apikey=" + options.apikey;
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            if (xhr.status != 200) {
                console.log('HTTP error ' + xhr.status);
            } else {
                data = JSON.parse(xhr.responseText);
                if (data.status == 'success') {
                    console.log('API request successful!');
                    insert_tags(data.data);
                } else {
                    console.log('API request unsuccessful: ' + data.message);
                }
            }
        }
    };
    xhr.send(collect_hashes(node_list));
}

function insert_tags(hashmap) {
    var rows = document.getElementById("results-list").getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++){
        row_md5 = rows[i].getElementsByTagName("a")[1].text;
        if (hashmap.hasOwnProperty(row_md5)) {
            for (var j = 0; j < hashmap[row_md5].length; j++) {
                tag_html = '<span class="label label-warning sampletag">' + hashmap[row_md5][j] + '</span> ';
                rows[i].getElementsByTagName("div")[0].insertAdjacentHTML("beforeEnd", tag_html);
            }
        }   
    }
}

// if the 'search-results' element can be found on the page
if (document.getElementById("search-results")) {
    retrieve_options();

    var search = document.getElementById("results-list");

    // create a MutationObserver
    var MutationObserver = window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver;
    // setup MutationObserver callback
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            console.log("mutation observed " + mutation.type + " " + mutation.target);
            fetch_tags(mutation.addedNodes);
        });
    });
    // listen for childList mutations to the 'results-list' node
    observer.observe(search, {
        childList: true
    });
}




