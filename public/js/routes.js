let selectedCountry;
// arrays declaration
let routesCountryValues = [];
let routesStateValues = [];
let routesTypeValues = [];
// elements declaration
let selectCountry = document.getElementById('location-country');
let selectState = document.getElementById('location-state');
let selectType = document.getElementById('climbing-type');

/** define select options for types **/
// set types array
for (let i = 0; i < routes.length; i++) {
    if (!routesTypeValues.includes(routes[i].Type)) {
        routesTypeValues.push(routes[i].Type)

    }
}
// set the options with the array
for (let i = 0; i < routesTypeValues.length; i++) {
    let optionType = document.createElement('option')
    optionType.value = routesTypeValues[i];
    optionType.innerHTML = routesTypeValues[i];
    selectType.appendChild(optionType)
}


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
    for (let i = 0; i < routesStateValues.length; i++) {
        let optionState = document.createElement('option')
        optionState.value = routesStateValues[i];
        optionState.innerHTML = routesStateValues[i];
        selectState.appendChild(optionState)
    }
    stateChange();
} // en onchange function

/** Functions declaration **/
function removeOptions(selectObject) {
    selectObject.innerHTML = null;
    let option = document.createElement('option');
    option.value = "";
    option.innerHTML = "";
    selectObject.appendChild(option)
}

/** algorythm for filtering on select **/
selectState.onchange = () => stateChange()
selectType.onchange = () => stateChange()

// onchange for Country is already declared, the stateChange() function is called line 75


function stateChange() {
    let type, country, state;
    if (selectType.value === "") type = ''; else {
        type = selectType.id;
    }
    ;
    if (selectCountry.value === "") country = ''; else {
        country = selectCountry.id
    }
    ;
    if (selectState.value === "") state = ''; else {
        state = selectState.id
    }
    ;

    let combination = type + country + state;

    console.log(combination)
    switch (type, country, state) {
        case 'false false false':
            console.log('number of true: 0')
            break;
        case 'true false false':
            console.log('number of true: 1')
            break;
        case 'true true false':
            console.log('number of true: 2')
            break;
        case 3:
            console.log('number of true: 3')
            break;
    }
}