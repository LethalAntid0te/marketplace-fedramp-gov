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
}

function filterRows(filterClass, tableType = 'desktop') {

    filterClass = filterClass.substr(0,filterClass.lastIndexOf('-'));

    var clear = document.getElementById("clear-filters-" + tableType);
    var table = document.getElementById("sort-table-" + tableType);
    var filter = document.getElementById(filterClass + "-" + tableType);

    const kids = table.children;
    var rows = [];

    clear.classList.remove("d-none");
    table.classList.toggle(filterClass);
    filter.classList.toggle("filter-on");
    
    var filterClass = table.getAttribute('class');
    var filterClasses = filterClass.split(' ');

    for (let i = 0; i < kids.length; i++) {

        kids[i].classList.remove("d-none");

        if(filterClass != '') {

            if(filterClasses.some(filterClass => kids[i].classList.contains(filterClass) == false)) {

                kids[i].classList.add("d-none");
            }
        }
        rows[i] = kids[i].outerHTML;
    }

    if(filterClass == '') {
        clear.classList.add("d-none");
    }

    table.innerHTML = rows.join('').replace(/=\"\"/g,'');
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
}