let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    searchResultsEl.classList.add("result-item");

    let headingEl = document.createElement("a");
    headingEl.href = link;
    headingEl.target = "_blank";
    headingEl.textContent = title;
    headingEl.classList.add("result-title");
    searchResultsEl.appendChild(headingEl);

    let breakEl = document.createElement("br");
    searchResultsEl.appendChild(breakEl);

    let archorEl = document.createElement("a");
    archorEl.href = link;
    archorEl.target = "_blank";
    archorEl.textContent = link;
    archorEl.classList.add("result-url");
    searchResultsEl.appendChild(archorEl);

    let breakLineEl = document.createElement("br");
    searchResultsEl.appendChild(breakLineEl);

    let paragraphEl = document.createElement("p");
    paragraphEl.textContent = description;
    paragraphEl.classList.add("link-description");
    searchResultsEl.appendChild(paragraphEl);
}

function displaySearch(searchResults) {
    spinnerEl.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    let searchInput = searchInputEl.value;
    if (event.target.value === searchInput) {
        let requestUrl = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        searchResultsEl.textContent = "";
        spinnerEl.classList.remove("d-none");


        fetch(requestUrl, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySearch(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);
