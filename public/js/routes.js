let selectedCountry;
console.log(routes)
// arrays declaration
let routesCountryValues = [];
let routesStateValues = [];
// elements declaration
let selectCountry = document.getElementById('location-country');
let selectState = document.getElementById('location-state');


/** define select options for countries **/
// set countries array
for (let i = 0; i < routes.length; i++) {
    if (!routesCountryValues.includes(routes[i].LocationCountry)) {
        routesCountryValues.push(routes[i].LocationCountry)

    }
}
// set the options with the array
for (let i = 0; i < routesCountryValues.length; i++) {
    let optionCountry = document.createElement('option')
    optionCountry.value = routesCountryValues[i];
    optionCountry.innerHTML = routesCountryValues[i];
    selectCountry.appendChild(optionCountry)
}
// register the selected country
selectCountry.onchange = function () {
    selectedCountry = selectCountry.value;
    selectState.value = "";
    routesStateValues = [];
    removeOptions(selectState);

    /** define select options for state **/
    // set the array
    if (selectedCountry === "") {
        for (let i = 0; i < routes.length; i++) {
            if (!routesStateValues.includes(routes[i].LocationState)) {
                routesStateValues.push(routes[i].LocationState)
            }
        } // end for loop
    } // end if
    else {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].LocationCountry === selectedCountry) {
                if (!routesStateValues.includes(routes[i].LocationState)) {
                    routesStateValues.push(routes[i].LocationState)
                }
            }
        }
    } // end else
    // set the options with the array
    for(let i = 0; i < routesStateValues.length; i++) {
        let optionState = document.createElement('option')
        optionState.value = routesStateValues[i];
        optionState.innerHTML = routesStateValues[i];
        selectState.appendChild(optionState)
    }
} // en onchange function

/** Functions declaration **/
function removeOptions(selectObject) {
    selectObject.innerHTML = null;
    let option = document.createElement('option');
    option.value = "";
    option.innerHTML = "";
    selectObject.appendChild(option)
}

