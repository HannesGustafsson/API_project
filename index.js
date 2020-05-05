const uriVisitors = 'https://5ea6a04c84f6290016ba6f29.mockapi.io/api/v1/visitors'

// LOADS DATA
function loadData() {
    const datadiv = document.getElementById('datadiv');
    datadiv.innerHTML = '';
    fetch(uriVisitors)
        .then((resp) => resp.json())
        .then(function (data) {
            return data.map(function (data) {
                let divtag = document.createElement('div');

                divtag.innerHTML = `<button onclick="deleteVisitor(${data.id})">-</button> ${data.name}`;
                datadiv.appendChild(divtag);
            })
        })
}

// ADDS NEW VISITOR
function addVisitor() {

    const textInput = document.getElementById('name').value;
    var data = { name: textInput };

    fetch(uriVisitors,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers:
            {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))

        setTimeout(() => {loadData()}, 500);
}


// DELETE VISITOR
function deleteVisitor(id) {

    fetch(uriVisitors + "/" + id,
        {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers:
            {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => console.log(res))

        setTimeout(() => {loadData()}, 500);                        
}

// LOADS UPCOMING TRAIN DEPARTURES
function getTrainTimes() {
    const departurediv = document.getElementById('departures');

    const uriTrains = 'https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=81a6a09603e14d51a73276f98ba095bb&siteid=9297&timewindow=10';
    fetch(uriTrains)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let departures = data.ResponseData.Metros;
            return departures.map(function (departure) {
                let divtag = document.createElement('div');

                divtag.innerHTML = `${departure.LineNumber + " " + departure.Destination + " " + departure.DisplayTime}`;
                departurediv.appendChild(divtag);
            })
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getForecast() {
    const divForecast = document.getElementById('divForecast');
    const uriForecast = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.0629/lat/59.3182/data.json';

    fetch(uriForecast)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data)
            let forecasts = data.timeSeries[0].parameters;
            let divtag = document.createElement('div');

            divtag.innerHTML = `${'Temperatur: ' + forecasts[1].values[0]}`;
            divForecast.appendChild(divtag);

        })
        .catch(function (error) {
            console.log(error);
        });
}