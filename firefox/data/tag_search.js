var options = {};

// receive options from main.js
self.port.on("options", function(data) { 
    options = data;
})

function add_button(){
    // get the btn toolbar element from the search form
    var toolbar_elem = form_element.getElementsByClassName("btn-toolbar")[0];
    // create our button
    var tag_search_elem = document.createElement("div");
    // add btn-group class
    tag_search_elem.setAttribute("class", "btn-group");
    // add inner HTML
    tag_search_elem.innerHTML = '<a id="tag-search" class="btn btn-warning">Tag Search</a>';
    // insert tag search element
    toolbar_elem.insertBefore(tag_search_elem, toolbar_elem.firstElementChild);
}

function get_form_content(){
    return form_element.getElementsByTagName("input")[0].value;
}

function set_form_content(text) {
    form_element.getElementsByTagName("input")[0].value = text;
}

function process_search_result(data){
    var output_string = "";
    if (data.length > 0) {
        data.map(function (item) {
            output_string += item + " ";
        });
    } else {
        output_string = "no matches found";
    }
    set_form_content(output_string);
}

function search_tags(query) {
	var xhr = new XMLHttpRequest();
	var url = "https://" + options.api_host + "/api/search/?query=" + query;
    url += "&size=" + options.search_results + "&keys=1" + "&apikey=" + options.apikey;
	xhr.open('GET', url, true);

	xhr.onreadystatechange = function(){
	    if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
            if (data.status == 'success') {
                console.log('API request successful!');
                process_search_result(data.data);
            } else {
                console.log('API request unsuccessful: ' + data.message);
            }
        }else{
            console.log('HTTP error ' + xhr.status);
        }
	};
	xhr.send();
}

var form_element = document.getElementsByClassName("well form-search")[0];

if (form_element){
    add_button();

    document.getElementById("tag-search").addEventListener("click", function() {
        search_tags(get_form_content());
    });
}

