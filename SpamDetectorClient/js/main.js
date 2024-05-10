// TODO: onload function should retrieve the data needed to populate the UI

/*extra functions*/
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*Spam analysis data retrieval*/
let accuracyURL = "http://localhost:8080/spamDetector-1.0/api/spam/accuracy";
let spamURL = "http://localhost:8080/spamDetector-1.0/api/spam";
let precisionURL = "http://localhost:8080/spamDetector-1.0/api/spam/precision";

function requestDataFromServer(url) {
  fetch(url, {

  }).then(response => response.json())
    .then(data => loadDataAsTable(data))
    .catch((err) => {
      console.log("something went wrong: " + err);
    });
}

function getAccuracyResult(url) {
  fetch(url, {

  }).then(response => response.json())
    .then(data => loadAccuracy(data))
    .catch((err) => {
      console.log("something went wrong: " + err);
    });
}

function getPrecisionResult(url) {
  fetch(url, {

  }).then(response => response.json())
    .then(data => loadPrecision(data))
    .catch((err) => {
      console.log("something went wrong: " + err);
    });
}

function loadDataAsTable(data) {
  let tableRef = document.querySelector("tbody");

  for (let c of data) {
    let rowRef = document.createElement("tr");
    //let dataFilled = true;

    // Define the order of keys
    let keysOrder = ["filename", "spamProbability", "actualClass"];

    for(let key of keysOrder) { /* looping through the key values in each object*/

      let dataValue = c[key];

      let dataRef = document.createElement("td");

      // Convert "spamProbability" to a percentage
      if (key === "spamProbability") {
        dataValue = (dataValue * 100).toFixed(2) + "%";
      }

      dataRef.innerHTML = dataValue;
      rowRef.appendChild(dataRef);
    }

    tableRef.appendChild(rowRef);

  }
}

function loadPrecision(data) {

  // Parse the JSON string to a JavaScript object
  let parsedData = JSON.parse(data);

  let precisionRef = document.getElementById("prec_box");

  let valRef = document.createElement("h1");
  valRef.innerHTML = parsedData.val;

  precisionRef.appendChild(valRef);

}

function loadAccuracy(data) {

  // Parse the JSON string to a JavaScript object
  let parsedData = JSON.parse(data);

  let accuracyRef = document.getElementById("acc_box");

  let valRef = document.createElement("h1");
  valRef.innerHTML = parsedData.val;

  accuracyRef.appendChild(valRef);
}

(function() {
  requestDataFromServer(spamURL);
  getPrecisionResult(precisionURL);
  getAccuracyResult(accuracyURL);
})();
