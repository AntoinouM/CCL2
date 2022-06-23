let selectedCountry;
// arrays declaration
let routesCountryValues = [];
let routesStateValues = [];
let routesTypeValues = [];
// elements declaration
let selectCountry = document.getElementById('location-country');
let selectState = document.getElementById('location-state');
let selectType = document.getElementById('climbing-type');
let popUp = document.getElementById('group-form-popup');
let body = document.querySelector('body');

let user = {};

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

/** algorithm for filtering on select **/
selectState.onchange = () => stateChange()
selectType.onchange = () => stateChange()
// onchange for Country is already declared, the stateChange() function is called line 75


function stateChange() {

    let divRoutes = document.querySelectorAll('.routes-box')

    let type, country, state;


    // setting all select to null if type is null
    if (selectType.value ==='') {
        selectType.value = '';
        selectCountry.value = '';
        selectState.value = '';
    }
    let dataType, dataCountry, dataState;
    if (selectType.value === '') {type = '0'} else {type = '1'}
    if (selectCountry.value === '') {country = '0'} else {country = '1'}
    if (selectState.value === '') {state = '0'} else {state = '1'}
    let combinationString = type + country + state;

    switch (combinationString) {
        case '100':
            // checking for type
            divRoutes.forEach((div) => {
                dataType = div.getAttribute('data-Type');
                if (dataType === selectType.value) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            })
            break;
        case '110':
            // checking for type & country
            divRoutes.forEach((div) => {
                dataType = div.getAttribute('data-Type');
                dataCountry = div.getAttribute('data-LocationCountry');
                if (dataType === selectType.value && dataCountry === selectCountry.value) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            })
            break;
        case '111':
            // checking for type & country & state
            divRoutes.forEach((div) => {
                dataType = div.getAttribute('data-Type');
                dataCountry = div.getAttribute('data-LocationCountry');
                dataState = div.getAttribute('data-LocationState');
                if (dataType === selectType.value && dataCountry === selectCountry.value && dataState === selectState.value) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            })
            break;
        case '010':
            // checking for type & country
            divRoutes.forEach((div) => {
                dataCountry = div.getAttribute('data-LocationCountry');
                if (dataCountry === selectCountry.value) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            })
            break;
        case '011':
            // checking for country & state
            divRoutes.forEach((div) => {
                dataCountry = div.getAttribute('data-LocationCountry');
                dataState = div.getAttribute('data-LocationState');
                if (dataCountry === selectCountry.value && dataState === selectState.value) {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            })
            break;
        default:
            // display all for no select content
            divRoutes.forEach((div) => {
                div.style.display = 'block'
            })
    }
}
 function selectRoute(routeID) {
    hidePopUp()
     let divRoutes = document.querySelectorAll('.route-info-container');
    let divRoutesMobile = document.querySelectorAll('.route-info-container-mobile');

     divRoutes.forEach((div) => {
         div.style.display = 'none';
         if (div.getAttribute('id') === routeID) {
             div.style.display = 'block';
         }
     })
     if (body.offsetWidth <= 1000) {
         divRoutesMobile.forEach((div) => {
             div.style.display = 'none';
             if (div.getAttribute('id') === routeID + '-mobile') {
                 div.style.display = 'flex';
             }
         })
     }
 }

 function showPopUp(param) {
     let inputRID = document.getElementById('RID');
     inputRID.value = param;
     popUp.style.display = "flex";
 }

 function hidePopUp() {
     popUp.style.display = "none";
 }
