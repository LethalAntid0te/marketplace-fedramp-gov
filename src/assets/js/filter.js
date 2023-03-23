function filterSearch(inVal) {

    var clear = document.getElementById("clear-search-desktop");
    var table = document.getElementById("sort-table-desktop");

    const kids = table.children;
    var rows = [];

    clear.classList.remove("d-none");

    for (let i = 0; i < kids.length; i++) {

        kids[i].classList.remove("d-search-none");

        if(inVal != '') {

            if (kids[i].textContent.toLowerCase().includes(inVal.toLowerCase()) == false) {

                kids[i].classList.add("d-search-none");
            }
        }
        rows[i] = kids[i].outerHTML;
    }

    if(inVal == '') {
        clear.classList.add("d-none");
    }

    countResults();
}

function clearSearch() {

    var search = document.getElementById("clear-search");
    var clear = document.getElementById("clear-search-desktop");
    var table = document.getElementById("sort-table-desktop");

    search.value = "";
    clear.classList.add("d-none");

    const kids = table.children;
    var rows = [];

    for (let i = 0; i < kids.length; i++) {
        rows[i] = kids[i].outerHTML;
    }

    table.innerHTML = rows.join('').replace(/d-search-none/g,'');

    countResults();
}

function filterRows(filterNum, filterClass, tableType = 'desktop') {

    var filterClass = filterClass.substr(0,filterClass.lastIndexOf('-'));

    var clear = document.getElementById("clear-filters-" + tableType);
    var table = document.getElementById("sort-table-" + tableType);
    var filter = document.getElementById(filterClass + "-" + tableType);

    var filterChange = document.getElementById("filter-" + filterNum + "-" + tableType);

    var kids = table.children;
    var rows = [];

    clear.classList.remove("d-none");
    filterChange.classList.toggle(filterClass);

    filter.classList.toggle("filter-on");

    for (let i = 0; i < kids.length; i++) {

        kids[i].classList.remove("d-none");
        rows[i] = kids[i].outerHTML;
    }

    table.innerHTML = rows.join('').replace(/=\"\"/g,'');

    kids = table.children;
    
    for (let i = 0; i < 10; i++) {
        
        table.innerHTML = filterOR("filter-" + i + "-" + tableType, kids);
        kids = table.children;
    }

    var isFilterClear = true;

    for (let i = 0; i < 10 && isFilterClear == true; i++) {
        if(document.getElementById("filter-" + i + "-" + tableType).getAttribute('class') != '' 
        && document.getElementById("filter-" + i + "-" + tableType).getAttribute('class') != null) {
            isFilterClear = false;
        }
    }

    if(isFilterClear == true) {
        clear.classList.add("d-none");
    }

    countResults(tableType);
}

function filterOR(filterId, kids) {

    var filterClass = document.getElementById(filterId).getAttribute('class');

    var filterClasses = [];

    if(filterClass != null) {
        filterClasses = filterClass.split(' ');
    }

    var rows = [];
    var isNoneNeeded;

    for (let i = 0; i < kids.length; i++) {

        if(kids[i].classList.contains("d-none") == false) {

            isNoneNeeded = true;

            if(filterClasses.length != 0) {

                for (let j = 0; j < filterClasses.length && isNoneNeeded == true; j++) {
                    if(filterClasses[j] == "" || kids[i].classList.contains(filterClasses[j]) == true) {
                        isNoneNeeded = false;
                    }
                }

                if(isNoneNeeded == true) {
                    kids[i].classList.add("d-none");
                }
            }
        }

        rows[i] = kids[i].outerHTML;
    }

    return rows.join('').replace(/=\"\"/g,'');
}

function clearFilter(tableType = 'desktop') {

    var filters = document.getElementsByClassName("filter-item-" + tableType);

    var clear = document.getElementById("clear-filters-" + tableType);
    var table = document.getElementById("sort-table-" + tableType);

    const kids = table.children;

    clear.classList.add("d-none");
    table.className = "";

    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove("filter-on");
    }

    var rows = [];

    for (let i = 0; i < kids.length; i++) {
        rows[i] = kids[i].outerHTML;
    }

    table.innerHTML = rows.join('').replace(/d-none/g,'');

    countResults(tableType);
}

function countResults(tableType = 'desktop') {

    var resultsCount = document.getElementById("results-count-" + tableType);
    var table = document.getElementById("sort-table-" + tableType);

    const kids = table.children;

    var exclusions = 0;

    for (let i = 0; i < kids.length; i++) {

        if (kids[i].classList.contains("d-search-none") || kids[i].classList.contains("d-none")) {
            
            exclusions++;
        }
    }

    if (exclusions == 0) {
        resultsCount.innerHTML = kids.length + " total";
    } else {
        resultsCount.innerHTML = kids.length - exclusions + " result" + (kids.length - exclusions == 1 ? "" : "s");
    }

}